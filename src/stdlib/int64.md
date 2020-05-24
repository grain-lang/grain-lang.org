---
title: Int64
---

Utilities for working with the Int64 type.

```grain
import Int64 from 'stdint64'
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

### Int64.**lsl**

```grain
lsl : (Int64, Number) -> Int64
```

Computes the bitwise logical shift left of the first argument by the second argument.

### Int64.**lsr**

```grain
lsr : (Int64, Number) -> Int64
```

Computes the bitwise logical shift right of the first argument by the second argument.

### Int64.**asr**

```grain
asr : (Int64, Number) -> Int64
```

Computes the bitwise arithmetic (signed) shift right of the first argument by the second argument.

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
