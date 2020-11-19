---
title: Array
---

Utilities for working with arrays.

```grain
import Array from 'array'
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

`make(n, value)` creates a new array of length `n` filled with `value`.

```grain
Array.make(5, 'foo') // [> 'foo', 'foo', 'foo', 'foo', 'foo']
```

### Array.**init**

```grain
init : (Number, Number -> a) -> Array<a>
```

Similar to `make`, but each array value is initialized with the result of subsequent calls to the given initializer function. The initializer is called with the index of each array slot.

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
find : (a -> Bool, Array<a>) -> a
```

`Array.find(fn, array)` calls `fn` on each element of the array and returns the first element for which `fn` returns `true`.

### Array.**findIndex**

```grain
findIndex : (a -> Bool, Array<a>) -> Number 
```

`Array.findIndex(fn, array)` calls `fn` on each element of the array and returns the index of the first element for which `fn` returns `true`.
