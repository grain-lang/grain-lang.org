---
title: The Grain CLI
---

The Grain CLI is an all-in-one tool for compiling, running, documenting, and formatting all of your Grain programs.

## `grain`

The top level `grain` command will compile and run a Grain program. This can be useful during development for quick iteration cycles. The flags available for this command are equivalent to the flags for `grain compile`.

```sh
grain hello.gr
```

## `grain compile`

Compiles a Grain program to WebAssembly.

```sh
grain compile hello.gr
```

All of the supported flags can be found below:

| Flag                          | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| -I, --include-dirs <dirs>     | add additional dependency include directories                               |
| -S, --stdlib <path>           | override the standard libary with your own                                  |
| --initial-memory-pages <size> | initial number of WebAssembly memory pages                                  |
| --maximum-memory-pages <size> | maximum number of WebAssembly memory pages                                  |
| --compilation-mode <mode>     | compilation mode (advanced use only)                                        |
| --elide-type-info             | don't include runtime type information used by toString/print               |
| --release                     | compile using the release profile (production mode)                         |
| --experimental-wasm-tail-call | enables tail-call optimization                                              |
| --debug                       | compile with debugging information                                          |
| --wat                         | additionally produce a WebAssembly Text (.wat) file                         |
| --hide-locs                   | hide locations from intermediate trees. Only has an effect with `--verbose` |
| --no-color                    | disable colored output                                                      |
| --no-gc                       | turn off reference counting garbage collection                              |
| --no-bulk-memory              | polyfill WebAssembly bulk memory instructions                               |
| --wasi-polyfill <filename>    | path to custom WASI implementation                                          |
| --use-start-section           | replaces the \_start export with a start section during linking             |
| --no-link                     | disable static linking                                                      |
| --no-pervasives               | don't automatically import the Grain Pervasives module                      |
| --parser-debug-level <level>  | debugging level for parser output                                           |
| --memory-base <addr>          | set the base address for the Grain heap                                     |
| --source-map                  | generate source maps                                                        |
| --strict-sequence             | enable strict sequencing                                                    |
| --verbose                     | print critical information at various stages of compilation                 |
| -h, --help                    | display help for command                                                    |

## `grain run`

Runs a WebAssembly file. The `grain run` command can run Grain programs compiled with `--no-link`, and can also run WebAssembly files produced by other compilers.

```sh
grain run hello.gr.wasm
```

It should be noted that `grain run` is used here on the WebAssembly file produced via `grain compile`.

## `grain doc`

Produces documentation for a Grain program. See the full [Graindoc page](./graindoc) to learn more!

Generating docs for a single file on stdout:

```sh
grain doc hello.gr
```

Generating docs for a single file:

```sh
grain doc hello.gr -o hello.md
```

Generating docs for an entire project:

```sh
grain doc . -o .
```

## `grain format`

Formats Grain files. Running `grain format` on a single file will write the formatted file on stdout, and the result can be written to a file via the `-o` flag. `grain format` can also be used on a directory to format all of the Grain files in a project.

Formatting a single file to stdout:

```sh
grain format hello.gr
```

Formatting a single file in place:

```sh
grain format hello.gr -o hello.gr
```

Formatting a project in place:

```sh
grain format . -o .
```

## `grain lsp`

Starts a Grain language server. Generally, this command is used by your code editor to display information about your programs as you write them, and you never need to worry about using this command manually. You can learn more about the Language Server Protocol [here](https://microsoft.github.io/language-server-protocol/).
