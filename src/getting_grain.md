---
title: Getting Grain
---

## Building Grain

To build the compiler, you'll need `yarn` and Node.js version 14 or higher.

Start by cloning the Grain repository:

```bash
git clone git@github.com:grain-lang/grain.git
cd grain
```

To get everything set up, run:

```bash
yarn
yarn setup
yarn compiler:build
```

Running `yarn setup` will set up the Grain runtime, standard library, and CLI, and `yarn compiler:build` will compile the compiler (it's pretty meta—we know).

Finally, to get the `grainc` compiler command, run:

```bash
yarn compiler:install
```

After running these commands, you've have two new commands available on your command line—`grainc` and `grain`. The `grainc` command is the standalone compiler, and the `grain` command is a CLI tool that both compiles and runs Grain programs. Throughout the guide, we'll mostly be using `grain`.

You can check that everything is installed properly by running the compiler and CLI help commands:

```bash
grainc --help
grain --help
```

As long as those commands work, you're all set!

We'll first use the `grain` CLI to compile and run a Hello World program, but first let's set up our editor.
