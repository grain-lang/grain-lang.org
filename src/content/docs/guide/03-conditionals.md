---
title: Conditionals
slug: guide/conditionals
---

## The `if` Expression

Code can be executed conditionally using `if` expressions.

### `if`-`else`

An `if` expression with an `else` clause evaluates the given condition; if the condition is `true` it executes and evaluates to the expression in the `if` branch, and if the condition is `false` it executes and evaluates to the expression in the `else` branch. Both branches must evaluate to the same type.

```grain
module Main

let expr = true
if (expr) print("true branch") else print("false branch")
```

`if` is an expression, and therefore can be used like any other expression; in that way, `if` can be used like a ternary operator from other languages. For example, we can assign an `if` expression to a binding:

```grain
module Main

let expr = true
let result = if (expr) "true branch" else "false branch"

print(result) // true branch
```

Block expressions are frequently used in combination with `if` expressions in order to execute several expressions together based on a condition, or to improve readability.

```grain
module Main

let expr = false
if (expr) {
  print("true branch")
  print("with block expressions")
} else {
  print("false branch")
  print("with block expressions")
}
```

`if`-`else` expressions can be chained together to create more complex branching behavior:

```grain
module Main

let expr = false
let otherExpr = true
if (expr) {
  print("First branch")
} else if (otherExpr) {
  print("Second branch") // This will be printed
} else {
  print("Third branch")
}
```

### Single-sided `if`

The `if` expression can also be used with no `else` in order to execute side effects:

```grain
module Main

let expr = true
if (expr) {
  print("Single-sided conditional")
}
```

An `if` with no `else` clause evaluates to `void`.

#### An aside on `Void`

`void` is a special value in Grain, and has the type `Void`. The `Void` type is used to represent the absence of a meaningful value; it is generally used in situations where an expression executes side effects and does not evaluate to a meaningful value itself.

```grain
module Main

// The print function evaluates to void
let printValue: Void = print("Print")

let ifValue: Void = if (true) print("If")

assert printValue == void
assert ifValue == void
```
