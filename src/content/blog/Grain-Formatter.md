---
title: Introducing the Grain Formatter
subtitle: Bringing consistency and pretty code to Grain
date: 2021-09-04 12:00:00
author: Marcus Roberts
cover: /src/images/cover/aaron-burden-FGbLYvTgxx0-unsplash.jpg
coverAttribution: Aaron Burden / Unsplash
tags:
  - Tooling
  - Developer Experience
---

For any modern programming language to succeed, it needs to provide developers the support tools they have become used to: code editor extensions, IDE support, and in recent years code formatting or pretty print tools.

The acceptance of automatic code formatting tools providing the “one true style” for development in a language seems to have really caught on with the release of Prettier for JavaScript. In contrast to a linter, which reports on how well a piece of code adheres to style and best practices, a code formatter rewrites a piece of code in the approved style.

This really helps codebases and teams in several ways. It reduces arguments at code review time, as the correct style is guaranteed. It helps new members of the team learn the coding style, and it keeps a very consistent code base that’s easy to read by everyone. My personal favourite is I can be really lazy as I type code, and with `Format on Save` enabled, I just press `Save` and watch the code become well structured.


## Grainformat

The formatter can be invoked using the Grain CLI

```sh
grain format myfile.gr
```

or 

```sh
grain format  
``` 

which will read from stdin, which is generally useful for tools like the [Grain Language Server (LSP)](https://github.com/grain-lang/grain-language-server).

Both write the reformatted code to stdout.

Coming soon will be a check mode and an in-place rewrite mode.  Check mode will scan code and determine if it matches the formatter style without reformatting—useful for CI checks to ensure all code is properly formatted.

The next version of the LSP in our VSCode language extension for Grain to be released alongside the formatter supports whole document formatting, so if you enable `Format On Save` it will reformat all the code each time you save. Code section formatting will be in a minor release after that.


## Example of formatting choices

The primary role of the formatter is to make sure no line exceeds the specified maximum length and to break code across multiple lines in a consistent way. Much of getting the formatter right is choosing where those breaks should come.

We've had some help here—we use the fantastic pretty printer that ships with the [ReScript syntax](https://github.com/rescript-lang/syntax).  The primary job of the Grain formatter is to map the Grain compiler output into the intermediate language that the pretty printer understands, where it does all the hard work of calculating what can fit onto one line and breaking it as needed.

The main formatting rules have to do with code indentation. This is what really helps make the code base look consistent. Always 2 spaces (and let’s not get started on tabs vs spaces)!

Curly brace usage in block layouts is another important stylistic choice. The most common styles are Egyptian versus C-style, and we’ve gone for Egyptian:

```grain
if (conditional) {
 ...
} else {
 ...
}
```

There are many choices when it comes to spacing around lists of items, be that function parameters, tuples, lists, arrays, record entries, enums, etc. We add spaces after the separating comments, and before items in some cases. When a list of items breaks over multiple lines, we add a trailing comma to make adding extra items easier:

```grain
(a,b) && [1,2,3] &&  {name:"Super",    value:"Grain"}
```

becomes
```grain
(a, b) && [1, 2, 3] && { name: "Super", value: "Grain" } 
```

or, if it is split over multiple lines, we add a trailing comma:

```grain
enum Animals { 
  Dog, 
  Cat,
}
```


We apply some smaller stylistic choices, too. For example, a single-argument function isn’t wrapped with parentheses. 

```grain
let add1 = x => x + 1
let add = (x, y) => x + y
```

Also quite important is the ability to tag code as not to be formatted:

```sh
// formatter-ignore
```

Use the `formatter-ignore` annotation in a comment, and the following statement will be untouched by the formatter.

## Implementation

The formatter works by using the Grain compiler to first parse the source code into what's called an Abstract Syntax Tree, or AST, which captures the meaning of the program as a tree of patterns, statements, and expressions. Then we just write the tree back out as valid Grain code. That's sometimes easier said than done, and here are some of the challenges we faced:


### Challenges

-	Comments.   Comments are, by definition, ignored when the compiler is comprehending the meaning of our code, so they aren't stored in the AST. When formatting, however, we need to preserve them. To this end, we extract these comments and combine them with the AST and bring the regenerated code and comments back together, checking how the code looks along the way. In some of the more esoteric applications of comments, their placement can be ambiguous in relation to source code that also doesn’t appear in the AST, for example:

```grain
variable1 /* comment */ , variable2
```

Our AST encodes the locations of the variable names and the comment, but we don’t know if the comment comes before or after the comma.

-	Grain uses various forms of syntactic sugar.  One of my favourites is converting list syntax of `[1,2,3]` into repeated application of the list `cons` operator. The formatter needs to be aware of these and rewrite the AST back out in sugared syntax.

- Blank lines are useful for structuring and organising code but also need to be styled for consistency.  Removing all blank lines really impacts on how the source code looks and reads. We chose to compress multiple blank lines down into a single blank line, but to always retain at least one blank line wherever one was found.

-	Arguments over style. As you might imagine, we had quite a lot of discussion about style choices. There really is no single way that suits everyone, and whatever is chosen will always be a compromise. However, what we wanted to avoid was adding configurable formatting where different formatting choices can be specified.  This really undermines the premise of all formatted Grain code looking the same, which we think really helps all Grain programmers, new or experienced, to look at Grain code and find it easy to read through because of the consistency, be than in end user code or the standard libraries.
-	How far should the rewriting go? Some formatters for other languages go further than we have in rewriting code. For example, we’ve seen some which will examine `if` statements and rewrite them using ternary operators if appropriate.  There are a couple of places where we might make changes from the original code. For example, syntactic sugar for statements such as `x += 1` may have been written as `x = x + 1`; both are identical in the AST representation, and without examining the unparsed source we can’t tell what the coder actually wrote. Feedback on whether this is acceptable, good, or needs fixing will be very welcome!

The Grain formatter will be included in the forthcoming 0.4 release or if you're building Grain from source it's on the main branch now. 

We hope you find the Grain formatter useful. Please report any mis-formatting through [GitHub issues](https://github.com/grain-lang/grain/issues). If you get really stuck, you can use for `formatter-ignore` annotation to avoid the formatter from changing your code.

This is just the first version, and we look forward to bringing in-place reformatting and format checking very soon!

