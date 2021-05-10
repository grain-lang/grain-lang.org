---
title: Numbers
---

Grain has a unified number type, called `Number`, which contains integer (whole) numbers, floating-point (decimal) numbers, and rational (fractional) numbers. Grain also has separate fixed-length integer and float types for programs which require more precise typechecking.

## Number Syntax

### Integers

```grain
42 // an integer
```

To make an integer more readable, underscores can be used throughout the number as a visual separator. The underscores do not affect the value of the number.

```grain
let oneBillion = 1_000_000_000
```

In addition to decimal numbers, integers can be written in hexadecimal, octal, and binary:

```grain
// hexadecimal
let fourtyTwo = 0x2A // or 0x2a
```

```grain
// octal
let fourtyTwo = 0o52
```

```grain
// binary
let fourtyTwo = 0b101010
```

Underscores can be used with these other formats:

```grain
let dec0de = 0b1101_1110_1100_0000_1101_1110
```

### Floating-point Numbers

```grain
1.23 // a floating-point number
```

Floating-point numbers can also be written using scientific notation. In this form, the significand (the part of a floating-point number that contains the significant digits) is multiplied by 10 raised to the power of the provided exponent. For example,

```grain
1.23e3 # computes as 1.23x10^3, for a value of 1230.
```

The sign of the exponent can also be provided:

```grain
1.23e+3 // 1230
```

```grain
1.23e-3 // 0.00123
```

As with integers, underscores can be placed throughout the number to make it more readable:

```grain
1_000.555_5e2
```

### Rational Numbers

```grain
1/3 // a rational number
```

A rational literal will always simplify to its smallest form:

```grain
3/9 // becomes 1/3
```

Similarly, a rational with a numerator that is divisible by its denominator will simplify into a whole number:

```grain
9/3 // becomes 3
```

## Number Size

Currently, the `Number` type supports ints and floats up to 64 bits in size, though this may increase in the future.

## Other Number Types

In addition to the `Number` type, there are more restrictive number types, namely `Int32`, `Int64`, `Float32`, and `Float64`. Operations on these types are available from their respective standard libraries. A suffix may be added to the regular number syntax to create number literals for each of these types:

|Type|Suffix|
|-|-|
|`Int32`|l|
|`Int64`|L|
|`Float32`|f|
|`Float64`|d|

```grain
42l // Int32 literal
```

```grain
42L // Int64 literal
```

```grain
12.34f // Float32 literal
```

```grain
12.34d // Float64 literal
```
