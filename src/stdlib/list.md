---
title: List
---

Utilities for working with lists.

```grain
import List from 'lists'
```

## Values

### List.**length**

```grain
length : List<a> -> Number
```

Computes the length of the input list.

### List.**reverse**

```grain
reverse : List<a> -> List<a>
```

Reverses the input list.

### List.**append**

```grain
append : (List<a>, List<a>) -> List<a>
```

`List.append(list1, list2)` creates a new list with the elements of `list1` followed by the elements of `list2`.

### List.**contains**

```grain
contains : (List<a>, a) -> Bool
```

Checks if the item is an element of the input list. Uses the generic `==` equality operator.

### List.**foldLeft**

```grain
foldLeft : ((b, a) -> b, b, List<a>) -> b
```

Using a reducer function, `foldLeft` combines all elements of a list, starting from the "head", or left side, of the list.

In `List.foldLeft(f, base, list)`, `f` is called with the accumulator and each element of the list, and returns a new accumulator. The final value is the result of `foldLeft`.
The accumulator starts with value `base`.

```grain
let add = a + b
let sum = (list) => foldLeft(add, 0, list)
sum([1, 2, 3]) # 6
```

### List.**foldRight**

```grain
foldRight : ((a, b) -> b, b, List<a>) -> b
```

Using a reducer function, `foldRight` combines all elements of a list, starting from the end, or right side, of the list.

In `List.foldRight(f, base, list)`, `f` is called with the each element of the list and the accumulator, and returns a new accumulator. The final value is the result of `foldRight`.
The accumulator starts with value `base`.

```grain
let add = a + b
let sum = (list) => foldRight(add, 0, list)
sum([1, 2, 3]) # 6
```

### List.**map**

```grain
map : (a -> b, List<a>) -> List<b>
```

`List.map(f, list)` produces a new list by calling `f` on each element of the list.

### List.**mapi**

```grain
mapi : ((a, Number) -> b, List<a>) -> List<b>
```

`List.mapi(fn, list)` produces a new list by calling `fn` on each element of the input list, along with the index of the element.

### List.**every**

```grain
every : (a -> Bool, List<a>) -> Bool
```

Checks that the given condition is satisfied for all items in the input list.

### List.**forEach**

```grain
forEach : (a -> Void, List<a>) -> Void
```

Evaluates the given function for each item in the list.

### List.**forEachi**

```grain
forEachi : ((a, Number) -> Void, List<a>) -> Void
```

Evaluates the given function for each item in the list. The given function is called with the element and its index in the list.
