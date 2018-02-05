---
title: Introduction
---

## The Grain Language

Grain is a strongly-typed functional programming language built for the modern web. Unlike other languages used on the web today (like TypeScript or Elm), Grain doesn't compile into JavaScript. Grain complies all the way down to [WebAssembly](http://webassembly.org/), and is supported by a tiny JavaScript runtime to give Grain access to web features that WebAssembly doesn't yet support.

When designing Grain, we really embraced the idea of Grain being a modern web staple. All puns aside, we thought a lot about how developers write for the web today, and what matters the most to them. Here's what we thought were some of the most important:

* Being __functional__, but __flexible__. Functional programming makes it easy to reason about many programs, but it isn't always the tool that makes the most sense for the task at hand. It should be farily easy to express oneself in a different style.
* __Playing nicely with others.__ We often use many tools together, so it's important that they don't get in each other's way.
* Achieving __full type safety__ with __none of the fuss__. It's 2018, so we shouldn't still be dealing with runtime exceptions, and we shouldn't have to write out explicit types for things to achieve that either.
* __Embracing new web standards__ to push us all forward. We now have the freedom to have any language run natively in the browser, so someone needs to lead the charge.