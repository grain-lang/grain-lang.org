---
title: Set
---

A Set is an unordered collection of unique values. Operations on a `Set` mutate the internal state, so it never needs to be re-assigned.

```grain
import Set from "set"
```

## Values

### Set.**make**

```grain
make : () -> Set<t>
```

Creates a new, empty set.

### Set.**makeSized**

```grain
makeSized : Number -> Set<t>
```

Creates a new, empty set with an initial storage size for the given number of elements.

### Set.**add**

```grain
add : (t, Set<t>) -> Void
```

Adds a new value to the set. If the value already exists, nothing happens.

### Set.**contains**

```grain
contains : (t, Set<t>) -> Bool
```

Returns `true` if the set contains the given value.

### Set.**remove**

```grain
remove : (t, Set<t>) -> Void
```

Removes the given value from the set.

### Set.**size**

```grain
size : Set<t> -> Number
```

Returns the number of values within the set.

### Set.**isEmpty**

```grain
isEmpty : Set<t> -> Number
```

Returns `true` if the set contains no values.

### Set.**clear**

```grain
clear : Set<t> -> Void
```

Removes all values from the set.

### Set.**forEach**

```grain
forEach : ((t) -> Void, Set<t>) -> Void
```

Iterates the given function over each value in the set.

### Set.**reduce**

```grain
reduce : ((a, t) -> a, a, Set<t>) -> a
```

Reduces all values within a set to a single value. The reducer function is called with the accumulator and the current value.

### Set.**toList**

```grain
toList : Set<t> -> List<t>
```

Returns a list from the values of a set.

### Set.**fromList**

```grain
fromList : List<t> -> Set<t>
```

Creates a set from a list.

### Set.**toArray**

```grain
toArray : Set<t> -> Array<t>
```

Returns an array from the values of a set.

### Set.**fromArray**

```grain
fromArray : Array<t> -> Set<t>
```

Creates a set from an array.

### Set.**filter**

```grain
filter : ((t) -> Bool, Set<t>) -> Void
```

Keeps all values that the predicate returned `true` for from the set.

### Set.**reject**

```grain
reject : ((t) -> Bool, Set<t>) -> Void
```

Removes all values that the predicate returned `true` for from the set.

### Set.**union**

```grain
union : (Set<t>, Set<t>) -> Set<t>
```

Creates a set from the union of the given sets.

### Set.**intersect**

```grain
intersect : (Set<t>, Set<t>) -> Set<t>
```

Creates a set from the intersection of the given sets.

### Set.**diff**

```grain
diff : (Set<t>, Set<t>) -> Set<t>
```

Creates a set from the difference of the given sets.
