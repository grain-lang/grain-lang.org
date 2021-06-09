---
title: Number
---

Utilities for working with numbers.

```grain
import Number from "number"
```

## Values

### Number.**add**

```grain
add : (Number, Number) -> Number
```

Computes the sum of its operands.

### Number.**sub**

```grain
sub : (Number, Number) -> Number
```

Computes the difference of its operands.

### Number.**mul**

```grain
mul : (Number, Number) -> Number
```

Computes the product of its operands.

### Number.**div**

```grain
div : (Number, Number) -> Number
```

Computes the quotient of its operands.

### Number.**sqrt**

```grain
sqrt : (Number) -> Number
```

Computes the square root of its operand.

### Number.**min**

```grain
min : (Number, Number) -> Number
```

Returns the smaller of its two operands.

### Number.**max**

```grain
max : (Number, Number) -> Number
```

Returns the larger of its two operands.

### Number.**ceil**

```grain
ceil : (Number) -> Number
```

Rounds its operand up to the next largest integer.

### Number.**floor**

```grain
floor : (Number) -> Number
```

Rounds its operand down to the largest integer less than the operand. 

### Number.**trunc**

```grain
trunc : (Number) -> Number
```

Returns the integer part of its operand, removing any fractional value.

### Number.**round**

```grain
round : (Number) -> Number
```

Returns its operand rounded to its nearest integer. `.5` and above return `1`, `.4` and below return `0`

### Number.**abs**

```grain
abs : (Number) -> Number
```

Returns the absolute value of a number. That is, it returns `x` if `x` is positive or zero, and the negation of `x` if `x` is negative.

### Number.**neg**

```grain
neg : (Number) -> Number
```

Returns the negation of its operand.