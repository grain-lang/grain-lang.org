---
title: Introducing the Grain Formatter
subtitle: Bringing consistency and pretty code to Grain
date: 2021-08-31 12:00:00
author: Marcus Roberts
cover: /blog/photos/cover/marie-bellando-mitjans-cBChXxQqEKM-unsplash.jpg
coverAttribution: Marie Bellando-Mitjans / Unsplash
tags: Tooling, Developer Experience, 
---

For any modern programming language to succeed it needs to provide developers the support tools they have become used to – code editor extensions, IDE support and in recent years code formatting or prettier tools.

The acceptance of automatic code formatting tools as providing the “one true style” for development in a language seems to have really caught on with the release of Prettier for Javascript.   More than a linter that reports on how well a piece of code adheres to style and best practices, a code formatter rewrites a piece of code in the approved style.

This really helps codebases and teams in several ways.   It reduces arguments at code review time as the correct style is guaranteed.  It helps new members of the team learn the coding style, it keeps a very consistent code base that’s easy to read by everyone.   My personal favourite is I can be really lazy as I type code, and with format on save enabled I just press save and watch the code become well structured.


## Grainformat

The formatter can be invoked using the Grain cli

```sh
grain format myfile.gr
```

or 

```sh
grain format  
``` 

which will read from stdin.

Both write the reformatted code to stdout.

Coming soon will be a check mode and an in-place rewrite mode.

The LSP in the VSCode language extension for Grain now supports whole document formatting, so if you enable Format On Save it will reformat all the code each time you save.    Formatting code sections will be in the next release.

# Implemention

## Example of formatting choices

The primary role of the formatter is to make sure no line exceeds the specified maximum and breaks the code across multiple lines in a consistent way.

The main formatting rules are to do with code indenting.  This is what really helps make the code base look consistent.  Always 2 spaces (and let’s not get started on tabs vs spaces)!

How curly braces are used for block layouts is another important stylistic look.   The most common styles are Egyptian versus C-style, and we’ve gone for Egyptian:

There are too many choices when it comes to spacing around lists of items, be that function parameters, tuples, lists, arrays, record entries, enums, etc.  We add spaces after the separating comments, and before items in some cases.   When a list of items breaks over multiple lines, we add a trailing comma to make adding extra items easier.

We apply some smaller styling choices too, for example a single argument function isn’t wrapped with parenthesis. 

Converts it into the Abstract Syntax Tree (AST)  and writes the source code again based on the tree and the programmed style 

## Challenges

-	Comments.   Comments are usually meaningless in terms of the AST so we have to check how the code looks with comments when formatting.   In some of the more esoteric applications of comments, their placement can be ambiguous in relation to source code that also doesn’t appear in the AST, for example

```sh
variable1 /* comment */ , variable2
```

We know the locations (source code ranges) of the variable names and the comment, but we don’t know if the comment comes before or after the comma.

-	We use various forms of syntactic sugar.  One of my favourites is converting list syntax of [1,2,3] into repeated application of the list cons operator.    The formatter needs to be aware of these and rewrite the AST back out in sugared syntax.

- Blanks lines are useful for structuring and organising code but also need to be styled for consistency.  Removing all blank lines really impacts on how the source code looks and reads.    We chose to compress multiple blank lines down into a single blank line, but to always retain at least one blank line wherever one was found.

-	Arguments over style.  As you might imagine we had quite a lot of discussion about style choices.  There really is no true way that suits everyone, and whatever is chosen will always be a compromise.   However, what we wanted to avoid was adding configurable formatting where different formatting choices can be specified.  This really undoes the premise of all formatted Grain code looking the same, which we think really helps all Grain programmers, new or experienced, to look at Grain code and find it easy to read through because of the consistency, be than in end user code or the standard libraries.
-	How far should the rewriting go?   	Some formatters go further than we have in rewriting code.  We’ve seen some for example that will examine if statements and rewrite them as ternaries if appropriate.   So far we’ve not gone that far.   There are a couple of places where we might make changes from the original code, for example syntactic sugar for statements such as x += x.   This may have been written as x = x + 1.   Both are identical in the AST representation, and without examining the unparsed source we can’t tell what the coder actually wrote.  Feedback on whether this is acceptable, good or needs fixing will be very welcome!

