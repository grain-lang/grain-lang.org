---
title: Array
---

Utilities for working with arrays.

```grain
import Array from 'arrays'
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
Array.make(5, 'foo') # [> 'foo', 'foo', 'foo', 'foo', 'foo']
```

### Array.**init**

```grain
init : (Number, Number -> a) -> Array<a>
```

Similar to `make`, but each array value is initialized with the result of subsequent calls to the given initializer function. The initializer is called with the index of each array slot.

```grain
Array.init(5, n => n + 3) # [> 8, 9, 10, 11, 12]
```

### Array.**get**

```grain
get : (Array<a>, Number) -> a
```

An alias for normal syntactic array access, i.e. `array[n]`.

`Array.get(array, n)` retrieves the `n`th item from the array. A negative `n` is treated as an offset from the end of the array.

### Array.**set**

```grain
set : (Array<a>, Number, a) -> a
```

An alias for normal syntactic array set, i.e. `array[n] := value`.

`Array.set(array, n, value)` sets the `n`th slot in the array to `value`. A negative `n` is treated as an offset from the end of the array. Returns the newly set item.

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
forEach : (Array<a>, a -> Void) -> Void
```

`Array.forEach(array, fn)` calls `fn` on each element of the array.

### Array.**forEachi**

```grain
forEachi : (Array<a>, (a, Number) -> Void) -> Void
```

`Array.forEachi(array, fn)` calls `fn` on each element of the array, along with the index of the element.

### Array.**map**

```grain
map : (Array<a>, a -> b) -> Array<b>
```

`Array.map(array, fn)` produces a new array by calling `fn` on each element of the input array.

### Array.**mapi**

```grain
mapi : ((a, Number) -> b, Array<a>) -> Array<b>
```

`Array.mapi(fn, array)` produces a new array by calling `fn` on each element of the input array, along with the index of the element.

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
