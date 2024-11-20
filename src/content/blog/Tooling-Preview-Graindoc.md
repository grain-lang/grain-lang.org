---
title: Tooling Preview - Graindoc
subtitle: Providing a better documentation workflow for Grain modules.
date: 2021-08-27 12:00:00
author: Blaine Bublitz
cover: /src/images/cover/marie-bellando-mitjans-cBChXxQqEKM-unsplash.jpg
coverAttribution: Marie Bellando-Mitjans / Unsplash
tags:
  - Tooling
  - Developer Experience
  - Documentation
---

Between the beginning of my career in software development and today, a lot of progress has been made on the tooling we use to write code every day, like language servers, code formatters, and documentation generators. When you compile an already-existing language to WebAssembly, you get to benefit from all the tooling that already exists for that language—a huge boon to productivity!

When I got involved with Grain, I didn’t quite understand how much work would be required to get the developer experience up-to-snuff. We already have the [Grain Language Server](https://github.com/grain-lang/grain-language-server) for VSCode (with Vim support coming soon), but we need to build out a lot more of this tooling!

## Graindoc

```sh
grain doc stdlib/array.gr -o stdlib/array.md
```

As a team, we’ve struggled with keeping our standard library documentation updated. For us, it is easier to write code comments in our monorepo than markdown documentation in our website repository. This led me on an adventure to build our Graindoc tool. Graindoc will look familiar to anyone that has written JavaDoc or JSDoc in the past, but with some niceties provided by the compiler.

Let’s take a look at the anatomy of a Graindoc comment:

```grain
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
 * @example Array.get(0, [> 0, 1, 2])
 *
 * @since v0.1.0
 * @history v0.2.0: Argument order changed to data-last
 */
export let get = (index, array) => {
 array[index]
}
```

The first thing we’ll notice is the `/** */` comment block. This signals to the compiler to parse the comment as a docblock instead of a multi-line comment (`/* */`). Additionally, the docblock is applied to an exported function—the Graindoc tool only generates documentation for exports of a module.

Breaking down the parts of the docblock itself.

1. Any lines that don’t begin with a `@something` annotation are treated as a single description and grouped together with a newline separator.
2. The `@param` annotation indicates a parameter to the function. These should be specified in order of the function parameters and the name specified before the colon (`:`) must match the parameter name exactly. The content after the colon is the description of the parameter.
3. The `@returns` annotation provides a description for the return value of the annotated function.
4. The `@example` annotation can be used to add single-line examples for the function. These are rendered in a markdown code block annotated as the “grain” language. Multiple examples can be specified with separate annotations.
5. The `@since` annotation specifies a [Semantic Version](https://semver.org) for the version in which this function was added.
6. The `@history` annotation is similar to `@since`, but, in addition to the version, provides a description of a change that was made. While only 1 `@since` annotation can be specified, multiple `@history` annotations can be used.

If you are familiar with a tool like TSDoc, you might be wondering why we don’t specify the type for the `@param` or `@returns` annotations; this is because Graindoc can actually use Grain's strong type system in order to figure out the specific types of these and inject them into the output! Your type signatures will always be up-to-date with Graindoc because compilers are much better at type systems than humans. 😉

You can see the types in the Parameters and Returns tables in the output:

````markdown
### Array.**get**

<details>
<summary>Added in <code>0.1.0</code></summary>
<table>
<thead>
<tr><th>version</th><th>changes</th></tr>
</thead>
<tbody>
<tr><td><code>0.2.0</code></td><td>Argument order changed to data-last</td></tr>
</tbody>
</table>
</details>

```grain
get : (Number, Array<a>) -> a
```

An alias for normal syntactic array access, i.e. `array[n]`.

Retrieves the element from the array at the specified index.
A negative index is treated as an offset from the end of the array.

Parameters:

| param   | type       | description         |
| ------- | ---------- | ------------------- |
| `index` | `Number`   | The index to access |
| `array` | `Array<a>` | The array to access |

Returns:

| type | description                |
| ---- | -------------------------- |
| `a`  | The element from the array |

Examples:

```grain
Array.get(0, [> 0, 1, 2])
```
````

## Extra annotations

The primary vehicle for development of Graindoc has been the Grain standard library, so we needed to add some additional annotations to produce our expected output.

### `@module`

The `@module` annotation allows you to add header documentation to a module. A module docblock can also contain `@example`, `@since`, and `@history` annotations. Our `array` module is a good example of this:

```grain
/**
 * @module Array: Utilities for working with arrays.
 *
 * @example import Array from "array"
 *
 * @since v0.2.0
 * @history v0.1.0: Originally named `arrays`
 * @history v0.2.0: Renamed to `array`
 */
```

### `@section`

The `@section` annotation is used as a grouping mechanism. Any docblocks between a section and the next are grouped under that header. In the standard library documentation, we use these to separate "Types" and "Values":

```grain
/**
 * @section Values: Functions for working with the Array data type.
 */
```

### `@deprecated`

From time to time, we’ll need to deprecate things in the standard library. In fact, we’ve already had deprecations in the v0.3.x releases that will be removed in v0.4. This has led us to add the `@deprecated` annotation that will produce a warning with the deprecation message.

## Without annotations

Even if you decide to not add these docblocks to your code, you can still run Graindoc against your code to output function names and type signatures. This is the bare-minimum we can generate without any annotations and might be improved as more development happens on the tool. Running Graindoc on our Hash library without any annotations outputs:

````markdown
### Hash.**hash**

```grain
hash : a -> Number
```
````

## Preview mode

We plan to release this tool in the v0.4 release—but it is already available if you build the Grain compiler from source on the `main` branch. It will remain in “preview” for a while because we still are finding bugs and improvements to be made as we document our own standard library. We encourage you to try it out on your Grain code and give us feedback to make it better!

We have some additional features that we are excited to add in the future, such as surfacing the comments on hover using the Grain Language Server, but this is our first step in having a great developer experience for all Grain users!
