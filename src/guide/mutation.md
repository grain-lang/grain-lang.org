---
title: Mutation
---

Value bindings in Grain are immutable, which means that they do not change after they have been declared. While there's a ton we can get done with regular bindings, it can sometimes be helpful to change the data already associated with a name. We can opt into mutable values by declaring a binding `mut` when defined.

## Using `mut`

Take a look at the following example:

```grain
let mut b = "foo"

print(b) // "foo"

b = "bar"

print(b) // "bar"
```

A couple things to note from this example:

1. When defining our value binding, we added the `mut` keyword.
1. We can use the value of our mutable binding like any other binding!
1. We can also assign values to it using `=` and the name will be associated with the new value.
1. If we forget `mut` but try to assign to the binding, we'll get a type error.

## Working with Mutable Numbers

When using mutable values that are `Numbers`, we can use some built-in operators to make working with them easier. Grain provides `+=`, `-=`, `*=`, `/=`, and `%=`, which perform the math operation on the value and re-assign the result.

```grain
let mut count = 7

count += 9
count -= 6
count *= 5
count /= 25

print(count) // 2
```

These operators return `void` to help alleviate ambiguity and make code easier to understand—use the name of the binding to get its current value.

```grain
let mut count = 7

print(count += 9) // void

// Instead, use
count += 9
print(count) // 25
```
