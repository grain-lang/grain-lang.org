---
title: Conditionals
---

## The `if` Expression

While we typically call it an `if` _statement_, `if` is technically an expression—and can be used anywhere an expression is allowed.

### Single-sided `if`

```grain
module Main

let expr = true
if (expr) print("Single-sided conditional")
```

```grain
module Main

let expr = true
if (expr) {
  print("Single-sided conditional")
  print("with multiple statements")
}
```

An `if` with no `else` clause always evaluates to `Void`.

### Double-sided `if`

```grain
module Main

let expr = true
if (expr) print("true branch") else print("false branch")
```

```grain
module Main

let expr = false
if (expr) {
  print("true branch")
  print("with multiple statements")
} else {
  print("false branch")
  print("with multiple statements")
}
```

An `if` with both a true branch and a false branch evaluates to the last expression of the true branch if `expr` evaluates to `true`, and the last expression of the false branch if `expr` evaluates to `false`. Both branches must typecheck to the same type.

### As an expression

Since the `if` expression evaluates to a value, it can be assigned:

```grain
module Main

let expr = true
let result = if (expr) {
  "true branch"
} else {
  "false branch"
}

print(result) // true branch
```

It can also be used inline, like a ternary operator:

```grain
module Main

let expr = false
print(if (expr) "true branch" else "false branch") // false branch
```
