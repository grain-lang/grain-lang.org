---
title: Getting Grain
---

We have a couple different ways to get Grain. Most developers will prefer the Packaged Grain binaries, but make sure to read the note about speed!

## Packaged Grain

The Grain toolchain (including our CLI, compiler, runtime, and standard library) is shipped as a single binary. Binaries are available for [MacOS x64](#MacOS-x64---Homebrew), [Linux x64](#Linux-x64---Download), and [Windows x64](#Windows-x64---Download).

**Note:** These binaries are a bit slow when first building a project (around 70 seconds). The packaged compiler is running in JavaScript, _and_ it builds and writes the runtime & standard library into your project. If you need raw speed, you can build the native compiler from source! See [Building Grain from Source](#Building-Grain-from-Source) below.

### MacOS x64 - Homebrew

The easiest way to install on MacOS is to install from our cask using [homebrew](https://brew.sh).

```sh
brew install --no-quarantine --cask grain-lang/tap/grain
```

_The `--no-quarantine` flag will avoid having to approve the binary in the Security Center._

### MacOS x64 - Download

If you'd prefer not to use homebrew, you can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-mac-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-mac-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Linux x64 - Download

You can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-linux-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-linux-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Windows x64 - Download

You can [download it](https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-win-x64.exe) directly from GitHub or using `curl`.

```batch
curl -LO https://github.com/grain-lang/grain/releases/download/grain-v0.5.13/grain-win-x64.exe
```

You'll either want to put it into your path or keep it inside your project and invoke with `.\grain-win-x64.exe`.

## Previews

We also provide Preview binaries for developers that want to live on the bleeding edge.

**Note:** These are built on almost every commit to our main branch, so they should be considered unstable and the website documentation likely won't match up! Using these binaries successfully requires following the development of Grain closely and/or reviewing our [rolling changelog](https://github.com/grain-lang/grain/pulls?q=is%3Aopen+is%3Apr+label%3A%22autorelease%3A+pending%22).

### MacOS x64 - Preview

You can [download it](https://github.com/grain-lang/grain/releases/download/preview/grain-mac-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/preview/grain-mac-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Linux x64 - Preview

You can [download it](https://github.com/grain-lang/grain/releases/download/preview/grain-linux-x64) directly from GitHub or using `curl`.

```sh
sudo curl -L --output /usr/local/bin/grain \
https://github.com/grain-lang/grain/releases/download/preview/grain-linux-x64 \
&& sudo chmod +x /usr/local/bin/grain
```

### Windows x64 - Preview

You can [download it](https://github.com/grain-lang/grain/releases/download/preview/grain-win-x64.exe) directly from GitHub or using `curl`.

```batch
curl -LO https://github.com/grain-lang/grain/releases/download/preview/grain-win-x64.exe
```

You'll either want to put it into your path or keep it inside your project and invoke with `.\grain-win-x64.exe`.

## Community

These installation methods are maintained by the community—they're not supplied by the Grain team, but you may find them to be useful alternatives to the official distributions.

### Using asdf

You can install specific version of Grain toolchain using [asdf](https://asdf-vm.com) runtime version manager.

```bash
asdf plugin add grain

# List all available version
asdf list all grain

asdf install grain 0.4.6
asdf global grain 0.4.6
```

See the [plugin](https://github.com/cometkim/asdf-grain) for more details.

## Building Grain from Source

To get access to the entirely native compiler, you can build Grain from source.

First, you'll need [Node.js](https://nodejs.org/en/download/current/) v16.

Start by cloning the Grain repository:

```bash
git clone https://github.com/grain-lang/grain
cd grain
```

To get everything set up, run:

```bash
npm ci
npm run compiler build
```

Running `npm ci` will fetch our dependencies and then set up the Grain runtime, standard library, and CLI. To rebuild any of those without checking dependencies, you can run `npm run prepare` separately.

Running `npm run compiler build` will compile the compiler (it's pretty meta—we know).

After running these commands, you'll have a new command available on your command line—`grain`. The `grain` command is a CLI tool that both compiles and runs Grain programs.

You can check that everything is installed properly by running the version command:

```bash
grain --version
```

If you see a a version for the CLI and the compiler, you're all set! If not, please consult the [Troubleshooting](#Troubleshooting) section.

We'll first use the `grain` CLI to compile and run a Hello World program, but first let's set up our editor.

### Troubleshooting

This section contains solutions to problems which people may run into when building and installing Grain.

#### After install, the `grain` command is not found

This likely means that you haven't put `npm`'s global `bin` directory on your shell's `PATH` variable. This can be fixed by setting the variable in your shell's configuration. For example, if you use `zsh`, you can do the following:

```bash
# Initialize the PATH variable in your configuration and enable the change
(echo 'export PATH="${PATH}:$(npm bin --global)"' >> ~/.zshrc) && source ~/.zshrc
```

For `bash`, the process is the same, except `~/.zshrc` should be replaced with `~/.bashrc`.

For Windows `cmd.exe` and PowerShell users, you can run the following inside of PowerShell to update the `PATH` for your current user (this will fix the `PATH` variable for both `cmd.exe` and PowerShell):

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";" + (npm bin --global) -join "`n","User")
```

If you would like to update the `PATH` for all users, replace `"User"` with `"Machine"`. After running this command, restarting the shell should fix the issue.

For other shells, the process may look a little different, but the procedure should always look something like the following:

- Determine the output of `npm bin --global`
- Put the directory that this command outputs onto your `PATH` variable
- Restart or reinitialize your shell as needed to make the change take effect

If the `grain` command still does not work, then please contact us in the `#support` channel on [our Discord][discord].

[discord]: https://discord.com/invite/grain-lang
