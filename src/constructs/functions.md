---
title: Functions
---

Functions in Grain are defined using arrow notation:

```grain
module Main

let add = (x, y) => x + y
```

Here, the `add` function receives two arguments, `x` and `y`, and returns the sum. Functions can also perform a series of actions by returning a block:

```grain
module Main

let printAndAdd = (x, y) => {
  let sum = x + y
  print(sum)
  sum
}
```

Note that the value `sum` is returned from this function—the final value in the block is always what is returned from the function.

## First-class Functions

All functions in Grain are also values—they can be passed just like any other value to other functions. A common example is passing a function to `List.map`:

```grain
module Main

include "list"

let mappedList = List.map(toString, [1, 2, 3])
print(mappedList) // ["1", "2", "3"]
```

A function value passed to a function as an argument can be used like so:

```grain
module Main

let call = (func) => func()
```

```grain
module Main

let callWithTwoArgs = (func, arg1, arg2) => func(arg1, arg2)
```

## Closures

A closure is the combination of a function and any local values it has access to that it did not define. Grain automatically creates closures for you whenever you define a function.

Take a look at this example:

```grain
module Main

let run = () => {
  let mut toLog = "hello"
  let log = () => print(toLog)

  log()
  toLog = "world"
  log()
}
```

The `log` function doesn't have any local variables, but it has access to `run`'s local variable `toLog`. When the `log` function is called, it "remembers" the value stored in `toLog`. If you were to call the `run` function, it would print "hello" and then "world". `log` will always use the value currently in `toLog`.

Furthermore, function closures will continue to "remember" values even when they're used outside of their original scope. Here's an example that makes a counter:

```grain
module Main

let makeCounter = () => {
  let mut count = 0
  () => {
    count += 1
    print(count)
  }
}

let counter = makeCounter()
counter() // 1
counter() // 2
counter() // 3
```

The `makeCounter` function returns a counter function which will print sequential numbers when called. Even though this function is used outside of the `makeCounter` function, it still remembers that `count` variable.
