---
title: grain doc
---

Grain ships with a documentation generator built directly into the compiler!

You may be used to similar tools, such as `JSDoc`, that allow you add a comment above code which describes the input and output types, along with other documentation. Generally, you'll run an external tool against your source code to generate your documentation.

In Grain, we have provided this as another command via the CLI, and it inherits the full-power of the compiler. You won't need to specify any types in your doc comments, as the compiler will infer them and insert into the output. 🎉

### An Example Of Grain Doc
```gr
/***
 * An alias for normal syntactic array access, i.e. `array[n]`.
 *
 * Retrieves the element from the array at the specified index.
 * A negative index is treated as an offset from the end of the array.
 *
 * @param index: The index to access
 * @param array: The array to access
 * @returns The element from the array
 *
 * @example Array.get(0, [> 0, 1, 2])
 *
 * @since v0.1.0
 * @history v0.2.0: Argument order changed to data-last
 */
export let get = (index, array) => {
 array[index]
}
```

## Using GrainDoc

### How to use GrainDoc
Graindoc is rather simple to use you start by adding the graindoc comments marked by `/** */` note the generator only generates documentation for exports of a module to your code and then you run `grain doc <file> -o <file>` to generate the documentation. 

### The Benefits Of GrainDoc
The benefits of tools like graindoc vs hand generated documentation is, Graindoc can actually use Grain’s strong type system in order to figure out the specific types of these and inject them into the output! Your type signatures will always be up-to-date with Graindoc because compilers are much better at type systems than humans.

## Annotations

### @param
The `@param` annotation indicates a parameter to the function. These should be specified in order of the function parameters and the name specified before the colon (`:`) must match the parameter name exactly. The content after the colon is the description of the parameter.
```gr
/**
 * @param name: description
 */
```

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

## Extra Annotations

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

## Without Annotations
Even if decide not to add annotations to your code, running the generator will still output function names and type signatures.
