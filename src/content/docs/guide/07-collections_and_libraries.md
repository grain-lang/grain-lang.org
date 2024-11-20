---
title: Collections and Libraries
slug: guide/collections_and_libraries
---

## Lists

Arguably the most important data structure in Grain, lists are the recommended way of working with ordered collections of data.

### Creating Lists

Lists always contain elements of the same type, and attempting to mix element types will result in a compilation error.

```grain
module Main

let empty = []
let numbers = [1, 2, 3]
let strings = ["foo", "bar", "baz"]
```

Lists in Grain are immutable linked lists. In order to add a new item to a list, we typically add it to the front, creating a new list in the process:

```grain
module Main

let twoThree = [2, 3]
let oneTwoThree = [1, ...twoThree]

print(oneTwoThree) // [1, 2, 3]
print(twoThree) // [2, 3]
```

We can also write functions that process data in lists, but we'll save that for the section on Pattern Matching.

### The List Standard Library

The Grain standard library provides a variety of functions that work with lists to handle common use cases.

We can make use of the `List` library like so:

```grain
module Main

// Include the `list` module to be accessible in this file
from "list" include List

// Accessing some functions from the module
List.length([4, 5, 6]) // 3
List.map(n => n + 3, [1, 2, 3]) // [4, 5, 6]
List.sort([2, 5, 1, 4, 3]) // [1, 2, 3, 4, 5]
```

To learn more about what's available in the List standard library, check out the [list standard library documentation](https://grain-lang.org/docs/stdlib/list).

## Arrays

An alternative to lists, arrays are fixed-length containers for ordered data. Individual elements can be swapped out for other elements, and individual elements can be retrieved quickly.

### Creating and Using Arrays

Like lists, arrays always contain elements of the same type, and attempting to mix element types will result in a compilation error.

```grain
module Main

let empty = [>]
let numbers = [> 1, 2, 3]
let strings = [> "foo", "bar", "baz"]
```

Unlike lists, we can easily access elements at any (zero-based) index:

```grain
module Main

let strings = [> "foo", "bar", "baz"]

print(strings[0]) // "foo"
print(strings[1]) // "bar"
print(strings[2]) // "baz"
```

We can also use negative indexes to access elements from the end of the array:

```grain
module Main

let strings = [> "foo", "bar", "baz"]

print(strings[-1]) // "baz"
print(strings[-2]) // "bar"
print(strings[-3]) // "foo"
```

If we try to access an element beyond the length of the array, we'll get an `IndexOutOfBounds` error.

### Updating Arrays

One of the major benefits of an array is the ability to change the values it contains. We can update an array's values like so:

```grain
module Main

let strings = [> "foo", "bar", "baz"]

print(strings) // [> "foo", "bar", "baz"]

strings[1] = "qux"

print(strings) // [> "foo", "qux", "baz"]
```

In some cases, this could allow us to write programs that are more efficient than if we used a list.

However, the size of an array is fixed. To add additonal items to an array, we must append them together, which would create a brand new, third array:

```grain
import Array from "array"

let one = [> 1]
let twoThree = [> 2, 3]
let oneTwoThree = Array.append(one, twoThree)

print(oneTwoThree) // [> 1, 2, 3]
```

Since `oneTwoThree` is a brand new array, updating values in `one` or `twoThree` doesn't affect the values in `oneTwoThree`.

For long arrays, even when adding just one element, this could be a fairly expensive operation. For programs that need to do this kind of operation, lists may be a better choice. We discuss this in more detail in the section below.

To learn more about what's available in the Array standard library, check out the [array standard library documentation](https://grain-lang.org/docs/stdlib/array).

### Lists vs. Arrays

Lists and arrays are similar constructs, but each has its own pros and cons.

Lists are excellent because they're

- Immutable
- Efficient at adding or removing elements to the front
- Easy to work with and well-supported by the pattern matching system
- Less susceptible to mutation-related bugs

Arrays are excellent because they're

- Able to be modified after creation
- Efficient at accessing random elements
- Efficient at determining the number of elements

It's up to you to choose which is right for your use case! However, as a rule of thumb lists are the idiomatic choice in Grain. Lean towards using lists whenever possible and use arrays when it makes your code easier to understand or if maximizing performance is important to you.

## Other Collection Types

Beyond arrays and lists, there are many other mutable and immutable collection types built into the Grain standard library. Be sure to check them out in the docs!
