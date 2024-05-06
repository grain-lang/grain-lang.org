---
title: The Basics
---

In this section, we'll learn how to declare new bindings and perform some basic operations on them.

## Declaring Named Values

Grain uses the `let` keyword to introduce new values with a given name, which we call bindings. Here are some examples using primitive types:

```grain
let someNumber = 42
let someBoolean = true
let someString = "Welcome to Grain!"
```

We can reference bindings we've created in Grain to form compound expressions:

```grain
let firstNumber = 3, secondNumber = 4
let thirdNumber = firstNumber + secondNumber
```

### Working with Tuples

Tuples in Grain allow you to bundle up a few pieces of data. They're great for related, uniform data. Mixed data types are allowed within tuples, and we'll take advantage of that in this example. Here's an example of a tuple containing a user's name, age, and favorite color:

```grain
let user = ("Klaus Teuber", 67, "yellow")
```

Grain supports tuple destructuring to pull data out of tuples:

```grain
// The same tuple from the previous example
let user = ("Klaus Teuber", 67, "yellow")

let (name, age, color) = user

let ageNextYear = age + 1
```

Since we only care about some of the values in this tuple, we can use underscores instead of names, and Grain will not create bindings for those fields.

```grain
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
let sum = 2 + 2 // 4
let difference = 42 - 17 // 25
let product = 3 * 5 // 15
let quotient = 36 / 3 // 12
let remainder = 19 % 2 // 1
```

### Number Comparisons

These operators return a boolean result of `true` or `false`. In this example, every statement returns `true`.

```grain
15 > 11
15 >= 11
6 < 91
6 <= 91
```

### Equality

Use `==` to check equality. `==` checks for structural equality, so it also works for comparing things like tuples and lists.

```grain
"foo" == "foo" // true
(1, 2, 3) == (1, 2, 3) // true
(4, 5) == (4, 5, 6) // false
```

### Boolean Operations

The classic booleans operators `&&`, `||`, and `!` are available.

```grain
true && false // false
true || false // true
!true // false
```

## The `if` Statement

The `if` statement in Grain always returns a value. For this reason, our `if` statements must always have an `else` branch. The last value in the block is the value of the statement.

```grain
if (7 < 14) {
  "This is a true statement"
} else {
  "This is a false statement"
}
```
