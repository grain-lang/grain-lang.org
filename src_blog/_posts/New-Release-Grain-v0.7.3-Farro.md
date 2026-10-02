---
title: New Release! Grain v0.7.3 - Farewell, Farro
subtitle: Announcing the release of Grain v0.7.3, One last harvest before something new takes root.
date: 2026-10-02 15:00:00
author: Jake Follest
cover: /blog/photos/cover/jacek-dylag-tThzcOnd93o-unsplash.jpg
coverAttribution: Jacek Dylag / Unsplash
tags: Release, Changelog
---

Today we're excited to announce the release of Grain v0.7.3, the final release of Grain Farro and the last version of Grain built around linear memory.

We know it's been a while since our last release, but that time hasn't been wasted. We've been hard at work on v0.8, and we're excited to say that it's very close.

Before we move on, though, we wanted to give Farro one last release. Since v0.7.3 is the final Grain release using linear memory, it also marks the end of support for a couple of older runtimes. As such we really wanted to make this release count, for any legacy use cases.

## What's new?

v0.7.3 includes a collection of improvements across the compiler, language server, standard library, and toolchain.

### A major Binaryen upgrade

One of the largest changes in this release is the upgrade of our WebAssembly toolkit, [Binaryen](https://github.com/WebAssembly/binaryen), from v125 to v133.

This was far more involved than simply bumping a version number, requiring months of testing, upstream fixes, compatibility changes, and updates across our Binaryen bindings. The upgrade brings newer optimizations, performance improvements, and a host of other improvements to Grain's WebAssembly pipeline.

We're particularly happy to include this work in the final Farro release, as much of it originally came out of our WebAssembly GC work for v0.8.

### Better tooling

This release also brings a number of improvements to Grain's tooling. The Grain language server has received several bug fixes, many contributed by [@Kara-Zor-EL](https://github.com/Kara-Zor-El), alongside clearer and more helpful errors when parsing source code.

v0.7.3 is also the first Grain release to ship with prebuilt ARM64 binaries, making it easier to get Grain running on ARM systems without building the compiler yourself.

### Compiler and type checker fixes

Several long-standing issues in the type checker have also been addressed. While these fixes may be less visible than a new feature, they help make the compiler more reliable and remove some particularly persistent edge cases.

### Standard library fixes

v0.7.3 also contains a number of fixes across the standard library, continuing the steady work we've been doing throughout the Farro release cycle.

## Looking back at Farro

While v0.7.3 is the focus of this blog post, it is also worth looking back at everything that has silently landed across v0.7.

Throughout v0.7, we've made substantial improvements to Grain's development experience and compiler infrastructure, including:

* Improved error reporting
* Document outlines in the LSP
* Inlay type information in the LSP
* Formatter fixes and improvements
* Improved compiler errors
* Numerous standard library additions and fixes
* The transition from OCaml 4 to OCaml 5 and improved reliability
* Binaryen upgrades from v118 all the way to v133
* A variety of improvments and fixes across the toolchain

Together, these releases have helped to lay a lot of the groundwork for what's coming next.

## Looking ahead

With Farro now complete, our attention turns fully towards getting Grain v0.8 into the hands of users.

The next release represents a much larger step for the language, including our transition towards WebAssembly GC. There's a lot happening under the hood, and we're excited to finally start bringing some of the features we've been enjoying to users.

As Grain continues to grow, we're also taking another look at some of the places where Grain itself could better showcase what the language has become and what lies ahead 👀.

For now, though, we're happy to close out Farro with v0.7.3.

Thank you to everyone who has contributed to Grain throughout v0.7.

We're looking forward to seeing you in v0.8. And with v0.8 now confidently right around the corner, keep your eyes open and be ready for the harvest to come. 🌾
