---
title: "Anatomy of toString"
subtitle: How hard can turning things into strings really be?
date: 2026-10-08 13:30:00
author: Jake Follest
cover: /blog/photos/cover/markus-winkler-_nvKjg0aliA-unsplash.jpg
coverAttribution: Markus Winkler / Unsplash
tags: Runtime, Standard Library, Developer Experience
---

I wanted to start by saying that this blog post probably isn't going to be for everyone. We're going to be taking a small departure from our usual discussions. Rather than focusing on the high-level features and APIs you interact with, we're going to dig a little deeper into some of the low-level code that often gets taken for granted.

One of the flagship features of Grain is our generic `toString` and `print` functions. Believe it or not, they're actually one of the things that brought me to the language in the first place. Most people have probably used these functions before without thinking too much about what happens behind the scenes when they're called. After recently rewriting the entire system from the ground up, I figured what better time than now to dive into the details of how it works.

If you're not overly familiar with Grain or the Grain runtime, some of this might seem like magic, so it's time to do the really scary thing and break the fourth wall by peeking into the black box that is the Grain runtime.

Believe it or not, the Grain runtime is actually written in Grain itself. However, it's probably not the Grain you're used to. Runtime code comes with a bunch of special constraints and limitations, and these are also why we generally **do not recommend that users write runtime-level code themselves**. Runtime code exists at a very different layer of the language, and working with it requires giving up many of the conveniences and abstractions that normal Grain code provides. It also requires a much deeper understanding of the compiler and the WebAssembly it emits.

## The Problem `toString` Has to Solve

I figure the best place to start is by explaining the problem `toString` actually needs to solve. At a high level, the goal is pretty simple: take a value `x` and return a string representation of that value. Of course, in practice, `toString` doesn't know ahead of time what `x` is it could be something simple like a `number` or something more complex like a `record`, or even some nested combination of various data types. It needs to figure that out at runtime and produce a useful representation regardless of what we give it.

When we receive the value `x`, the first thing to do is figure out **what we're looking at**. We do this using some low-level reflection capabilities available to the Grain runtime. Once we know what we're dealing with, we can extract the relevant data from it.

For simple values like numbers and strings, this is pretty straightforward: pull out the content, use a simple algorithm to convert it to a string, and return the result. However, for more complex data types such as `arrays`, `lists`, `tuples`, and `ADTs`, things get a little more interesting. These data structures can contain other data structures, so we need to recursively inspect their internal structure and extract the values they contain. Those values then need to be stringified as well, potentially repeating this process several times.

We also need to consider things like line breaks and indentation to ensure that a nested record doesn't just turn into spaghetti or a giant unreadable mess when it's emitted.

That all sounds simple enough. The interesting part is what happens when we actually try to implement it.

## What Was Wrong With `toString`

Now that we have an understanding of the problem `toString` needs to solve, let's discuss what was wrong with the old implementation.

In my opinion, there were three main problems. We're going to go through them roughly in order of how much impact they have on users.

The first problem was **formatting**. In the old implementation, our formatting approach was rather naive. Virtually every formatting decision, such as where to place line breaks and indentation was decided when `toString` was designed rather than adapting to the data being printed. While this was never really a problem for small values, things started to get messy as the data became more complex. A list containing three `5`s would be nicely printed as `[5, 5, 5]`. But if we nested three of those lists, we would get `[[5, 5, 5], [5, 5, 5], [5, 5, 5]]`. You may be wondering what the problem is with that output, and I agree that it still looks pretty nice. But now imagine there are 100 elements in each list. It's going to get pretty difficult to find the 53rd element, and the problem only gets worse as we make our data more deeply nested and mix more data types into the same structure.

The second problem was **performance**. The downside of having a nice generic `toString` function is that it needs to perform reflection to figure out what type of value it's dealing with. This is why we sometimes provide utilities like `Char.toString` and other more specific stringification functions, so we can avoid reflection overhead required for generic stringification in cases we already know the type. The old implementation was very monolithic, which made extracting something like `Number.toString` difficult, if not practically impossible. This made it harder to reuse the existing code and meant we couldn't easily provide specialized, more efficient paths for individual types.

