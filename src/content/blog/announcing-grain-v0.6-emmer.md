---
title: Announcing Grain v0.6 - Emmer
subtitle: The release of Grain v0.6, Emmer, features a new module system, early return, labeled + default arguments, and much more.
date: 2024-03-04 12:00:00
author: Blaine Bublitz
cover: /src/images/cover/vadim-paripa-vEK0mCz4Ow0-unsplash.jpg
coverAttribution: Vadim Paripa / Unsplash
tags:
  - Release
  - Changelog
---

It's been a minute, but we're back with a new Grain release—v0.6.0, codenamed Emmer. This release has been a year in the making and it is jam-packed with new syntax, features, and fixes we are excited to share with y'all. None of this would be possible without our amazing team and community, so much thanks to everyone involved. As always, you can find the full [release notes](https://github.com/grain-lang/grain/releases/tag/grain-v0.6.0) on GitHub but we wanted to highlight some things we are excited about.

## Module include and scoping system

We've completely reworked our module system, featuring new module **include** syntax to bring other modules into scope.

```grain
module Main

from "list" include List
from "./my-module.gr" include MyModule
```

This syntax puts the file path first to help autocomplete the module being imported. Module include paths are still strings because file names are often not valid Grain identifiers. But where do the module names from the `include ModuleName` come from? We've introduced module headers in each Grain file. Each file will now start like this:

```grain
module MyModule
```

This module header primarily serves to name the module, which allows names that differ from the file path. Some additional benefits that come out of this are: 1) It gives us an anchor point for module-level doc comments, 2) Provides a namespace we can autocomplete, such as displaying all provided values for List when you type `List.`, 3) allows module-level attributes, and 4) keeps a uniform syntax with submodules.

Yes, you heard that right, submodules! You can now add in-file submodules, using the syntax:

```grain
module Queue

// some mutable queue implementation

module Immutable {
   // some immutable queue implementation
}
```

And then you will access the submodule using dot-syntax, like `Queue.Immutable`. We've also updated the standard library to utilize these patterns—the Queue example is exactly what you'll find if you include Queue from our standard library!

Nested submodule identifiers can get unwieldy, but you can leverage our new scoping operator to keep your code concise. Within any scope, you can bring in new functionality with the `use` operator:

```grain
module Main

use Queue.Immutable.{ make }
use List.*
```

This is very helpful for bringing operators into scope. For example, the default `(+)` operator only works on Numbers, but you might be using the `Int8` type to have better type safety. In this case, you'll want to `use Int8.{ (+) }` in scopes where you are doing addition on `Int8` values.

With the new module system, you provide types, values, and modules you want to be available to other modules using the `provide` keyword.

```grain
module Main

provide let sayHello = () => print("Hello Grain!")

provide module Person {
  provide record Person {
    name: String,
    age: Number,
  }

  provide let make = (name, age) => { name, age, }
}

let foo = 1
let bar = 2
provide { foo, bar }
```

You can also abstractly provide types with the `abstract` keyword, instead of `provide`. This hides the actual implementation but still allows users to reference the type itself. For example, Queue is implemented as a record, but we don't want users to access the fields, so it is provided with the `abstract` keyword. In this example, users can use Queue in type signatures but never access the fields, so we are free to change the underlying implementation without causing a breaking change for our end-users.

```grain
module Main

abstract type Identifier = String
abstract record Queue<a> {
  impl: List<a>
}
```

## Labeled and default arguments

If you've spent any time looking through the compiler code, you'll probably notice that some of our favorite features of Reason/OCaml are named and optional function parameters. Of course, it didn't take us long to add these to Grain with our own spin!

From v0.6.0, any argument can be passed as the binding name defined in the function parameters. We still allow them to be provided positionally, but passing by name can make our code clearer to future readers.

```grain
module Main

let sayHello = (name) => print("Hello " ++ name)

sayHello(name="Jake")
sayHello(name="Alex")
```

