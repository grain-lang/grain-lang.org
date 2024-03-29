---
title: Graindoc
---

Grain ships with a documentation generator built directly into the Grain CLI, known as Graindoc!

You may be used to similar tools, such as JSDoc, that allow you to add a comment above code which describes the input and output types, along with other documentation. Generally, you'll run an external tool against your source code to generate your documentation.

In Grain, we have provided this as another command via the CLI, and it inherits the full power of the compiler. For example, you won't need to specify any types in your code comments, as the compiler will infer them. 🎉

Here's a quick example of adding a docblock to your grain code:

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
provide let get = (index, array) => {
  array[index]
}
```

## Usage

Before running `grain doc`, you'll want to add docblock comments to your code. Docblock comments are started with `/**` and ended with `*/`. They must exist on the line above a type declaration or exported value. No documentation will be generated for non-exported values to keep module internals private.

You can run `grain doc <file|dir> -o <file|dir>` to generate markdown documentation for your code. As of Grain v0.5, the `grain doc` command allows specifying a directory to recursively generate documentation for all `.gr` files.

### Without docblocks

You can even use `grain doc` without docblocks in your code. It will still generate simple documentation for data types and exported values, such as displaying their names and type signatures.

## Attributes

### @param

```gr
/**
 * @param name: description
 */
```

The `@param` attribute provides information for one parameter of the function being documented.

Multiple `@param` attributes should be specified in order of the function parameters. The name specified before the colon (`:`) should match the parameter name exactly—while not currently enforced, it will be required for named parameters in the future. The content after the colon is the description of the parameter.

When generating docs, the type of the parameter will be detected by the compiler and added to the parameter's row in the "Parameters" table.

### @returns

```gr
/**
 * @returns description
 */
```

The `@returns` attribute provides information for the return value of the function being documented.

This attribute requires a description of the return value. In the Grain standard library, we don't use the `@returns` attribute if the function returns `Void`.

When generating docs, the type of the return value will be detected by the compiler and added to the row in the "Returns" table.

### @throws

```gr
/**
 * @throws Exception(Types): description
 */

/**
 * @throws Exception: description
 */
```

The `@throws` attribute provides information about any exceptions the function may throw.

This attribute requires an exception and types of the exception data before the colon (`:`) and a description of when the exception occurs after the colon.

When generating docs, adds the exception to the output followed by a list of cases where the exception occurs.

### @example

```gr
/**
 * @example code
 */
```

The `@example` attribute provides snippets showing how the documented code is used.

When generating docs, the code snippet will be wrapped in a code block tagged for the `grain` language and added to an "Examples" section.

Below are a few examples:
```gr
/**
 * @example print("Hello World")
 */

/**
 * @example let arr = [> 2, 1, 3]
 * Array.sort((a, b) => a-b, arr)
 * assert arr = [>1,2,3]
 */

/**
 * @example 
 * let arr = [> 2, 1, 3]
 * Array.sort((a, b) => a-b, arr)
 * assert arr = [>1,2,3]
 */
```

### @since

```gr
/**
 * @since version
 */
```

The `@since` attribute provides the version in which the documented code was added.

This attribute requires a [Semantic Version](https://semver.org/), optionally prefixed with `v`. For example,`v0.2.0` and `0.2.0` are treated the same.

When generating docs, a `<details>` element titled "Added in X.X.X" will be added above the type signature. When this attribute is specified, you'll be required to specify the `--current-version=X.X.X` flag to the `grain doc` command. This allows you to specify unreleased versions in your source code, and the generated docs will show "Added in next", instead of the version.

### @history

```gr
/**
 * @history version: description
 */
```

The `@history` attribute provides details on significant changes to the documented code.

This attribute requires a [Semantic Version](https://semver.org/) before the colon (`:`) and a description of the change after the colon.

When generating docs, adds a history table to the `<details>` element created by the `@since` attribute if both were used; otherwise, a new `<details>` element titled "History" will be added above the type signature. When using this attribute, you'll be required to specify the `--current-version=X.X.X` flag to the `grain doc` command. This allows you to specify unreleased versions in your source code, and the generated docs will show "next" instead of the version.

### @deprecated

```gr
/***
 * @deprecated description
 */
```

The `@deprecated` attribute provides a description or reason for the deprecation of the documented code.

This attribute requires a description of the deprecation and will mark the export as deprecated when used.

When generating docs, adds a blockquote containing `**Deprecated:**` and the description immediately below the title.

## Module Blocks

```gr
/**
 * description
 */
module Math
```

The module doc block provides top-level information about a file, including a description.

This special attribute is used within a docblock comment that is attached to a module header. The module block is allowed on both top-level and sub modules.

The `module` docblock comment can also contain `@example`, `@since`, and `@history` attributes that will add their corresponding output to the top of the documentation.

When generating docs, adds the description at the top of the documentation, and a [Front Matter](https://jekyllrb.com/docs/front-matter/) section containing the title.

## Re-providing
When you re-provide a value in grain such as:
```grain
module Library

from "list" include List

use List.{ length }

provide {
  length
}
```
Graindoc will automatically pull the doc block from the `list` library and use that for its documentation.

## Documenting types

When providing types we allow for documentation as well:
```grain
module Library

/**
 * Data structure representing JSON in Grain.
 **/
provide enum Json {
  /**
   * Grain representation of a null JSON value.
   **/
  JsonNull,
  /**
   * Grain representation of a boolean JSON value.
   *
   * @example 
   **/
  JsonBoolean(Bool),
}
```

When documenting types, graindoc supports documenting both `enum` variants and `record` fields, with a description.
