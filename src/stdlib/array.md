---
title: Array
---

Utilities for working with arrays.

```grain
import Array from "array"
```

## Values

### Array.**length**

```grain
length : Array<a> -> Number
```

Returns the length of the input array.

### Array.**make**

```grain
make : (Number, a) -> Array<a>
```

`Array.make(n, value)` creates a new array of length `n` filled with `value`.

```grain
Array.make(5, "foo") // [> "foo", "foo", "foo", "foo", "foo"]
```

### Array.**init**

```grain
init : (Number, Number -> a) -> Array<a>
```

`Array.init(n, fn)` creates a new array of length `n` where each value is initialized with the result of the initializer `fn`. The initializer is called with the index of each array element.

```grain
Array.init(5, n => n + 3) // [> 8, 9, 10, 11, 12]
```

### Array.**get**

```grain
get : (Number, Array<a>) -> a
```

An alias for normal syntactic array access, i.e. `array[n]`.

`Array.get(n, array)` retrieves the `n`th item from the array. A negative `n` is treated as an offset from the end of the array.

### Array.**set**

```grain
set : (Number, a, Array<a>) -> a
```

An alias for normal syntactic array set, i.e. `array[n] := value`.

`Array.set(n, value, array)` sets the `n`th slot in the array to `value`. A negative `n` is treated as an offset from the end of the array. Returns the newly set item.

### Array.**append**

```grain
append : (Array<a>, Array<a>) -> Array<a>
```

`Array.append(array1, array2)` creates a new array with the items of `array1` followed by the items of `array2`. This does not modify `array1` or `array2`.

### Array.**concat**

```grain
concat : List<Array<a>> -> Array<a>
```

Takes a list of arrays and creates a single array containing the elements of all of the arrays. Does not modify any of the input arrays.

### Array.**copy**

```grain
copy : Array<a> -> Array<a>
```

Produces a copy of the input array.

### Array.**forEach**

```grain
forEach : (a -> Void, Array<a>) -> Void
```

`Array.forEach(fn, array)` calls `fn` on each element of the array.

### Array.**forEachi**

```grain
forEachi : ((a, Number) -> Void, Array<a>) -> Void
```

`Array.forEachi(fn, array)` calls `fn` on each element of the array, along with the index of the element.

### Array.**map**

```grain
map : (a -> b, Array<a>) -> Array<b>
```

`Array.map(fn, array)` produces a new array by calling `fn` on each element of the input array.

### Array.**mapi**

```grain
mapi : ((a, Number) -> b, Array<a>) -> Array<b>
```

`Array.mapi(fn, array)` produces a new array by calling `fn` on each element of the input array along with its index.

### Array.**reduce**

```grain
reduce : ((b, a) -> b, b, Array<a>) -> b
```

Using a reducer function, `reduce` combines all elements of an array, starting from the "head", or left side, of the array.

In `Array.reduce(fn, base, array)`, `fn` is called with the accumulator and each element of the array, and returns a new accumulator. The final value is the result of `reduce`.
The accumulator starts with value `base`.

```grain
let add = a + b
let sum = (array) => Array.reduce(add, 0, array)
sum([1, 2, 3]) // 6
```

### Array.**reducei**

```grain
reducei : ((b, a, Number) -> b, b, Array<a>) -> b
```

Using a reducer function, `reducei` combines all elements of an array, starting from the "head", or left side, of the array.

In `Array.reducei(fn, base, array)`, `fn` is called with the accumulator, each element of the array, and the index of that element. It returns a new accumulator. The final value is the result of `reducei`.
The accumulator starts with value `base`.

### Array.**flatMap**

```grain
flatMap : ((a) -> Array<b>, Array<a>) -> Array<b>
```

`Array.flatMap(fn, array)` produces a new array by calling `fn` on each element of the input array. Each iteration produces an intermediate array, which are all appended to produce a "flattened" array of all results.

### Array.**every**

```grain
every : (a -> Bool, Array<a>) -> Bool
```

Checks that the given condition is satisfied for all items in the input array.

### Array.**some**

```grain
some : (a -> Bool, Array<a>) -> Bool
```

Checks that the given condition is satisfied **at least** once by an item in the input array.

### Array.**fill**

```grain
fill : (a, Array<a>) -> Void
```

Replaces all elements in an array with the new value provided.

### Array.**fillRange**

```grain
fillRange : (a, Number, Number, Array<a>) -> Void
```

`Array.fillRange(value, start, stop, array)` replaces all elements between `start` and `stop` in the array with the new value provided. Fails if the index is out-of-bounds.

### Array.**toList**

```grain
toList : Array<a> -> List<a>
```

Converts the input array to a list.

### Array.**fromList**

```grain
fromList : List<a> -> Array<a>
```

Converts the input list to an array.

### Array.**contains**

```grain
contains : (a, Array<a>) -> Bool
```

Checks if the item is an element of the input array. Uses the generic `==` structural equality operator.

### Array.**find**

```grain
find : (a -> Bool, Array<a>) -> Option<a>
```

`Array.find(fn, array)` calls `fn` on each element of the array and returns `Some(element)` containing the first element for which `fn` returns `true` or `None` if no element was found.

### Array.**findIndex**

```grain
findIndex : (a -> Bool, Array<a>) -> Option<Number>
```

`Array.findIndex(fn, array)` calls `fn` on each element of the array and returns `Some(index)` containing the index of the first element for which `fn` returns `true` or `None` if no element was found.

### Array.**product**

```grain
product : (Array<a>, Array<b>) -> Array<(a, b)>
```

Combines two arrays into a Cartesian product of tuples containing all ordered pairs `(a, b)`.

### Array.**count**

```grain
count : (a -> Bool, Array<a>) -> Number
```

Counts the number of elements in a array that satisfy the given condition.

### Array.**counti**

```grain
counti : ((a, Number) -> Bool, Array<a>) -> Number
```

Counts the number of elements in a array that satisfy the given condition. The condition function received the element and its index.

### Array.**filter**

```grain
filter : (a -> Bool, Array<a>) -> Array<a>
```

`Array.filter(fn, array)` produces a new array by calling `fn` on each element of the array. If the `fn` returns `false`, the value will not be included the new array.

### Array.**filteri**

```grain
filteri : ((a, Number) -> Bool, Array<a>) -> Array<a>
```

`Array.filter(fn, array)` produces a new array by calling `fn` on each element of the array and its index. If the `fn` returns `false`, the value will not be included the new array.

### Array.**unique**

```grain
unique : Array<a> -> Array<a>
```

Produces a new array with any duplicates removed. Uses the generic `==` structural equality operator.

### Array.**join**

```grain
join : (String, Array<String>) -> String
```

Concatenates the strings in the given array, separating them with the given separator.

Example:

```grain
Array.join(", ", [> "a", "b", "c"]) == "a, b, c"
```

### Array.**zip**

```grain
zip : (Array<a>, Array<b>) -> Array<(a, b)>
```

Produces a new array filled with tuples of elements from both given arrays. The first tuple will contain the first item of each array, the second tuple will contain the second item of each array, and so on.

Calling this function with arrays of different sizes will throw an error.
