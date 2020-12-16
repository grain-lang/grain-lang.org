---
title: Pervasives
---

This module is automatically imported into every Grain program. You can think of it as the global environment. Although it is automatically imported, it can still be imported manually.

```grain
import Pervasives from "pervasives"
```

## Types

Type declarations included in the Pervasives module.

### Pervasives.**Number**

```grain
type Number
```

The type of Grain numbers, i.e. `42`, `0x2a`.

### Pervasives.**Bool**

```grain
enum Bool { true, false }
```

The type of Grain booleans, i.e. the type of `true` and `false`.

### Pervasives.**String**

```grain
type String
```

The type of Grain strings, i.e. `"The quick brown fox jumps over the lazy dog."`.

### Pervasives.**Void**

```grain
enum Void { void }
```

The type of `void`.

### Pervasives.**Box**

```grain
type Box<a>
```

The type of Grain boxes.

### Pervasives.**List**

```grain
enum List<a> { [], [...](a, List<a>) }
```

The type of Grain lists, i.e. `[1, 2, 3]`, `[]`.

### Pervasives.**Array**

```grain
type Array<a>
```

The type of Grain arrays, i.e. `[> 1, 2, 3]`.

### Pervasives.**Option**

```grain
enum Option<a> { Some(a), None }
```

Grain's type representing something that may or may not contain data. Think of this like a better, type-safe "null".

### Pervasives.**Result**

```grain
enum Result<t, e> { Ok(t), Err(e) }
```

Grain's type representing the result of something that might error.

## Comparison Operations

Operations to compare values.

### Pervasives.**(==)**

Check that two values are equal. This checks for structural equality, so it also works for comparing things like tuples and lists.

### Pervasives.**(!=)**

Check that two values are **not** equal. This checks for structural equality, so it also works for comparing things like tuples and lists.

### Pervasives.**(is)**

Checks that two values are physically equal. Use this operator if you don't need or want structural equality.

## Math Operations

Operations on numbers.

### Pervasives.**incr**

```grain
incr : Number -> Number
```

Increments a number by 1.

### Pervasives.**decr**

```grain
decr : Number -> Number
```

Decrements a number by 1.

### Pervasives.**(+)**

```grain
(+) : (Number, Number) -> Number
```

Computes the sum of two numbers.

### Pervasives.**(-)**

```grain
(-) : (Number, Number) -> Number
```

Computes the difference of two numbers.

### Pervasives.**(*)**

```grain
(*) : (Number, Number) -> Number
```

Computes the product of two numbers.

### Pervasives.**(/)**

```grain
(/) : (Number, Number) -> Number
```

Computes the quotient of two numbers.

### Pervasives.**(%)**

```grain
(%) : (Number, Number) -> Number
```

Computes the modulo of the first argument by the second argument.

## Number Comparisons

Comparisons on numbers.

### Pervasives.**(<)**

```grain
(<) : (Number, Number) -> Bool
```

Checks if the first argument is less than the second argument.

### Pervasives.**(>)**

```grain
(>) : (Number, Number) -> Bool
```

Checks if the first argument is greater than the second argument.

### Pervasives.**(<=)**

```grain
(<=) : (Number, Number) -> Bool
```

Checks if the first argument is less than or equal to the second argument.

### Pervasives.**(>=)**

```grain
(>=) : (Number, Number) -> Bool
```

Checks if the first argument is greater than or equal to the second argument.

## Boolean Operations

Operations on booleans.

### Pervasives.**(!)**

```grain
(!) : Bool -> Bool
```

Computes the boolean "not" of the argument.

```grain
!true // false
!false // true
```

### Pervasives.**(&&)**

```grain
(&&) : (Bool, Bool) -> Bool
```

Computes the boolean "and" of the two arguments.

### Pervasives.**(||)**

```grain
(||) : (Bool, Bool) -> Bool
```

Computes the boolean "or" of the two arguments.

## Box Operations

Operations on boxes.

### Pervasives.**box**

```grain
box : a -> Box<a>
```

Creates a box with the same type as the argument. The argument is used as the initial value.

### Pervasives.**unbox**

```grain
unbox : Box<a> -> a
```

Retrieves the current value from the box.

```grain
let counter = box(0)
unbox(counter) // 0
```

### Pervasives.**(+=)**

```grain
(+=) : (Box<Number>, Number) -> Number
```

Computes the sum of the value in the box and the second argument and stores the result in the box.

### Pervasives.**(-=)**

```grain
(-=) : (Box<Number>, Number) -> Number
```

Computes the difference of the value in the box and the second argument and stores the result in the box.

### Pervasives.**(*=)**

```grain
(*=) : (Box<Number>, Number) -> Number
```

Computes the product of the value in the box and the second argument and stores the result in the box.

### Pervasives.**(/=)**

```grain
(/=) : (Box<Number>, Number) -> Number
```

Computes the quotient of the value in the box and the second argument and stores the result in the box.

## Type Helpers

Functions that help with typechecking.

### Pervasives.**ignore**

```grain
ignore : a -> Void
```

Accepts any argument and returns `void`.

## Assertions

Functions that raise if conditions are not met.

### Pervasives.**assert**

```grain
assert : Bool -> Void
```

Assert that the given condition (boolean) is `true`. Raises `AssertionError` if the condition is `false`.

```grain
assert 3 > 2
assert true
```

## Failure

Functions that raise unconditionally.

### Pervasives.**fail**

```grain
fail : String -> a
```

Unconditionally raise `Failure` with a message.

```grain
if (true) {
  print("success")
} else {
  fail "condition may not be false"
}
```

## Printing

Functions that deal with printing.

### Pervasives.**print**

```grain
print : a -> Void
```

Prints the value of the argument to the console. Works for any type. Internally, `print` calls `toString` on the argument.

### Pervasives.**toString**

```grain
toString : a -> String
```

Returns a string representation of the argument. Provides a better representation of data types if those types are exported from the module.

## Other Values

Miscellaneous operations.

### Pervasives.**identity**

```grain
identity : a -> a
```

Returns the argument untouched.
