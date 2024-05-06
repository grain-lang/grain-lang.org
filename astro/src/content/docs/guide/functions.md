---
title: Functions
---

Functions are essential to any language. They allow us to reuse code and solve complex problems.

## Defining Functions

Defining a named function is similar to naming any other value in Grain.

```grain
let add = (x, y) => x + y
```

A function can perform a series of actions. One thing to note about functions in Grain is that they always return the result of the final expression in the function body, without needing an explicit `return` statement.

```grain
let logAndAdd = (x, y) => {
  print(x)
  print(y)
  x + y
}
```

### Functions as First Class Citizens

Since functions are just like any other values in Grain, they can be passed as arguments to other functions.

```grain
let doMath = (fn, x, y) => fn(x, y)

let multiply = (x, y) => x * y
let subtract = (x, y) => x - y

doMath(multiply, 4, 6) // 24
```

### Multiple Return Values

You can return multiple values from functions using tuples.

```grain
let translateCoordinates = (x, y) => {
  (x + 4, y + 4)
}

let (x, y) = translateCoordinates(1, 2)
print(x) // 5
print(y) // 6
```

## Recursive Functions

We can define recursive functions using the `rec` keyword. Recursive functions are a key part of Grain, so remember to use `let rec` when necessary!

```grain
let rec fibonacci = (n) => {
  if (n == 0 || n == 1) {
    n
  } else {
    fibonacci(n - 1) + fibonacci(n - 2)
  }
}
```