Often, we want to allow specializing a function. In other languages, this may be done with function overloading. Instead, we've allowed function parameters to be defined with default values. If a function parameter has a default that argument doesn't need to be provided when calling a function; however, if provided, it must be provided with a name.

```grain
module Main

let sayHello = (name="Grain") => print("Hello " ++ name)

sayHello()
sayHello(name="Oscar")
```

We even leverage this new functionality to allow specialized suffix behavior on the `print()` function if you don't want to include a newline at the end. You can check out the full [release notes](https://github.com/grain-lang/grain/releases/tag/grain-v0.6.0) to see the other places we're currently using default arguments in the standard library.

```grain
module Main

print("Hello Grain", suffix="!")
```

## Type consistency

Historically, some Grain behavior was a holdover from the original implementation details. Thanks to [alex-snezhko](https://github.com/alex-snezhko), v0.6 cleans up and standardizes much of this to make Grain feel much more cohesive!

One of these was types being recursive by default while bindings were non-recursive. We've now standardized by making types non-recursive. This includes mutually recursive types, but the compiler will provide a helpful error message if we detect the `rec` keyword is needed!

The purpose of this change is to ensure recursive code is clear, and to that end, we heard feedback that the comma between recursive types/bindings was easy to miss or forget. To keep it clear, we added the `and` keyword between mutually recursive types and bindings.

```grain
module Main

enum rec Tree<a> {
  Empty,
  Node(a, Forest<a>)
} and enum Forest<a> {
  Nil,
  Cons(Tree<a>, Forest<a>)
}
```

Another change we made for consistency is using `=>` in function type signatures. It always seemed arbitrary that we used `->` for this and Alex put in the effort to make the change across the entire codebase. The Grain formatter will automatically make this change for you during 0.6.x, but we'll be removing it from the parser afterwards.

In giving more flexibility to define your types, we added support for inline records on enum variants, which allow you to name the fields on your variants.

```grain
module Main

enum Settings {
  Default,
  Safe,
  Custom{ indentation: Number }
}
```

## Tail calls

Our tail call support has been experimental for quite a while. This was primarily because we knew there were some large memory leaks that required large refactors in the compiler. Tail Calls have progressed to Phase 4, which means they have been implemented by a number of runtimes and expected to be completed by all other runtimes. They are already implemented by Wasmtime, v8, and wasm-micro-runtime, so we felt it was time to put in that work and enable them by default! This means you'll need to be on the latest versions of your WebAssembly runtime—always ensure you are using a runtime that fully implements tail calls or you will need to compile your programs with the `--no-wasm-tail-call` flag.

## Early return

Over the years, we've needed to implement some _interesting_ patterns in our runtime and standard library to ensure that functions always returned the same value—big `if-else` blocks, an `Option` to track error states during a loop, etc. In this release, we've deviated slightly from other functional languages and added the much requested "early return" feature to avoid these patterns. You can return early from a function with the `return` keyword, which also requires you to use `return` at every other return site inside the function, including the final statement.

```grain
module Main

let withGreeting = (name="Grain") => {
  if (name == "Grain") {
     return "Cheers Grain Team!"
  }

  return "Hello " ++ name
}

print(getGreeting())
print(getGreeting(name="Blaine"))
```

## WASI changes and removal of js-runner

Our `js-runner` project helped us get through the lack of support for early WASI previews, but we've decided to completely remove it from the project. The Grain CLI now uses the WASI support built into Node.js, with Oscar and Blaine joining the [uvwasi](https://github.com/nodejs/uvwasi) project and Alex contributing to ensure it is meets the needs of all WASI users.

This means you'll need to shim WASI yourself if running Grain in the browser, since we are a WASI-first language. You can find some helpful tools in the WASI community to help you transpile or shim WASI for the browser.

With the switch to Node's WASI implementation, we reworked how the WASI sandbox is constructed in the Grain CLI. This lead us to better support preopens, command line arguments, and the environment. All of these are now provided via flags and you can check out their usage via `grain run --help`.

## Numbers!

Numbers in Grain just keep getting better with every release. Both Alex and [spotandjake](https://github.com/spotandjake) have put a ton of effort into ensuring numbers are safe, correct, and fun to work with!

In this release, we've added `Infinity` and `NaN` literals to the language. You can still use the bindings, but the literals might make your code more concise.

Beyond our `Int32` and `Int64` fixed width number types, we've expanded to include `Int8`/`Uint8`, `Int16`/`Uint16`, `Uint32`, and `Uint64`. These fixed width numbers can be written with their own literal suffix and we also provide standard library modules for each type. We hope these are helpful for writing games or other low-level projects. Another convenience feature for low-level programming is the new hex float syntax, `0x1F.4p5`, which is similar to `1.1e1` but treated as hexadecimal instead of decimal.

In combination with the new scoping operator, we wanted it to be easy to `use` operators on these new number types, so we've renamed all operator-like functions to be actual operators—you'll now `use Int32.{ (+) }` instead of `Int32.{ add as (+) }`.

## Formatter

A massive undertaking in this release was the rewrite of our code formatter. The original code formatter was implemented by [Marcus](https://github.com/marcusroberts) years ago and it grew very complex as we've been iterating on the language and compiler. That complexity really slowed down larger feature work, as we expect every feature to be fully supported within all our tooling.

Last year, [Blaine](https://github.com/phated) and [Oscar](https://github.com/ospencer) got together to build the skeleton for the new formatter and Oscar recently put on the finishing touches with a pretty-printing library built for our needs. The result of all of this work is a faster formatter that is much easier for us to maintain.

Please be aware that your code **will** change when formatting with Grain v0.6, but we hope the structure will be more correct. Please [file an issue](https://github.com/grain-lang/grain/issues/new) if you find a bug in the formatter and we'll get it fixed up quickly!

## Graindoc

As a part of our tool suite, our documentation generator has been refreshed for this release. Oscar replaced our naive RegExp implementation with a proper parser, which allowed us to support multi-line attributes—you can now spread examples, descriptions, etc across multiple lines!
We strive for our tools to fully support the entire language, so we've added support for documenting:
* The `module` keyword. Say goodbye to `@module` and `@section` attributes; you now add normal docblocks to your module header or submodules.
* Record fields and enum variants.
* Labeled arguments by validating the name provided to `@param` matches the binding.
* Re-exported values by looking up the original docblock.

## Language Server

We continue to add more features to the Grain Language Server. Marcus added "go to definition", so you can easily jump to definitions in other Grain modules. For a quick glance at available types, values, and modules, Oscar and Jake added hover support for the new module system! We're also hard at work on autocomplete and inlay hints, which should land in a v0.6.x point-release.

## JSON

It's been a long time coming (I opened issue #245 over 3 years ago), but we've finally added JSON support into the Grain standard library! Massive thanks to community member [cician](https://github.com/cician) for getting the implementation started and Jake for bringing it across the finish line—these two have gone through almost 300 comments of code review to wrap this up. The library is quite low-level, but we have plans to add high-level utilities. Please give us feedback on utilities you'd want to see to make working with JSON delightful.

## URI

As with JSON, a lot of effort has gone into the standard library to make it more generally useful for common Grain programs y'all might write.

To that end, Alex has implemented an RFC 3986-compliant URI module which provides a type-safe way for working with any sort of URI in your Grain programs. If you are using Grain for web servers, we hope this library makes your life easier!

## New team members

We want to officially welcome [spotandjake](https://github.com/spotandjake) and [alex-snezhko](https://github.com/alex-snezhko) to the team! We invited them to the core team more than a year ago and they put in the bulk of the work on this release. This would be a meager release without all of the code they wrote and reviews they endured. The warmest welcome to the both of you from Me, Oscar, Philip, Marcus, and Josiah!
