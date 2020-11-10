---
title: Getting Grain
---

## Building Grain

Grain currently only works on Mac and Linux. We are hard at work trying to integrate Binaryen and OCaml on Windows, but this is uncharted territory! Please let us know if you have this low-level expertise.

To build the compiler, you'll need [Node.js](https://nodejs.org/en/download/current/) v14 and [Yarn](https://yarnpkg.com/getting-started/install).

Start by cloning the Grain repository:

```bash
git clone git@github.com:grain-lang/grain.git
cd grain
```

To get everything set up, run:

```bash
yarn
yarn compiler build
```

Running `yarn` will fetch our dependencies and then set up the Grain runtime, standard library, and CLI. To rebuild any of those without checking dependencies, you can run `yarn prepare` separately.

Running `yarn compiler build` will compile the compiler (it's pretty meta—we know).

After running these commands, you'll have a new command available on your command line—`grain`. The `grain` command is a CLI tool that both compiles and runs Grain programs.

You can check that everything is installed properly by running the version command:

```bash
grain --version
```

If you see a a version for the CLI and the compiler, you're all set!

We'll first use the `grain` CLI to compile and run a Hello World program, but first let's set up our editor.
