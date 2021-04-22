---
title: Getting Grain
---

We have a couple different ways to get Grain. Most developers will prefer the Packaged Grain binaries, but make sure to read the note about speed!

## Packaged Grain

The Grain toolchain (including our CLI, compiler, runtime, and standard library) is shipped as a single binary. Binaries are available for [MacOS x64](#MacOS-x64---Homebrew), [Linux x64](#Linux-x64---Download), and [Windows x64](#Windows-x64---Download).

__Note:__ These binaries are a bit slow when first building a project (around 70 seconds). The packaged compiler is running in JavaScript, _and_ it builds and writes the runtime & standard library into your project. If you need raw speed, you can build the native compiler from source! See [Building Grain from Source](#Building-Grain-from-Source) below.

### MacOS x64 - Homebrew

The easiest way to install on MacOS is to install from our cask using [homebrew](https://brew.sh).

```sh
brew install --no-quarantine --cask grain-lang/tap/grain
```

_The `--no-quarantine` flag will avoid having to approve the binary in the Security Center._

### MacOS x64 - Download

If you'd prefer not to use homebrew, you can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.3.0/grain-mac-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/grain-v0.3.0/grain-mac-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Linux x64 - Download

You can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.3.0/grain-linux-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/grain-v0.3.0/grain-linux-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Windows x64 - Download

You can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.3.0/grain-win-x64.exe) directly from GitHub.

You'll either want to put it into your path or keep it inside your project and invoke with `./grain-win-x64.exe`.

## Building Grain from Source

To get access to the entirely native compiler, you can build Grain from source.

First, you'll need [Node.js](https://nodejs.org/en/download/current/) v14 and [Yarn](https://yarnpkg.com/getting-started/install).

Start by cloning the Grain repository:

```bash
git clone git://github.com/grain-lang/grain
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
