---
title: Functions
---

Functions are essential to any language. They allow us to reuse code and solve complex problems.

## Defining Functions

Defining a named function is similar to naming any other value in Grain.

```grain
module Main

let add = (x, y) => x + y
```

The parameters of a function are put in parentheses, and functions evaluate to an expression. Unlike other languages, you do not need to use an explicit `return` keyword to return a value (though the `return` keyword does exist in Grain; more on that later).

Like in other places, Grain infers the parameter and return types automatically based on their usage. In this particular example, both of the parameters to this function and its return type were inferred to be `Number`. Here is the same example with parameter types specified explicitly:

```grain
module Main

let add = (x: Number, y: Number) => x + y
```

Real-world functions are usually more complex than a simple expression, so using block expressions is often desirable. In this case, the function will effectively return the last expression in the block.

```grain
module Main

let logAndAdd = (x, y) => {
  print(x)
  print(y)
  x + y
}
```

## Calling Functions

Functions can be called with each argument passed either positionally or by name:

```grain
let add = (x, y) => x + y

// The following are equivalent
add(10, 20)
add(x=10, y=20)
add(y=20, x=10)
```

### Functions as First Class Citizens

Since functions are just like any other values in Grain, they can be passed as arguments to other functions.

```grain
module Main

let doMath = (fn, x, y) => fn(x, y)

let multiply = (x, y) => x * y
let subtract = (x, y) => x - y

doMath(multiply, 4, 6) // 24
```

Furthermore, functions can return functions themselves!

```grain
module Main

let addTo = num1 => {
  num2 => {
    num1 + num2
  }
}

let addTo5 = addTo(5)
print(addTo5(10)) // 15
```

### Returning multiple Values

You can use tuples to return multiple values from functions.

```grain
module Main

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
module Main

let rec fibonacci = (n) => {
  if (n == 0 || n == 1) {
    n
  } else {
    fibonacci(n - 1) + fibonacci(n - 2)
  }
}
```

## Early `return`

The `return` keyword can be used to explicitly cut the execution of a function short. Note that if `return` is used somewhere in a function, the remaining places where a value is returned must also use the `return` keyword

```grain
module Main

let isEven = n => {
  if (n % 2 == 0) {
    return true
  }
  return false
}
```

`return` can also be used without a value, in which case `void` is returned implicitly

```grain
module Main

let fizzBuzz = num => {
  if (num % 15 == 0) {
    print("FizzBuzz!")
    return
  }
  if (num % 3 == 0) {
    print("Fizz!")
    return
  }
  if (num % 5 == 0) {
    print("Buzz!")
    return
  }
  return
}

fizzBuzz(9) // prints "Fizz!"
```

## Infix Operators

Custom infix operators can be defined like regular functions, with the desired operator surrounded by parentheses.

```grain
module Main

let (*+*) = (a, b) => (a * a) + (b * b)

let value = 3 *+* 4 // 25
```

## Default Arguments

Function parameters can be given a default value, and if the caller does not supply an argument value the default will be used. Note that if a parameter has a default value, the corresponding argument must be passed by name.

```grain
module Main

let addWithDefault = (x, y=0) => x + y

addWithDefault(10, y=5) // 15
addWithDefault(10) // 10
```

Parameters with default arguments can be placed anywhere in the parameter list. Furthermore, positional arguments supplied to the function when invoked will only be applied to required parameters.

```grain
module Main

let printWithDefaults = (first="First", middle, last="Last") => {
  print(first ++ ", " ++ middle ++ ", and " ++ last)
}

printWithDefaults("Middle") // "First, Middle, and Last"
printWithDefaults(x="A", z="C", "B") // "A, B, and C"
```

## Closures

Grain functions have access to values defined in their enclosing scope(s). In technical terms, Grain will automatically create a _closure_ for you when a function uses a value defined outside of its parameter list.

```grain
module Main

let run = () => {
  let mut toLog = "hello"
  let log = () => {
    print(toLog)
  }

  log() // hello
  toLog = "world"
  log() // world
}
```

The `log` function doesn't define any bindings itself, but it has access to `run`'s mutable binding `toLog`. When the `log` function is called, it utilizes the current value stored in `toLog`.

Furthermore, function closures will continue to "remember" values even when they're used outside of their original scope. Here's an example that makes a counter:

```grain
module Main

let makeCounter = () => {
  let mut count = 0
  let increment = () => {
    count += 1
    print(count)
  }
  increment
}

let counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
```

The `makeCounter` function returns a counter function which will print sequential numbers when called.

## Foreign Functions

A foreign function declaration can be used to import functions from the webassembly host.

```grain
foreign wasm alert: WasmI32 => Void from "host"

alert(42)
```
