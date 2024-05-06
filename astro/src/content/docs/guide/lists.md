---
title: Lists and Libraries
---

Arguably the most important data structure in Grain, lists allow us work with ordered collections of data.

## Creating Lists

Lists always contain elements of the same type, and attempting to mix element types will result in a compilation error.

```grain
let empty = []
let numbers = [1, 2, 3]
let strings = ["foo", "bar", "baz"]
```

Lists in Grain are linked lists, so if we'd like to add a new item to a list, we add it to the front:

```grain
let twoThree = [2, 3]
let oneTwoThree = [1, ...twoThree]

print(oneTwoThree) // [1, 2, 3]
```

We can also write functions that process data in lists, but we'll save that fun for the section on Pattern Matching.

## The List Standard Library

Lists wouldn't be all that interesting if we couldn't do anything with them, right? Conveniently, the Grain standard library provides a set of functions that work with lists.

We can import and use the List library like so:

```grain
import List from "list"

List.length([4, 5, 6])

List.map((n) => n + 3, [1, 2, 3]) // [4, 5, 6]
```

The first line imports the whole list module, and we can access all values contained in the module. If desired, we could instead import only the values we intend to use:

```grain
import { length, map } from "list"

length([4, 5, 6])

map((n) => n + 3, [1, 2, 3]) // [4, 5, 6]
```

To learn more about what's available in the List standard library, check out the [lists standard library documentation](https://grain-lang.org/docs/stdlib/list).
