---
title: Hello World
slug: guide/hello_world
---

## Writing Your First Grain Program

It's time to write your first Grain program! While simple, this program should verify that we have everything set up correctly.

### The File Extension

By convention, Grain files end with the extension `.gr`. Let's create our first file and call it `hello.gr`.

### The Code

The code for this program is fairly straightforward and should feel familiar from other languages.

The module header is the first line of the file and it is mandatory for every module. Although it is recommended to name the module the same as the file, it is not strictly necessary. Module names must begin with a capital letter. 

```grain
module Hello

print("Hello, world!")
```

### Running the Program

To compile and run the program, we can use the Grain CLI:

```bash
grain hello.gr
```

Alternatively, to compile and run the program in separate steps:

```bash
grain compile hello.gr # outputs the compiled binary to `hello.gr.wasm`
grain run hello.gr.wasm
```

If everything is set up properly, we should see the message appear in the console!
