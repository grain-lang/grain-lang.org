---
title: Shadowing and Mutation
slug: guide/mutation
---

## Mutation

Value bindings in Grain are immutable by default, which means that they cannot be reassigned after being declared. While regular immutable bindings should be sufficient for most use cases, it can sometimes be helpful to mutate the data already associated with a name when writing imperative-style code. We can opt into mutable values by declaring a binding `mut` when defined.

### Using `mut`

Consider the following example:

```grain
module Main

let mut b = "foo"

print(b) // "foo"

let condition = true
if (condition) {
  b = "bar"
}

print(b) // "bar"
```

A couple things to note:

1. When defining our value binding, we added the `mut` keyword.
1. We can use the value of our mutable binding like any other binding.
1. We can assign new values to the binding using `=`.
1. If we forget `mut` but try to assign to the binding, we'll get a compilation error.

### Working with Mutable Numbers

When using mutable values that are `Numbers`, we can use some built-in operators to make working with them easier. Grain provides `+=`, `-=`, `*=`, `/=`, and `%=`, which perform the math operation on the value and re-assign the result.

```grain
module Main

let mut count = 7

count += 9
count -= 6
count *= 5
count /= 25

print(count) // 2
```

Unlike some other languages, these operators return `void` to help alleviate ambiguity and make code easier to understand.

```grain
module Main

let mut count = 7

print(count += 9) // void

// Instead, use
count += 9
print(count) // 25
```

## Shadowing

It is also possible to create a binding with the same name as an existing binding in the same scope; this process is called "shadowing" and can be an alternative to declaring `mut` bindings if a binding value is changed in the same scope the original binding is declared in:

```grain
module Main

let val = 1
let val = 2 // `val` now refers to a new value
```

It is important to note that shadowing does not modify what the shadowed binding refers to, but rather makes a new association for a binding name within the scope:

```grain
module Main

let val = 1

let condition = true
if (condition) {
  let val = 2
  print(val) // 2
} else {
  let val = 3
}

print(val) // 1
```

## Boxes

Boxes are special values in Grain that can be used for representing mutable data. The difference between boxes and `let mut` is that `let mut` allows you to **update a binding to refer to a new value** whereas a box is itself **a value whose contents can be mutated**. Generally, using `let mut` is preferred to boxes, but boxes can be useful in more complex mutation scenarios.

- The `box` function allows you to create a box containing an initial value.
- The `unbox` function allows you to access the current value inside a box.
- The `:=` operator allows you to reassign the value inside a box.

```grain
module Main

let tuple = (1, box(2))
print(tuple) // (1, box(2))

let (_, secondValue) = tuple
secondValue := 3
print(tuple) // (1, box(3))
```

```grain
module Main

let maybeUpdateBox = b => {
  let someCondition = true
  if (someCondition) {
    b := "new value"
  }
}

let b = box("initial value")
maybeUpdateBox(b)
print(unbox(b)) // "new value"
```
