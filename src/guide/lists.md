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

## More On Spreads (`...`)

Although spreads are recommended to only be put at the end of a list, for convenience it is also possible to use the spread syntax at any position in a list:

```grain
let oneTwo = [1, 2]
let threeFour = [3, 4]
let result = [...oneTwo, ...threeFour, 5]

print(result) // [1, 2, 3, 4, 5]
```

However, it is important to be aware of the **performance implications of arbitrary-position spreads**. Grain lists are immutable linked lists, and therefore prepending new elements to the beginning of one is a very efficient operation—the new element simply points to the list being extended! On the other hand, we do not get this same benefit if a spread appears somewhere other than at the end of a list expression. In this case, a brand new list must be created, copying one element at a time, pointing each one at the next, to point to the new elements at the end.

Use arbitrary-position spreads sparingly, only when they make your code more expressive and where performance isn't a major concern.

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
