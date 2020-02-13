---
title: Getting Grain
---

## What You'll Need

To build the compiler, you'll need to have `ocaml` version 4.08 and `opam` version 2.0 installed and on your path.

We'll also be using Node.js, so have `node` version 12 or higher.

## Building the Grain Compiler

Start by cloning the Grain repository:

```bash
git clone git@github.com:grain-lang/grain.git
cd grain
```

Make sure you have OCaml 4.08 enabled:

```bash
opam switch 4.08.1
```

Install the dependencies and build the compiler:

```bash
opam install . --deps-only
make
make install
```

You can check that everything is installed properly by running the compiler help command:

```bash
grainc --help
```

## Building the Runtime

The runtime is a tiny JavaScript library that provides some support for Grain until WebAssembly is a bit more mature.

```bash
cd runtime
npm install
npm run build
cd -
```

## Setting Up the Grain CLI

The Grain CLI provides some useful utilities in addition to compiling programs, and will be very useful throughout the guide!

```bash
cd cli
npm install
npm link --global
cd -
```

We'll first use the CLI to compile and run a Hello World program, but first let's set up our editor.
