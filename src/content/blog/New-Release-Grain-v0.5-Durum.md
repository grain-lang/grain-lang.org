---
title: New Release! Grain v0.5 - Durum
subtitle: Announcing the release of Grain v0.5, Durum, with faster compile times, big numbers, and more.
date: 2022-06-06 12:00:00
author: Oscar Spencer
cover: /src/images/cover/yoav-aziz-pasta-unsplash.jpg
coverAttribution: Yoav Aziz / Unsplash
tags:
  - Release
  - Changelog
---

Hey folks, today we’re absolutely thrilled to announce the release of Grain v0.5, Durum! This release marks an enormous step forward for the language and tooling, all thanks to the tremendous effort put in by the team and community to deliver a release that we're truly proud of. You can expect huge compiler performance improvements, better language ergonomics, and as always, better tooling. You can find the full [release notes](https://github.com/grain-lang/grain/releases/tag/grain-v0.5.0) on GitHub but we wanted to highlight some things we are excited about.

## Language Features

First up: the new language features included in this release.

### Arbitrary precision math

In Grain v0.5, you’ll find that number operations no longer overflow—you can create integer `Number`s as large as you like, only limited by the total memory of your Wasm host. Whether you need to do some data science or you just like really big numbers, Grain has your back.

In addition to our `Number` type now having arbitrary precision, we’ve also added the `BigInt` type for situations where you want some added type safety while staying firmly in the realm of large integers. `BigInt`s have a new literal syntax, `42t`, and you can find operators in the new [bigint](https://grain-lang.org/docs/stdlib/bigint) standard library module.

Big thanks to core team members [Philip](https://twitter.com/Philip_E_Blair) and [Josiah](https://twitter.com/jozanza) for putting in the effort to make this happen!

### “Or” patterns and pattern aliases

Pattern matching is now more powerful, with the addition of “or” patterns and alias patterns. “Or” patterns allow you to use a pipe (`|`) to specify multiple variations of a pattern, inline. This leads to more concise and expressive `match` statements. For example, finding the middle element in a list that contains exactly 3 or 5 elements:

```grain
match (list) {
  [_, mid, _] |
  [_, _, mid, _, _] => Some(mid),
  _ => None,
}
```

These can also be nested deeply within other patterns. Aliases can be used to create bindings for subpatterns. There are many use cases where you’d want this, but a favorite of mine is creating a binding for a constant pattern:

```grain
match (user) {
  Some("Bob" | "Sally" as name) => "VIP " ++ name,
  Some(name) => "Valued guest " ++ name,
  None => "Member",
}
```

The `as name` creates a binding for `”Bob”` or `”Sally”`, whichever is matched. This feature was contributed by [yours truly](https://twitter.com/oscar_spen), and it got me thinking that folks might be curious about how pattern matching works under the hood. If you'd like to see a blog post explaining the concept, let me know!

### Wasm performance

With some tweaks to our code generation and how we statically link compiled modules together, we’re now able to produce binaries that are a fair bit smaller (30% smaller for hello world) and in some cases, significantly faster. Although all Grain functions are first-class values, in many cases we’re able to tell exactly how they’re used and emit faster function call instructions.

## Developer Experience

We care deeply about developer experience and make sure we’re improving it with every single release. This time is certainly no exception and just the start of what’s to come in future releases.

### Faster binaries

We’ve heard the community loud and clear—the pre-built binaries were painfully slow. To that end, the team spent this release cycle working tirelessly to speed up various slow paths in the compiler. With these improvements, compiling a program is an order of magnitude faster.

We’ll talk about the [new parser](#New-parser) and [compilation profiles](#Compilation-profiles) below, which were the biggest improvements by far.

If you build Grain from source, we now fully support the Mac M1 architecture. Both the initial compilation and incremental builds are much, much faster on an M1 computer. In the near future, we hope to provide arm64 Docker images, but that will take some more work.

### New parser

This release ships with a brand new parser. Not only is this parser significantly faster than the old parser, but it also brings nearly 200 unique error messages for when a syntax error occurs—providing you with specific details about what went wrong and how you can fix it.

![grain parser error](/src/images/misc/grain-parser-error.jpg)

### Compilation profiles

To make the configuration for building modules for production much easier, we’ve introduced compilation profiles. Initially, we have just one—`release`—which enables all of the best-in-class WebAssembly optimizations available today. After some profiling, we discovered that running these optimizations accounted for more than 50% of compilation time, and they’re really only necessary when you’re ready to ship a release of your module. The release profile can be enabled via the `--release` flag, and you can learn more about it in [the corresponding documentation](https://grain-lang.org/docs/tooling/building_for_production).

### New LSP

Previously, Grain editor support was exclusive to Visual Studio Code due to a required shim layer between the extension and compiler. In this release of Grain, core team member [Marcus](https://twitter.com/marcusr) added a long-running language server directly into the `grain` command that speaks the language server protocol.

This means that the newest version of the VSCode extension is exclusively a “language client” that launches `grain lsp`, and any other editor that supports the language server protocol will be able to integrate seamlessly. Support for Emacs is coming soon, but let us know what other editors you want to see support for!

### Unified version numbers

Before this release, our bugfix releases would not change the version number on libraries we did not modify. For example, `@grain/js-runner` was never changed between v0.4.0 and v0.5.0, so it never had any patch releases, leaving it out of sync with the compiler version.

We felt that this could be confusing to users, so we’ve updated our release process to ensure all versions are always in sync. Going forward, if you’re using something like v0.5.6 of the compiler, you should also use v0.5.6 of `@grain/stdlib` and/or `@grain/js-runner`.

### Graindoc & Grainfmt

Our Graindoc and Grainfmt tools have existed since v0.4, but we’ve made some quality-of-life improvements in this release. Both tools now support directory input—if the path given to the CLI is a directory, it will read every `.gr` file recursively and run them through the tool.

Overall, Graindoc output has become more accurate thanks to a number of bug fixes we introduced while generating our standard library documentation with the tool. You read that right—the entire standard library documentation is now generated by Graindoc! Huge shoutout to community member [spotandjake](https://twitter.com/spotandjake) for taking on the herculean effort of adding docblock comments to the entire standard library.

We’re always trying to improve Windows support across all of Grain, and in this release, we made sure that Grainfmt preserves the line-endings of a file it formats. No more newline conflicts in your CRLF text files. 🎊

[Blaine](https://twitter.com/BlaineBublitz) oversees all of our tooling, and was instrumental in landing these updates and getting the language server over the finish line. Be sure to show him some love!

## Onwards

I’d end this by saying “that’s it,” but there was loads more included in this release, and I’d encourage you to check out the [full set of release notes](https://github.com/grain-lang/grain/blob/main/CHANGELOG.md#050-2022-06-05). We’d love to know what you think of this release! Let us know on Discord or Twitter—we’re actively listening to your feedback and incorporating it into everything we do.
