---
title: Building for Production
---

When you're satisfied with your program and ready to create a production build, the Grain CLI provides a few tools to help you create small, efficient WebAssembly binaries.

## The `release` profile

Compiling with the `release` profile turns on a number of additional optimizations that make the resulting Wasm file significantly smaller and faster than the development builds, at the cost of a bit more compilation time. The `release` profile can be enabled via the `--release` flag:

```sh
grain compile --release program.gr
```

## Dropping runtime type information

Since Grain programs are fully typechecked at compile time, runtime type information is only necessary for the generic `print` and `toString` functions, typically used for debugging. If your programs do not rely on `print` or `toString` for enum variants or records, you can drop all runtime type information from the module to get them a bit smaller:

```sh
grain compile --release --elide-type-info program.gr
```

Without runtime type information, `print` will continue to print strings, characters, booleans, numbers, tuples, and arrays normally. The affected values are only enum variants (including lists) and records, which will print as `<enum value>` and `<record value>` respectively. If this constraint is acceptable, you can take advantage of this flag and reduce your module sizes by a few kilobytes.
