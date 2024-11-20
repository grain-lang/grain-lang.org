---
title: Grain State of the Union 2020
subtitle: Every update you need to know, and what's to come in 2021.
date: 2020-09-29 12:00:00
author: Oscar Spencer
cover: /src/images/cover/GrainStateOfTheUnionCover.jpg
coverAttribution: Luke Chesser / Unsplash
tags:
---

## It's Been a Lovely Journey

As I write this and reflect on these past few years of building Grain, I'm filled with great joy at just how pleasant it has been to be a part of the WebAssembly community. Whether it was meeting in person at the WebAssembly Summit, getting help through GitHub issues, or just chatting on Discord, my experiences have always been great. As such, I'd like to start by extending a big thank you to the WebAssembly and Grain communities for being awesome, and I'm excited to see what these two communities accomplish in the future. 🙏

## The Grain Mission

When we first started Grain in April 2017, WebAssembly had just been turned on by default in the four major browsers. There were very few languages that could compile to Wasm, and there weren't really any _new_ languages for WebAssembly. In fact, the premier language for WebAssembly at the time was C. We saw that there was a real opportunity to create a new language whose sole existence is to be a general-purpose, high level, accessible language for WebAssembly, and thus, Grain was born.

### What We're Building

We want to put academic language features to work for the everyday developer. As we're building this new language, we want to collect the very best that we've seen from other languages and present them as one unified, modern experience. This includes features like having a number system that's inspired by [Racket's](https://racket-lang.org/), where rational numbers are first-class, and having efficient, exhaustive pattern matching that makes it easy to reason about your program.

Grain aims to be what I would describe as a _relaxed_ functional language. This means that we'll still have a strong typechecker and still support most functional language constructs, but we'll also adopt features like [Rust's](https://www.rust-lang.org) `let mut` that steer a little off the beaten path for functional languages. These deviances are what we feel to be pragmatic and make the language more practical for everyday use.

Of course, no open source project would be anything without a strong community. Continuing to build a vibrant community will be a big part of what makes Grain successful. Our [Discord server](https://discord.com/invite/grain-lang) has a great group of people and is growing to become something truly great. We hope to create a collaborative space where everyone feels welcome to ask, learn, and contribute.

## Core Language Development

We've been pretty busy as of late. As of writing, we've merged **157** pull requests in just the past year. It's crazy to realize how far the language has come in such a short amount of time, and I'm immensely proud of what we've accomplished. Here are some of the highlights.

### Language Features

We completed some of the less exciting, yet critically important, features like garbage collection. We also revamped our import/export system, expanded our `Number` type, implemented more data structures, added mutable `let` bindings, added support for generating source maps, and more!

Where we've started to really make strides is in our standard library. In addition to numerous updates to existing libraries and the addition of the `Option`, `Result`, and `Map` libraries, I'm particularly excited to talk about the `Sys/*` libraries. These libraries provide access to system-level functionality like reading and writing to the file system, reading environment variables, accessing system clocks, and producing random numbers. This is possible because of the [WebAssembly System Interface](https://wasi.dev/), or WASI for short. In the process of getting these system calls working in Grain, we were able to contribute back several PRs to other WebAssembly projects. 🤓

We've also continued to buff out the rough edges around the language, making Grain code more pleasant to write.

### Development Workflow

Much of our progress was made possible by making it easier for newcomers (and us!) to contribute to the project. This included a whole new build process using familiar tools more people already had on their systems, and simpler instructions to get up and running. We also decided to make one pretty big switch—the compiler is now written in ReasonML rather than OCaml. While this is largely an aesthetic change, we've found that contributors are more comfortable with the Reason syntax and that it's a bit less intimidating for those who are unfamiliar with the OCaml/Reason ecosystem.

We've also made writing the compiler code easier—we now use [Binaryen](https://github.com/WebAssembly/binaryen) to generate our WebAssembly instructions via a new project we made called [Binaryen.ml](https://github.com/grain-lang/binaryen.ml). This makes it far easier to reliably generate programs, rather than writing out every instruction by hand. On that same front, we now use [AssemblyScript](https://www.assemblyscript.org/) for the lower-level operations necessary for some of the built-in standard library functions, and that experience has been delightful.

### Contributors

We've welcomed [Blaine Bublitz](https://twitter.com/BlaineBublitz) to the Grain core team! 🎉

Blaine has brought his exceptional experience maintaining open source projects to Grain and has truly been the catalyst that's gotten us to where we are today. I'm not really sure how we ever functioned without him.

In addition to Blaine, we've had several people make large, meaningful contributions to the project in the past year. We're thankful for every one of our contributors and hope to see many more in the future. 😊

## Website and Documentation

The language itself isn't the only star of the show—we've put quite a lot of effort into our docs! What good is that nifty new feature if it isn't documented? Documentation is always a work in progress, but we've been trying to keep the docs up to date as we've released new features.

### Logo & Website Redesign

![grain redesign](/src/images/misc/grain-redesign.png)

If you've followed Grain from the beginning, you might remember this old logo. While this logo (hastily-created in about five minutes by yours truly) served us well, we've moved on to our new, beautiful, professionally-designed logo that I feel fits us wonderfully.

We've also got a brand new website! Given that this is an open source project, all of the budget went to the logo and the website design was left to me. 😅 It's been well-received, but we're always open to feedback from the community.

### The Grain Guide

In addition to the regular docs, we've launched the Grain Guide. The purpose of the Guide is to teach the reader how to use the language without overwhelming them with everything Grain can do. It introduces them to new concepts and patterns as they read on, letting them check out the normative documentation as they see fit.

## Our Roadmap

The language has matured a ton, but there's always lots more to do.

As for big features, we're continuing to closely monitor the WebAssembly [exception handling proposal](https://github.com/WebAssembly/exception-handling) to bring better exception handling to Grain. In the meantime, we're discussing macro support—stay tuned for more news. As for smaller (but just as exciting) features, we're continuing to build out our standard library (including the DOM library rewrite!), and improve the general ergonomics of the language.

Adjacent to the language, we're working on new tooling—code formatters and a language server—to make writing Grain code a breeze. You may even see a Webpack plugin that makes it dead simple to integrate Grain into an existing web project. 😄

Lastly, we're working to improve our Windows support. Once that's all set, we'll start distributing binaries for all platforms. This will make it easier than ever to get up and running with Grain.

If any of this interests you, [follow us on Twitter](https://twitter.com/grain_lang) and [join the conversation on Discord](https://discord.com/invite/grain-lang)! If you want periodic updates from us in email form, you can sign up for our email list below.
