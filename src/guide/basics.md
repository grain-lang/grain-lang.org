---
title: The Basics
---

In this section, we'll learn how to declare new bindings and perform some basic operations on them.

## Declaring Named Values

Grain uses the `let` keyword to introduce new values with a given name, which we call bindings. Here are some examples using primitive types:

```grain
module Main

let someNumber = 42
let someBoolean = true
// We can also use the `and` keyword to declare multiple bindings in sequence
let someString = "Welcome to Grain!" and someChar = 'A'
```

Grain uses type inference to automatically determine the type of values throughout your program. Even though in the above example we did not explicitly define the type of each binding, Grain deduced them automatically based on context. It is also possible to explicitly specify the types of binding:

```grain
module Main

let someNumber: Number = 42
let someBoolean: Bool = true
let someString: String = "Welcome to Grain!" and someChar: Char = 'A'
```

We can reference bindings we've created in Grain to form compound expressions:

```grain
module Main

let firstNumber = 3 and secondNumber = 4
let thirdNumber = firstNumber + secondNumber
```

### Working with Tuples

Tuples in Grain allow you to bundle up a few pieces of data. They're great for related, uniform data. Mixed data types are allowed within tuples, and we'll take advantage of that in this example. Here's an example of a tuple containing a user's name, age, and favorite color:

```grain
module Main

let user = ("Klaus Teuber", 67, "yellow")
```

Grain supports tuple destructuring to pull data out of tuples:

```grain
module Main

// The same tuple from the previous example
let user = ("Klaus Teuber", 67, "yellow")

let (name, age, color) = user

let ageNextYear = age + 1
```

Since we only care about some of the values in this tuple, we can use underscores instead of names, and Grain will not create bindings for those fields.

```grain
module Main

// The same tuple from the previous two examples
let user = ("Klaus Teuber", 67, "yellow")

let (_, age, _) = user

let ageNextYear = age + 1
```

## Other Basic Operations

You may find some of these useful throughout your Grain programs.

### Number Operations

The standard number operations include addition, subtraction, multiplication, division, and modulus (remainder). If you're looking for more number operations, you may find what you're looking for in the `Number` module.

```grain
module Main

let sum = 2 + 2 // 4
let difference = 42 - 17 // 25
let product = 3 * 5 // 15
let quotient = 36 / 3 // 12
let remainder = 19 % 2 // 1
```

### Number Comparisons

These operators return a boolean result of `true` or `false`. In this example, every statement returns `true`.

```grain
module Main

15 > 11
15 >= 11
6 < 91
6 <= 91
```

### Equality

Use `==` to check equality. `==` checks for structural equality, so it also works for comparing things like tuples and lists.

```grain
module Main

"foo" == "foo" // true
(1, 2, 3) == (1, 2, 3) // true
(4, 5) == (4, 5, 6) // false
```

### Boolean Operations

The classic booleans operators `&&`, `||`, and `!` are available.

```grain
module Main

true && false // false
true || false // true
!true // false
```

### Block expressions

Block expressions allow you to group several expressions together to be executed one after another: to write a block expression simply surround several expressions in curly braces. The block expression as a whole will evaluate to its last expression's value. For example:

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
assert a == b
```
