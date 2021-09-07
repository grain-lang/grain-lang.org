---
title: New Release! Grain v0.4.0 - Cereal
subtitle: Announce the release of Grain v0.4.0, Cereal, with NEAR support.
date: 2021-09-07 12:00:00
author: Blaine Bublitz
cover: /blog/photos/cover/marie-bellando-mitjans-cBChXxQqEKM-unsplash.jpg
coverAttribution: Marie Bellando-Mitjans / Unsplash
tags: Release, Changelog
---

After nearly 5 months of hard work, we are excited to finally share Grain v0.4.0 with the world! This release marks the culmination of a bunch of parallel features being built by the core team and a ton of amazing contributions from our community. 🎉

As is typical with these major announcements, I will share some of the highlights we are excited about, but you should check out all of the awesome in the changelog attached to our [tagged GitHub release](https://github.com/grain-lang/grain/releases/tag/grain-v0.4.0).

## NEAR Support

A big portion of the work that went into this release was preparing the compiler to output WebAssembly that will run on the NEAR blockchain. NEAR already supports Rust (compiled to wasm) and AssemblyScript, but any language that targets WebAssembly should be able to output smart contracts that will run on their platform. We needed to make some adjustments to the compiler itself to support intricacies with the platform, but the NEAR Foundation graciously provided us with [a $50,000 grant](https://grain-lang.org/blog/2021/08/16/grain-awarded-50000-grant-from-near-foundation/) to make this work possible!

We have preliminary support for NEAR in this release, but things will get **really** interesting once we write the NEAR SDK for Grain. This is some of our most pressing work now that the release is out—check back soon to start writing smart contracts in Grain. 📈

## Tools

Another important goal for this release was to improve the tooling experience for our end users and for ourselves. Towards this goal, we added two new commands to the Grain CLI: `grain format` and `grain doc`.

### Grain format

Grain format provides an opinionated code formatter tool for Grain source code. This tool was an absolutely herculean effort by Marcus, the core team member we introduced in our last release post and maintainer of the Grain Language Server Protocol.

I won’t go in-depth on the formatter in this post, but Marcus wrote up an excellent [blog post](https://grain-lang.org/blog/2021/09/04/grain-formatter/) about it! I recommend you give it a read, and grab our latest vscode extension to have format-on-save; I’ve been using it for a few days and it is a great experience.

### Grain doc

Additionally, I finally finished the initial work around our documentation tool. This provides a JSDoc-like experience for your Grain code. We’ve already begun using it to document the standard library, so we’ll be able to keep our API docs consistently updated.

You can check out the features and syntax in my preview [blog post](https://grain-lang.org/blog/2021/08/27/tooling-preview-graindoc/). I’m particularly happy that the tool infers the types of your parameters and return values, so you don’t have to worry about keeping them in-sync.

## Callee-owned values

This is a bit of an internal change, but it can cause a lot of ripples throughout the ecosystem. We changed the way our compiler outputs Garbage Collector code so that values passed to a function are owned and cleaned up by the function being called. Previously, the caller would `decRef` the values after a function returned; however, we found that this caused some memory leaks in certain scenarios. By changing this memory ownership convention, we now know all parameters are `decRef`ed by the time the function returns.

This only has ramifications to you if you were using the `@disableGC` annotation on your Grain code. While this attribute is not recommended for end-user code, we use it in the stdlib and some library authors might need to use it. If you are in need of this, please get in touch with us to understand the new calling convention.

## Standard library

As with most releases, we had a lot of work happening in the standard library—some by the core team and some by community contributors!

### Number

Thanks to [@spotandjake](https://twitter.com/spotandjake), we finally have a preliminary module for working with our Number type. This module will probably be one of the most used, so we are glad for the contribution. You can find the docs at https://grain-lang.org/docs/stdlib/number

### Sys

Previous to this release, any WASI calls in our `sys/*` modules would throw if they didn’t return a success code. This was a problem for end users because you couldn’t catch the error and handle it, such as when trying to `stat` a file to see if it exists. We’ve changed all of these functions to return a `Result` type instead, so you can react to the errors.

### Buffer

An amazing effort by [@jozanza](https://twitter.com/jozanza), the Buffer module provides a data type for storing bytes that grows as data is appended. This can be used for efficiently concatenating large amounts of data, such as when building JSON strings, instead of allocating excessive amounts of strings to combine.

## Welcoming Josiah

I’m also excited to announce that we’ve added [Josiah](https://twitter.com/jozanza) to the Core Team! Oscar, Philip, Marcus, and I are extremely excited to have him join the team. In addition to the Buffer module, Josiah has also contributed our Bytes module, contributed to our Binaryen.ml bindings, and has some really cool Grain-related projects in the works. Welcome to the team, Josiah! 🙌

## So much more

This post is just the tip of the iceberg when it comes to everything we’ve achieved these last few months. I highly recommend checking out the entire [changelog](https://github.com/grain-lang/grain/releases/tag/grain-v0.4.0), and giving Grain Cereal a try today.

As always, please leave us feedback and request features on [GitHub](https://github.com/grain-lang/grain/issues) or [Discord](​​https://discord.com/invite/grain-lang)—we can’t make Grain delightful without you.
