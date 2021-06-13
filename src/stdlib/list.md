---
title: List
---

Utilities for working with lists.

```grain
import List from "list"
```

## Values

### List.**init**

```grain
init : (Number, Number -> a) -> List<a>
```

`List.init(n, fn)` creates a new list of length `n` where each value is initialized with the result of the initializer `fn`. The initializer is called with the index of each list element.

```grain
List.init(5, n => n + 3) // [8, 9, 10, 11, 12]
```

### List.**length**

```grain
length : List<a> -> Number
```

Computes the length of the input list.

### List.**sum**

```grain
sum : List<Number> -> Number
```

Adds all numbers in the input list.

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
contains : (a, List<a>) -> Bool
```

Checks if the item is an element of the input list. Uses the generic `==` equality operator.

### List.**reduce**

```grain
reduce : ((b, a) -> b, b, List<a>) -> b
```

Using a reducer function, `reduce` combines all elements of a list, starting from the "head", or left side, of the list.

In `List.reduce(fn, base, list)`, `fn` is called with the accumulator and each element of the list, and returns a new accumulator. The final value is the result of `reduce`.
The accumulator starts with value `base`.

```grain
let add = a + b
let sum = (list) => List.reduce(add, 0, list)
sum([1, 2, 3]) // 6
```

### List.**reduceRight**

```grain
reduceRight : ((a, b) -> b, b, List<a>) -> b
```

Using a reducer function, `reduceRight` combines all elements of a list, starting from the end, or right side, of the list.

In `List.reduceRight(fn, base, list)`, `fn` is called with the each element of the list and the accumulator, and returns a new accumulator. The final value is the result of `reduceRight`.
The accumulator starts with value `base`.

```grain
let add = a + b
let sum = (list) => List.reduceRight(add, 0, list)
sum([1, 2, 3]) // 6
```

### List.**map**

```grain
map : (a -> b, List<a>) -> List<b>
```

`List.map(fn, list)` produces a new list by calling `fn` on each element of the list.

### List.**mapi**

```grain
mapi : ((a, Number) -> b, List<a>) -> List<b>
```

`List.mapi(fn, list)` produces a new list by calling `fn` on each element of the input list, along with the index of the element.

### List.**flatMap**

```grain
flatMap : ((a) -> List<b>, List<a>) -> List<b>
```

`List.flatMap(fn, list)` produces a new list by calling `fn` on each element of the input list. Each iteration produces an intermediate list, which are all appended to produce a "flattened" list of all values.

### List.**every**

```grain
every : (a -> Bool, List<a>) -> Bool
```

Checks that the given condition is satisfied for all items in the input list.

### List.**some**

```grain
some : (a -> Bool, List<a>) -> Bool
```

Checks that the given condition is satisfied **at least** once by an item in the input list.

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

### List.**filter**

```grain
filter : (a -> Bool, List<a>) -> List<a>
```

`List.filter(fn, list)` produces a new list by calling `fn` on each element of the list. If the `fn` returns `false`, the value will not be included the new list.

### List.**reject**

```grain
reject : (a -> Bool, List<a>) -> List<a>
```

`List.reject(fn, list)` produces a new list by calling `fn` on each element of the list. If the `fn` returns `true`, the value will not be included in the new list.

### List.**head**

```grain
head : List<a> -> Option<a>
```

Returns `Some(element)` containing the first element from the list or `None` if the list is empty.

### List.**tail**

```grain
tail : List<a> -> Option<List<a>>
```

Returns `Some(elements)` containing the all elements in a list except the first elementt, `Some([])` if the list only contains one element, or `None` if the list is empty.

### List.**nth**

```grain
nth : (Number, List<a>) -> Option<a>
```

Returns `Some(element)` containing the element in the list at the index provided or `None` if the index is out-of-bounds or if the list is empty.

### List.**flatten**

```grain
flatten : List<List<a>> -> List<a>
```

Turns a list of lists of values into a "flattened" list of the values.

### List.**insert**

```grain
insert : (a, Number, List<a>) -> List<a>
```

Attempts to insert a value into the input list at the given index. Fails if the index is out-of-bounds.

### List.**count**

```grain
count : (a -> Bool, List<a>) -> Number
```

Counts the number of elements in a list that satisfy the given condition.

### List.**part**

```grain
part : (Number, List<a>) -> (List<a>, List<a>)
```

Splits a list into two lists: a list containing the first `count` elements, and a list containing the remaining elements. Fails if the count is out-of-bounds.

### List.**rotate**

```grain
rotate : (Number, List<a>) -> List<a>
```

Produces a new list where the `count` elements are moved to the end of the list. If a negative count is provided, moves the last `-count` elements to the beginning of the list.

### List.**unique**

```grain
unique : List<a> -> List<a>
```

Produces a new list with any duplicates removed. Uses the generic `==` structural equality operator.

### List.**drop**

```grain
drop : (Number, List<a>) -> List<a>
```

Removes the first `n` items from the list. Fails if `n` is a negative number.

### List.**dropWhile**

```grain
dropWhile : (a -> Bool, List<a>) -> List<a>
```

Removes items from the beginning of the list until the given function returns `false`.

### List.**take**

```grain
take : (Number, List<a>) -> List<a>
```

Returns the first `n` items from the list. Fails if `n` is a negative number.

### List.**takeWhile**

```grain
takeWhile : (a -> Bool, List<a>) -> List<a>
```

Returns a list containing the first elements satisfying the given predicate. Stops when the function returns `false`.

### List.**find**

```grain
find : (a -> Bool, List<a>) -> Option<a>
```

`List.find(fn, list)` calls `fn` on each element of the list and returns `Some(element)` containing the first element for which `fn` returns `true` or `None` if no element was found.

### List.**findIndex**

```grain
findIndex : (a -> Bool, List<a>) -> Option<Number>
```

`List.findIndex(fn, list)` calls `fn` on each element of the list and returns `Some(index)` containing the index of the first element for which `fn` returns `true` or `None` if no element was found.

### List.**product**

```grain
product : (List<a>, List<b>) -> List<(a, b)>
```

Combines two lists into a Cartesian product of tuples containing all ordered pairs `(a, b)`.

### List.**sub**

```grain
sub : (Number, Number, List<a>) -> List<a>
```

Returns a sub-list of the given list starting from index `start` (inclusive) and up to `length` elements. Fails if `start` or `length` are negative numbers.

### List.**join**

```grain
join : (String, List<String>) -> String
```

Concatenates the strings in the given list, separating them with the given separator.

Example:
```grain
List.join(", ", ["a", "b", "c"]) == "a, b, c"
```
