---
title: Map
---

A Map holds key-value pairs. Any value may be used as a key or value. Operations on a `Map` mutate the internal state, so it never needs to be re-assigned.

```grain
import Map from 'map'
```

## Values

### Map.**make**

```grain
make : () -> Map<k, v>
```

Creates a new, empty map.

### Map.**makeSized**

```grain
makeSized : Number -> Map<k, v>
```

Creates a new, empty map with an initial storage size for the given number of elements.

### Map.**get**

```grain
get : (k, Map<k, v>) -> v
```

Retrieves the value associated with the given key from the map. Fails if the key does not exist.

### Map.**set**

```grain
set : (k, v, Map<k, v>) -> Void
```

Adds a new key-value pair to the map. If the key already exists, replaces the value.

### Map.**contains**

```grain
contains : (k, Map<k, v>) -> Bool
```

Returns `true` if the map contains the given key.

### Map.**remove**

```grain
remove : (k, Map<k, v>) -> Void
```

Removes the key-value pair associated with the given key from the map.

### Map.**size**

```grain
size : Map<k, v> -> Number
```

Returns the number of keys bound to a value within the map.

### Map.**isEmpty**

```grain
isEmpty : Map<k, v> -> Number
```

Returns `true` if the map contains no key-value pairs.

### Map.**clear**

```grain
clear : Map<k, v> -> Void
```

Removes all key-value pairs from the map.

### Map.**forEach**

```grain
forEach : ((k, v) -> Void, Map<k, v>) -> Void
```

Iterates the given function over each key-value pair in the map.

### Map.**reduce**

```grain
reduce : ((a, k, v) -> a, a, Map<k, v>) -> a
```

Reduces all key-value pairs within a map to a single value. The reducer function is called with the accumulator, the current key, and the current value.

### Map.**keys**

```grain
keys : Map<k, v> -> List<k>
```

Returns a list of all keys bound to a value in the map.

### Map.**values**

```grain
values : Map<k, v> -> List<v>
```

Returns a list of all values bound to a key in the map.

### Map.**toList**

```grain
toList : Map<k, v> -> List<(k, v)>
```

Returns a list of all key-value pairs in the map.

### Map.**fromList**

```grain
fromList : List<(k, v)> -> Map<k, v>
```

Creates a map from a list of key-value pairs.

### Map.**toArray**

```grain
toArray : Map<k, v> -> Array<(k, v)>
```

Returns a array of all key-value pairs in the map.

### Map.**fromArray**

```grain
fromArray : Array<(k, v)> -> Map<k, v>
```

Creates a map from an array of key-value pairs.

### Map.**filter**

```grain
filter : ((k, v) -> Bool, Map<k, v>) -> Void
```

Keeps all key-value pairs that the predicate returned `true` for from the map.

### Map.**reject**

```grain
reject : ((k, v) -> Bool, Map<k, v>) -> Void
```

Removes all key-value pairs that the predicate returned `true` for from the map.
