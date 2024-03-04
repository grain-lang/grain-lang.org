---
title: Conditionals
---

## The `if` Expression

Code can be executed conditionally using `if` expressions.

### Single-sided `if`

The `if` expression can be used with no `else` in order to execute side effects:

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

An `if` expression with an `else` clause executes the code in the `if` branch and evaluates to the last expression in the branch if the condition evaluates to `true`, and vice versa if the condition evaluates to `false`. Both branches must typecheck to the same type.

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

### As an expression

Since the `if` expression evaluates to a value, it can be assigned to a binding like any other value:

```grain
module Main

let expr = true
let result = if (expr) {
  print("got into if branch")
  "true branch"
} else {
  print("got into else branch")
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
