---
title: Bindings
---

## On the Subject of `let`, `let rec`, and `let mut`

The `let` and `let rec` statements introduce new names into the current scope.
In other words, they let you declare new bindings (quite similar to constants in other languages).

The `let mut` statement can be used to introduce new mutable bindings into the current scope.

## Syntax

```grain
let name1 = value1 [, name2 = value2]
let rec name1 = func1 [and name2 = func2]
let mut name1 = value1 [, name2 = value2]
```

### Parameters

`name1`, `name2`, ..., `nameN`
Names to be used for the binding identifiers.

`value1`, `value2`, ..., `valueN`
Any valid Grain expression.

`func1`, `func2`, ..., `funcN`
Any valid Grain functions.

## Description

* `let` allows you to introduce names.
* `let rec` allows you to introduce recursive definitions.
* `let mut` allows you to introduce names with mutable values.

### Using `let`

Using `let` is pretty simple:

```grain
# Assigning the value 5 to the name 'foo'
let foo = 5

# Assigning the value of name 'foo' to name 'bar'
let bar = foo

# Assigning this function to the name 'add2'
let add2 = (a, b) => a + b

# Assigning the result of this block to the name 'baz'
let baz = {
  let a = 5;
  let b = 6;
  a * b
} # baz is now the value 30
```


`let` is scoped to the nearest block. That really just means it's scoped to the nearest enclosing curly braces:

```grain
let a = {
  # This is allowed, since this 'a' only exists within the enclosing braces.
  let a = 3;

  let b = 4;
  a + b
}

a # This evaluates to 7.

b # This is a name error, since 'b' only existed in the earlier block.
```

### Using `let rec`

`let rec` primarily allows you to define recursive functions.
The name of the identifier used will be within the scope of the body of the function:

```grain
let rec fib = (n) => {
  if (n < 2) {
    n
  } else {
    fib(n-1) + fib(n-2)
  }
}
```

`let rec` also allows you to define mutually recursive functions:

```grain
let rec isEven = (n) => {
  if (n > 1) {
    isOdd(n-1)
  } else {
    n == 0
  }
}
and isOdd = (n) => {
  if (n > 1) {
    isEven(n-1)
  } else {
    n == 1
  }
}
```

### Using `let mut`

`let mut` allows you to declare bindings where the value may be changed in the future. Also provided are `+=`, `-=`, `*=`, and `/=` operators, which perform the math operation on a mutable value and re-assign the result.

```grain
let mut b = "foo"

print(b) # "foo"

b = "bar"

print(b) # "bar"

let mut count = 7

count += 9
count -= 6
count *= 5
count /= 25

print(count) # 2
```
