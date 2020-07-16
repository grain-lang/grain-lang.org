---
title: Mutation
---

Value bindings in Grain are immutable, which means that they do not change after they have been declared. While there's a ton we can get done with regular bindings, it can sometimes be helpful to change the data already associated with a name. We can opt into mutable values by declaring a binding `mut` when defined.

## Using `mut`

Take a look at the following example:

```grain
let mut b = "foo"

print(b) # "foo"

b = "bar"

print(b) # "bar"
```

A couple things to note from this example:

1. When defining our value binding, we added the `mut` keyword.
1. We can use the value of our mutable binding like any other binding!
1. We can also assign values to it using `=` and it will update the original reference.
1. If we forget `mut` but try to assign to the binding, we'll get the correct type error.

## Working with mutable Numbers

When using mutable values that are Numbers, we can use some built-in operators to make working with them easier. Grain provides `+=`, `-=`, `*=`, and `/=`, which perform the math operation on the value and re-assign the result.

```grain
let mut count = 7

count += 9
count -= 6
count *= 5
count /= 25

print(count) # 2
```

These operators also return the assigned result. This is useful if we are using mutable Numbers to perform an imperative loop. *Be careful of off-by-one errors!*

```grain
let length = 10
let mut index = -1

while ((index += 1) < length) {
  print(index)
}
```
