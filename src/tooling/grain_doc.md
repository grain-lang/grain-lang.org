---
title: grain doc
---

Grain ships with a documentation generator built directly into the compiler!

You may be used to similar tools, such as `JSDoc`, that allow you to add a comment above code which describes the input and output types, along with other documentation. Generally, you'll run an external tool against your source code to generate your documentation.

In Grain, we have provided this as another command via the CLI, and it inherits the full power of the compiler. For example, you won't need to specify any types in your doc comments, as the compiler will infer them. 🎉

Here's a quick example of adding a doc block to your grain code:
```gr
/**
 * An alias for normal syntactic array access, i.e. `array[n]`.
 *
 * Retrieves the element from the array at the specified index.
 * A negative index is treated as an offset from the end of the array.
 *
 * @param index: The index to access
 * @param array: The array to access
 * @returns The element from the array
 *
 * @since v0.1.0
 * @history v0.2.0: Argument order changed to data-last
 */
export let get = (index, array) => {
  array[index]
}
```

## Usage

Before running `grain doc`, you'll want to add doc block comments to your code. Doc block comments are started with `/**` and ended with `*/`. They must exist on the line above a type declaration or exported value. No docs will be generated for non-exported values so you can keep module internals private.

You can run `grain doc <file|dir> -o <file|dir>` to generate markdown documentation for your code. As of Grain v0.5, the `grain doc` command supports directory input to recursively generate documentation for all `.gr` files.

### Without doc blocks

You can even use `grain doc` without doc blocks in your code. It will still generate simple documentation for data types and exported values, such as displaying their names and type signatures.

## Annotations

### @param

```gr
/**
 * @param name: description
 */
```
The `@param` annotation indicates a parameter to the function that the doc block is documenting.

These should be specified in order of the function parameters and the name specified before the colon (`:`) should match the parameter name exactly—while not currently enforced, it will be required for named parameters in the future. The content after the colon is the description of the parameter.

When generating docs, the type of the parameter will be detected by the compiler and inserted into the parameters table.

### @returns

```gr
/**
 * @returns description
 */
```

The `@returns` annotation indicates the return of the function that the doc block is documenting.

When generating docs, the type of the return will b detected by the compiler and inserted into the output.

### @example

```gr
/**
 * @example code
 */
```

The `@example` annotation displaying how the function will be used. Currently only single line examples are allowed.

### @since

```gr
/**
 * @since version
 */
```

The `@since` annotation specifies the [Semantic Version](https://semver.org/) the documenting export was added in.

### @history
```gr
/**
 * @history version description
 */
```

The `@history` annotation similar to `@since` specifies the [Semantic Version](https://semvar.org/) a change to the documenting feature was made, multiple history annotations can be used in a single docblock. 


### @module

```gr
/***
 * @module Array: Utilities for working with arrays.
 *
 * @example import Array from "array"
 *
 * @since v0.2.0
 * @history v0.1.0: Originally named `arrays`
 * @history v0.2.0: Renamed to `array`
 */
```

The `@module` annotation allows you to add header documenting to a module. A module docblock can contain `@example`, `@since`, and `@history` annotations.

### @section

```gr
/***
 * @section Values: Functions for working with the Array data type.
 */
```

The `@section` annotation is used to group exports into catagories. Any docblocks after a given function are grouped under that header.

### @deprecated

```gr
/***
 * @deprecated
 */
```

The `@deprecated` annotation indicates the deprecation of the documenting export. 