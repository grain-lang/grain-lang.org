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

When generating docs, the type of the parameter will be detected by the compiler and inserted into the "Parameters" table.

### @returns

```gr
/**
 * @returns description
 */
```

The `@returns` annotation indicates the value that is returned by the function that the doc block is documenting.

These must be provided a description of the return value. In the Grain stdlib, we don't use the `@returns` annotation if the function returns `Void`.

When generating docs, the type of the return value will be detected by the compiler and inserted into the "Returns" table.

### @example

```gr
/**
 * @example code
 */
```

The `@example` annotation can be added to show how the documented code is used. Currently, only single line examples are allowed.

When generating docs, the code snippet will be wrapped in a code block tagged for the `grain` language and inserted into an "Examples" section.

### @since

```gr
/**
 * @since version
 */
```

The `@since` annotation can be used to specify when the documented code was added.

This must be provided a [Semantic Version](https://semver.org/), optionally prefixed with `v`. For example,`v0.2.0` or `0.2.0` are treated the same.

When generating docs, a `<details>` element titled "Added in X.X.X" will be inserted above the type signature. When using this annotation, you'll be required to specify the `--current-version=X.X.X` flag to the `grain doc` command. This allows you to specify newer versions in your source code, and the generated docs will show "Added in next" instead of the version.

### @history

```gr
/**
 * @history version: description
 */
```

The `@history` annotation can be used to share significant changes to the documented code.

This must be provided a [Semantic Version](https://semver.org/), optionally prefixed with `v` before the colon (`:`) and a description of the change after the colon.

When generating docs, will add a history table to the `<details>` element created by the `@since` attribute if both were used; otherwise, a new `<details>` element titled  "History" will be inserted above the type signature. When using this attribute, you'll be required to specify the `--current-version=X.X.X` flag to the `grain doc` command. This allows you to specify newer versions in your source code, and the generated docs will show "next" instead of the version.

### @deprecated

```gr
/***
 * @deprecated
 */
```

The `@deprecated` annotation indicates the deprecation of the documenting export. 

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
