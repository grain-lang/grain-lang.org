---
title: New Release! Grain v0.3.0 - Barley
subtitle: After 6 months in development, we’re excited to announce the release of Grain v0.3.0, Barley.
date: 2021-04-29 16:00:00
author: Blaine Bublitz
cover: /src/images/cover/lucie-hosova-tQsGVxwodtM-unsplash.jpg
coverAttribution: Lucie Hošová / Unsplash
tags:
  - Release
  - Changelog
---

Last week, we released Grain v0.3.0, codenamed Barley, to coincide with WebAssembly Summit 2021. Not only that, but Grain co-creator Oscar presented a talk titled “Grain: Your WebAssembly-First Programming Language”—[check it out](https://www.youtube.com/watch?v=O8tyml3xBMM&list=PL6ed-L7Ni0yRnaN8-l2wfA0u3ILmyJMkz&index=4)!

This release is a double-feature release because we decided to push back our December release and batch it with the work in preparation for the Summit. As such, that means we have double the amount of awesome to share with you. 🎉

Our entire changelog is available in the [tagged release on GitHub](https://github.com/grain-lang/grain/releases/tag/grain-v0.3.0), but we wanted to highlight some of the most hype features and changes.

## Static Linking

Prior to this release, all Grain programs needed to be bootstrapped by Grain’s JavaScript runtime, which provides a dynamic linker. The big downside to that was that Grain programs could only be run in JavaScript environments, like Node.js and the browser.  Barley adds Grain support for standalone WebAssembly runtimes like Wasmer, Wasmtime, and Wasm3.

Since 2018, we’ve known that statically linked programs were going to be an important piece of the puzzle, but we were hoping to leverage ecosystem tools. Since none really appeared that fit our needs, Oscar decided to take the matter into his own hands and build a static linking phase directly into the Grain compiler.

The static linker leverages Binaryen and is roughly 600 lines of code, but the other work required within Grain was substantial, namely replacing all of our JavaScript runtime & the AssemblyScript in our standard library with pure Grain code.

## Runtime & Standard Library Rewrite

The bulk of the work to ensure static linking was possible was to rewrite most of the support code written in JavaScript or AssemblyScript in Grain. This allows a single wasm file to include all the code needed to run a Grain program—runtime support functions like `print` and `toString`, the memory allocator and garbage collector, exception handling, and much more.

To pull this off, we had to implement compiler infrastructure to work with low-level WebAssembly types directly within Grain programs, which also will be helpful for library authors who need access to WebAssembly instructions directly.


## Packaged Binaries

We use quite a few different technologies to build Grain, which makes building the compiler from source daunting for some users. We plan to reduce these over time, but we are pragmatic and will grab a tool to move quickly or make something easier (such as our previous use of JavaScript and AssemblyScript in our standard library).

All that being said, we believe users shouldn’t need to build the compiler from source before they can start writing Grain code. With this release, you can now download all the tools to get started with Grain as a single binary! Check out [Getting Grain](https://grain-lang.org/docs/getting_grain#Packaged-Grain) to download binaries for Windows, Mac, or Linux. This binary contains the Grain compiler, standard library, and a Node.js-based WebAssembly runner.

## Language

Of course, no release is complete without improvements to the language. We have:
* Added an explicit `for` loop syntax
* Introduced pattern matching on arrays
* Added a Char type and literal syntax
* Changed assignment semantics to always typecheck to `Void` for better interop with loops and single-sided `if` expressions
* Removed the `^` as the `unbox` operator and added Bitwise operators, which use `^` as bitwise XOR
* Added support to `throw` Grain exceptions, with custom exception printers

## Standard Library

One of our hopes for Grain is to provide a full-featured standard library, and this release added a ton! We’ve updated our [standard library docs](https://grain-lang.org/docs/stdlib/pervasives) on the website to include all the new modules, added functions, and updated signatures. So please check them out and suggest or contribute anything you think might be missing.

## Welcoming Marcus & Language Server

Finally, Oscar, Philip, and I want to wish a warm welcome to [Marcus](https://twitter.com/marcusr), our newest Core Team member! Marcus has been absolutely instrumental in building and improving the Grain Language Server Protocol, which is provided by our compiler and supplies compilation errors and other useful code information to code editors. You can take advantage of this information using our [vscode extension](https://marketplace.visualstudio.com/items?itemName=grain-lang.vscode-grain). Additionally, Marcus has been working to get Grain building on Apple’s M1 architecture and an ARM Windows computer. We are very excited to have him as part of Grain core. 😁

## Coming Up

We have lots on our roadmap, but most importantly, we now have the infrastructure in place to make releases far more often! Expect to hear from us much more frequently. As always, please leave us feedback and request features on [GitHub](https://github.com/grain-lang/grain/issues) or [Discord](https://discord.com/invite/grain-lang)—our roadmap is driven by how you use Grain.
