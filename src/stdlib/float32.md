---
title: Float32
---

Operations on the Float32 type.

```grain
import Float32 from "float32"
```

## Values

### Float32.**fromNumber**

```grain
fromNumber : Number -> Float32
```

Coverts the argument from a `Number` to a `Float32`.

### Float32.**toNumber**

```grain
toNumber : Float32 -> Number
```

Converts the argument from a `Float32` to a `Number`.

### Float32.**add**

```grain
add : (Float32, Float32) -> Float32
```

Floating-point addition.

### Float32.**sub**

```grain
sub : (Float32, Float32) -> Float32
```

Floating-point subtraction.

### Float32.**mul**

```grain
mul : (Float32, Float32) -> Float32
```

Floating-point multiplication.

### Float32.**div**

```grain
div : (Float32, Float32) -> Float32
```

Floating-point division.

### Float32.**gt**

```grain
gt : (Float32, Float32) -> Bool
```

Checks if the first argument is strictly greater than the second argument.

### Float32.**gte**

```grain
gte : (Float32, Float32) -> Bool
```

Checks if the first argument is greater than or equal to the second argument.

### Float32.**lt**

```grain
lt : (Float32, Float32) -> Bool
```

Checks if the first argument is strictly less than the second argument.

### Float32.**lte**

```grain
lte : (Float32, Float32) -> Bool
```

Checks if the first argument is less than or equal to the second argument.

### Float32.**infinity**

```grain
infinity : Float32
```

A constant equal to the floating-point positive infinity value.

### Float32.**nan**

```grain
nan : Float32
```

A constant equal to floating-point NaN (not a number) value.