The third problem was **readability and maintainability**. The old implementation lived alongside our other low-level string functions, with very little separation between the different printers. It was also written in a fairly low-level manner, which made it difficult to understand and change, especially for people who were new to working on the runtime.

Taken together, these problems made `toString` harder to use, harder to optimize, and harder to maintain than desired.

## The solution

Now that we understand what `toString` needs to do and the problems with the old implementation lets talk about the fun part of how we achieved these goals.

### The Formatting Engine

The largest and most important change was to how we format our output while stringifying, or more precisely, how we determine where to put line breaks and indentation.

If you were approaching this problem yourself from scratch, there are a number of ways you might try to solve it. You could decide, for example, that a list should be split across multiple lines once it contains a certain number of items. You could even take into account the number of items throughout the list and its children. While approaches like this can certainly help with some bad cases, they do a pretty poor job of being consistent and don't really take into consideration that not every element is the same size. A slightly more sophisticated approach might be to first convert the data to a string, measure how large it is, and then decide whether we should convert it again using different formatting. This can produce better results, but it's also unnecessarily expensive, we'd potentially have to do all of the work of stringifying our data just to backtrack and throw the result away.

So what's the real solution? We can separate **building the string** from **making formatting decisions**. Instead of immediately constructing a string, we can construct a tree that describes how the output *could* be formatted. This tree can understand where line breaks are allowed, where they must occur, how pieces of text should be grouped together across lines, and how indentation should change when those breaks occur.

For those of you who have been around for a while, this problem may sound very familiar. It's the exact same set of problems we had to solve for `grain format`. In fact, why not just use the same formatting engine we made for `grain format`?

Unfortunately, in practice, it isn't quite that simple. The formatting engine was originally written for the compiler and not the runtime, so the first thing we had to do was port it over to Grain. Now that we have a formatting library, let's just plug it in and let it run. Unfortunately, we've just hit our first major hiccup.

The data we're formatting is very different from the data handled by `grain format`. Grain's ASTs tend to be fairly linear and aren't typically deeply nested. Runtime data, on the other hand, can be nested incredibly deeply. Since `toString` needs to work on essentially any piece of data a user can create, we can't make the same assumptions about tree depth that we can make about a compiler AST.

This meant moving away from the recursive approach used by the original formatting engine and towards a heavily optimized iterative instruction queue. So every time you call `toString`, we're effectively running a tiny interpreter over a document AST to produce the final output.

Now that we have our formatting library, we still need to decide exactly how our output should look. Luckily, we can solve that problem by not deciding at all. Instead, we can copy the formatting semantics of `grain format` directly. This gives us consistent formatting across the language and means that the output of `toString` should feel familiar to anyone who's used `grain format` before. More standardization is always a good thing.

Despite heavily optimizing the library for use in the runtime, we also made a point of keeping its generic formatting rules intact. That means this isn't just a specialized piece of `toString` machinery. We now have a general-purpose formatting library that can potentially be reused by other modules, such as `Json.toString`, or even exposed as a standard library module if there's enough demand for it.

### The Other Problems

Now that the main issue is solved, the other problems become much easier to address. We separated the core of `toString` so that each data type has its own stringification function, meaning something like `Number.toString` can be implemented much more easily in the future 👀.

We also managed to improve maintainability by further abstracting the data extraction step using the new data structure APIs that came with our move to Wasm GC. This not only makes `toString` considerably easier to read, but also improves type safety and helps catch bugs as we continue to develop the runtime.

## The Result

So after all that, where is our fancy new tractor, and what did we actually get?

Well, as with most runtime work, it's not super obvious from a user level. We still have the same `toString` and `print` functions we've always had. But for people who work with `toString` and `print` a lot, the improvements are much more noticeable. Large and complex trees are now readable, and our formatting is standardized with `grain format`. You can essentially take a printed piece of Grain data and paste it straight back into your code whenever you want.

We also have a brand new formatting library living in the runtime that can be reused by other modules, giving us a common foundation for pretty-printing throughout the language, and we get all of this for only about **6 KB** more then before.

So while `toString` might look pretty much the same from the outside, there's quite a bit more going on under the hood now.


