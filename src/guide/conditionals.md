---
title: Conditionals
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

Now is a great opportunity to introduce block expressions: to write a block expression simply surround several expressions in curly braces. When entering a block, each of the expressions in the block will be executed. The block expression as a whole will evaluate to its last expression's value. For example:

```grain
module Main

let value = {
  let n = 123
  print("In an expression block") // This will be printed
  n // The block expression will evaluate to the last expression's value
}

print(value) // 123

// A block expression containing only one expression is also valid
let a = { 1 }
let b = 1
print(a == b) // true
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

### Single-sided `if`

The `if` expression can also be used with no `else` in order to execute side effects:

```grain
module Main

let expr = true
if (expr) {
  print("Single-sided conditional")
}
```

An `if` with no `else` clause evaluates to `void`

#### An aside on `Void`

`void` is a special value in Grain, and has the type `Void`. The `Void` type is used to represent the absence of a meaningful value; it is generally used in situations where an expression executes side effects and does not evaluate to a meaningful value itself.

```grain
module Main

// The print function evaluates to void
let printValue: Void = print("Print")

let ifValue: Void = if (true) print("If")

print(printValue == void) // true
print(ifValue == void) // true
```
