---
title: Int32
---

Operations on the Int32 type.

```grain
import Int32 from "int32"
```

## Values

### Int32.**fromNumber**

```grain
fromNumber : Number -> Int32
```

Coverts the argument from a `Number` to an `Int32`.

### Int32.**toNumber**

```grain
toNumber : Int32 -> Number
```

Converts the argument from an `Int32` to a `Number`.

### Int32.**incr**

```grain
incr : Int32 -> Int32
```

Increments the number by 1.

### Int32.**decr**

```grain
decr : Int32 -> Int32
```

Decrements the number by 1.

### Int32.**add**

```grain
add : (Int32, Int32) -> Int32
```

Integer addition.

### Int32.**sub**

```grain
sub : (Int32, Int32) -> Int32
```

Integer subtraction.

### Int32.**mul**

```grain
mul : (Int32, Int32) -> Int32
```

Integer multiplication.

### Int32.**div**

```grain
div : (Int32, Int32) -> Int32
```

Integer division.

### Int32.**divU**

```grain
divU : (Int32, Int32) -> Int32
```

Unsigned integer division.

### Int32.**rem**

```grain
rem : (Int32, Int32) -> Int32
```

Integer remainder.

### Int32.**remU**

```grain
remU : (Int32, Int32) -> Int32
```

Unsigned integer remainder.

### Int32.**mod**

```grain
mod : (Int32, Int32) -> Int32
```

Integer modulo.

### Int32.**gt**

```grain
gt : (Int32, Int32) -> Bool
```

Checks if the first argument is strictly greater than the second argument.

### Int32.**gte**

```grain
gte : (Int32, Int32) -> Bool
```

Checks if the first argument is greater than or equal to the second argument.

### Int32.**lt**

```grain
lt : (Int32, Int32) -> Bool
```

Checks if the first argument is strictly less than the second argument.

### Int32.**lte**

```grain
lte : (Int32, Int32) -> Bool
```

Checks if the first argument is less than or equal to the second argument.


### Int32.**lnot**

```grain
lnot : Int32 -> Int32
```

Computes the bitwise logical "not" of the argument.

### Int32.**land**

```grain
land : (Int32, Int32) -> Int32
```

Computes the bitwise logical "and" of the two arguments.

### Int32.**lor**

```grain
lor : (Int32, Int32) -> Int32
```

Computes the bitwise logical "or" of the two arguments.

### Int32.**lxor**

```grain
lxor : (Int32, Int32) -> Int32
```

Computes the bitwise logical "xor" of the two arguments.

### Int32.**shl**

```grain
shl : (Int32, Int32) -> Int32
```

Computes the bitwise logical shift left of the first argument by the second argument.

### Int32.**shr**

```grain
shr : (Int32, Int32) -> Int32
```

Computes the bitwise arithmetic (signed) shift right of the first argument by the second argument.

### Int32.**shrU**

```grain
shrU : (Int32, Int32) -> Int32
```

Computes the unsigned bitwise logical shift right of the first argument by the second argument.
