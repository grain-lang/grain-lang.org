---
title: Float64
---

Operations on the Float64 type.

```grain
import Float64 from "float64"
```

## Values

### Float64.**fromNumber**

```grain
fromNumber : Number -> Float64
```

Coverts the argument from a `Number` to a `Float64`.

### Float64.**toNumber**

```grain
toNumber : Float64 -> Number
```

Converts the argument from a `Float64` to a `Number`.

### Float64.**add**

```grain
add : (Float64, Float64) -> Float64
```

Floating-point addition.

### Float64.**sub**

```grain
sub : (Float64, Float64) -> Float64
```

Floating-point subtraction.

### Float64.**mul**

```grain
mul : (Float64, Float64) -> Float64
```

Floating-point multiplication.

### Float64.**div**

```grain
div : (Float64, Float64) -> Float64
```

Floating-point division.

### Float64.**gt**

```grain
gt : (Float64, Float64) -> Bool
```

Checks if the first argument is strictly greater than the second argument.

### Float64.**gte**

```grain
gte : (Float64, Float64) -> Bool
```

Checks if the first argument is greater than or equal to the second argument.

### Float64.**lt**

```grain
lt : (Float64, Float64) -> Bool
```

Checks if the first argument is strictly less than the second argument.

### Float64.**lte**

```grain
lte : (Float64, Float64) -> Bool
```

Checks if the first argument is less than or equal to the second argument.
