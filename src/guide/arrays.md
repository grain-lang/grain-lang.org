---
title: Arrays
---

An alternative to lists, arrays are fixed-length containers for ordered data. Individual elements can be swapped out for other elements, and individual elements can be retrieved quickly.

## Creating and Using Arrays

Like lists, arrays always contain elements of the same type, and attempting to mix element types will result in a compilation error.

```grain
let empty = [>]
let numbers = [> 1, 2, 3]
let strings = [> "foo", "bar", "baz"]
```

Unlike lists, we can easily access elements at any (zero-based) index:

```grain
let strings = [> "foo", "bar", "baz"]

print(strings[0]) // "foo"
print(strings[1]) // "bar"
print(strings[2]) // "baz"
```

We can also use negative indexes to access elements from the end of the array:

```grain
let strings = [> "foo", "bar", "baz"]

print(strings[-1]) // "baz"
print(strings[-2]) // "bar"
print(strings[-3]) // "foo"
```

If we try to access an element beyond the length of the array, we'll get an `IndexOutOfBounds` error.

## Updaing Arrays

One of the major benefits arrays have is the ability to change the values it contains. We can update an array's values like so:

```grain
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

## Lists vs. Arrays

Lists and arrays are similar constructs, but each has its own pros and cons. It's up to you to choose which is right for your use case!

Lists are excellent because they're

- immutable
- efficient at adding additional elements
- efficient at removing elements
- easy to work with
- less succeptible to bugs

Lists might not be the right choice because they're

- unable to be modified
- inefficient at accessing random elements
- inefficient at determining the number of elements

Arrays are excellent because they're

- able to be modified after creation
- efficient at accessing random elements
- efficient at determining the number of elements

Arrays might not be the right choice because they're

- inefficient at adding additonal elements
- inefficient at removing elements
- more succeptible to bugs

As a rule of thumb, lists are the idiomatic choice in Grain! Lean towards using lists whenever possible and use arrays when it makes your code easier to understand.
