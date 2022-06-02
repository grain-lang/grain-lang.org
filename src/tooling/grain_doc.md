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
The `@param` annotation indicates a parameter to the function that the doc block is documenting.

These should be specified in order of the function parameters and the name specified before the colon (`:`) should match the parameter name exactly—while not currently enforced, it will be required for named parameters in the future. The content after the colon is the description of the parameter.

When generating docs, the type of the parameter will be detected by the compiler and inserted into the parameters table.

### @returns
The `@returns` annotation provides a description for the return value of the annotated function.
```gr
/**
 * @returns description
 */
```

### @example
The `@example` annotation can be used to add single-line examples for the function. These are rendered in a markdown code block annotated as the “grain” language. Multiple examples can be specified with separate annotations.
```gr
/**
 * @example code
 */
```

### @since
The `@since` annotation specifies a [Semantic Version](https://semver.org/) for the version in which this function was added.
```gr
/**
 * @since version
 */
```

### @history
The `@history` annotation is similar to `@since`, but, in addition to the version, provides a description of a change that was made. While only 1 `@since` annotation can be specified, multiple `@history` annotations can be used.
```gr
/**
 * @history version description
 */
```


### @module
The `@module` annotation allows you to add header documentation to a module. A module docblock can also contain `@example`, `@since`, and `@history` annotations. Our `array` module is a good example of this:
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

### @section
The `@section` annotation is used as a grouping mechanism. Any docblocks between a section and the next are grouped under that header. In the standard library documentation, we use these to separate “Types” and “Values”:
```gr
/***
 * @section Values: Functions for working with the Array data type.
 */
```

### @deprecated
From time to time, we’ll need to deprecate things in the standard library. In fact, we’ve already had deprecations in the v0.3.x releases that will be removed in v0.4. This has led us to add the `@deprecated` annotation that will produce a warning with the deprecation message.

