---
title: Boxes
---

Value bindings in Grain are immutable, which means that they do not change after they have been declared. While there's a ton we can get done with regular bindings, it can sometimes be helpful to change the data already associated with a name. This is accomplished with what we call "boxes."

## Using Boxes

Take a look at the following example:

```grain
let b = box("foo")

print(^b) # "foo"

b := "bar"

print(^b) # "bar"
```

A couple things to note from this example:

1. We use the built-in `box` function to create a box.
1. We use a caret (`^`) to retrieve a value from a box. We call this "unboxing."
1. We use `:=` to update the value in a box.

## Immutability of Boxes

Just like any other binding in Grain, boxes are immutable. The box itself cannot be swapped out for another box (or anything else for that matter). However, the _contents_ of boxes can be changed.

## Working with Boxed Numbers

Boxes are commonly used with numbers, so Grain ships with some operators to make working with boxed numbers easier. Grain provides `+=`, `-=`, `*=`, and `/=`.

```grain
let count = box(7)

count += 9
count -= 6
count *= 5
count /= 25

print(^count) # 2
```
