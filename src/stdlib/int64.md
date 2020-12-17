---
title: Int64
---

Operations on the Int64 type.

```grain
import Int64 from "int64"
```

## Values

### Int64.**fromNumber**

```grain
fromNumber : Number -> Int64
```

Coverts the argument from a `Number` to an `Int64`.

### Int64.**toNumber**

```grain
toNumber : Int64 -> Number
```

Converts the argument from an `Int64` to a `Number`.

### Int64.**incr**

```grain
incr : Int64 -> Int64
```

Increments the number by 1.

### Int64.**decr**

```grain
decr : Int64 -> Int64
```

Decrements the number by 1.

### Int64.**add**

```grain
add : (Int64, Int64) -> Int64
```

Integer addition.

### Int64.**sub**

```grain
sub : (Int64, Int64) -> Int64
```

Integer subtraction.

### Int64.**mul**

```grain
mul : (Int64, Int64) -> Int64
```

Integer multiplication.

### Int64.**div**

```grain
div : (Int64, Int64) -> Int64
```

Integer division.

### Int64.**divU**

```grain
divU : (Int64, Int64) -> Int64
```

Unsigned integer division.

### Int64.**rem**

```grain
rem : (Int64, Int64) -> Int64
```

Integer remainder.

### Int64.**remU**

```grain
remU : (Int64, Int64) -> Int64
```

Unsigned integer remainder.

### Int64.**mod**

```grain
mod : (Int64, Int64) -> Int64
```

Integer modulo.

### Int64.**gt**

```grain
gt : (Int64, Int64) -> Bool
```

Checks if the first argument is strictly greater than the second argument.

### Int64.**gte**

```grain
gte : (Int64, Int64) -> Bool
```

Checks if the first argument is greater than or equal to the second argument.

### Int64.**lt**

```grain
lt : (Int64, Int64) -> Bool
```

Checks if the first argument is strictly less than the second argument.

### Int64.**lte**

```grain
lte : (Int64, Int64) -> Bool
```

Checks if the first argument is less than or equal to the second argument.


### Int64.**lnot**

```grain
lnot : Int64 -> Int64
```

Computes the bitwise logical "not" of the argument.

### Int64.**land**

```grain
land : (Int64, Int64) -> Int64
```

Computes the bitwise logical "and" of the two arguments.

### Int64.**lor**

```grain
lor : (Int64, Int64) -> Int64
```

Computes the bitwise logical "or" of the two arguments.

### Int64.**lxor**

```grain
lxor : (Int64, Int64) -> Int64
```

Computes the bitwise logical "xor" of the two arguments.

### Int64.**shl**

```grain
shl : (Int64, Int64) -> Int64
```

Computes the bitwise logical shift left of the first argument by the second argument.

### Int64.**shr**

```grain
shr : (Int64, Int64) -> Int64
```

Computes the bitwise arithmetic (signed) shift right of the first argument by the second argument.

### Int64.**shrU**

```grain
shrU : (Int64, Int64) -> Int64
```

Computes the unsigned bitwise logical shift right of the first argument by the second argument.
