---
title: New Release! Grain v0.4 - Cereal
subtitle: Announcing the release of Grain v0.4, Cereal, with NEAR support.
date: 2021-09-08 12:00:00
author: Blaine Bublitz
cover: /src/images/cover/nyana-stoica-EV6C1LjH1Lk-unsplash.jpg
coverAttribution: Nyana Stoica / Unsplash
tags:
  - Releases
  - Changelog
---

After nearly 5 months of hard work, we are happy to finally share Grain v0.4 with the world! This release marks the culmination of a bunch of exciting features being built by the core team and a ton of amazing contributions from our community. 🎉

As is typical with these major announcements, I will share some of the highlights we are particularly excited about, but you should check out all of the awesome updates in the changelog attached to our [tagged GitHub release](https://github.com/grain-lang/grain/releases/tag/grain-v0.4.0).

## NEAR Support

A big portion of the work that went into this release was adding compiler features to support more WebAssembly platforms, including the [NEAR Protocol](https://near.org/). NEAR already supports Rust (compiled to wasm) and AssemblyScript, but with a few new compilation flags, Grain is able to output smart contracts that will run on their platform. Thanks again to the NEAR Foundation who graciously provided us with [a $50,000 grant](https://grain-lang.org/blog/2021/08/16/grain-awarded-50000-grant-from-near-foundation/) to help Grain expand its reach!

We have preliminary support for NEAR in this release, but things will get **really** interesting once we release the NEAR SDK for Grain. This is some of our most pressing work now that the release is out—check back soon to start writing smart contracts in Grain. 📈

## Tools

Another important goal for this release was to improve the tooling experience for both our end users and ourselves. To this end, we have added two new commands to the Grain CLI: `grain format` and `grain doc`.

### Grainformat

Grain format provides an opinionated code formatter tool for Grain source code. This tool was an absolutely herculean effort by [Marcus](https://twitter.com/marcusr), the core team member we introduced in our last release post and maintainer of the Grain Language Server Protocol.

I won’t go in-depth on the formatter in this post, but Marcus wrote up an excellent [blog post](https://grain-lang.org/blog/2021/09/04/grain-formatter/) about it! I recommend you give it a read, and grab our latest VSCode extension to get access to `Format on Save`; I’ve been using it for a few days and it is a great experience.

### Graindoc

Additionally, I finally finished the initial work around our documentation tool. This provides a [JSDoc](https://jsdoc.app/)-like experience for your Grain code. We’ve already begun using it to document the standard library, so we’ll be able to keep our API documentation consistently updated.

You can check out the features and syntax in my preview [blog post](https://grain-lang.org/blog/2021/08/27/tooling-preview-graindoc/). I’m particularly happy that the tool infers the types of your parameters and return values, so you don’t have to worry about keeping them in-sync with updates to your APIs.

## Callee-owned values

This is a bit of an internal change. We changed Grain's garbage collection calling convention such that a function that is called owns the references to its arguments rather than the caller. This was done to help us assure that all allocated memory is properly reclaimed.

This shouldn't at all affect how you use Grain! This only has ramifications to you if you were using Grain's `unsafe` libraries for low-level code or bindings to WebAssembly host functions. This is typically only done by some library authors (and isn't recommended otherwise). If you are actively using the `unsafe` libraries, please get in touch with us to understand the new calling convention.

## Standard library

As with most releases, we had a lot of work happening in the standard library—some by the core team and some by community contributors!

### Number

Thanks to [@spotandjake](https://twitter.com/spotandjake), we finally have a dedicated module for working with our Number type. This module will probably be one of the most used, so we are glad for the contribution. You can find the docs in our [standard library documentation](https://grain-lang.org/docs/stdlib/number).

### Sys

Prior to this release, any system calls via WASI, the WebAssembly System Interface, in our `sys/*` modules would throw an error if they didn’t return a success code. As there isn't yet support for WebAssembly exceptions, this wasn't great because you couldn’t catch the error and handle it, such as when trying to `stat` a file to see if it exists. We’ve changed all of these functions to return a `Result` type instead, so you can now handle any errors that occur.

### Buffer

An amazing effort by [@jozanza](https://twitter.com/jozanza), the Buffer module provides a new data type for storing bytes which automatically grows as data is appended. This can be used for efficiently concatenating large amounts of data, such as when building JSON strings, instead of allocating excessive amounts of strings to combine.

## Welcoming Josiah

I’m also excited to announce that we’ve added [Josiah](https://twitter.com/jozanza) to the Core Team! Oscar, Philip, Marcus, and I are extremely excited to have him join the team. In addition to the Buffer module, Josiah has also contributed our Bytes module, contributed to our [Binaryen.ml bindings](https://github.com/grain-lang/binaryen.ml), and has some really cool Grain-related projects in the works. Welcome to the team, Josiah! 🙌

## So much more

This post is just the tip of the iceberg when it comes to everything we’ve achieved these last few months. I highly recommend checking out the entire [changelog](https://github.com/grain-lang/grain/releases/tag/grain-v0.4.0), and giving Grain Cereal a try today.

As always, please leave us feedback and request features on [GitHub](https://github.com/grain-lang/grain/issues) or [Discord](​​https://discord.com/invite/grain-lang)—we can’t make Grain delightful without you.
