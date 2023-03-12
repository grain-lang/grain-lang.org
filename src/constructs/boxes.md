---
title: Boxes
---

## `box` and `unbox`

Boxes can be used for adding a mutable property to an immutable data structure, like a tuple or a list. `let mut` should be preferred when creating mutable value bindings.

## Syntax

```grain
module Main

let name1 = box([1, 2, 3])
print(name1) // box([1, 2, 3])
unbox(name1) // [1, 2, 3]
name1 := [2, 3, 4]
print(name1) // box([2, 3, 4])

```

### Parameters

`name1`
Name to be used for the box binding.

`value1`
Any valid Grain expression.

## Description

* `box` allows you to create a reference to a value.
* `unbox` allows you to access the value inside a box.
* `:=` allows you to assign a reference to a new value inside the box.

## Using Boxes

Take a look at the following example:

```grain
module Main

let b = box("foo")

print(unbox(b)) // "foo"

b := "bar"

print(unbox(b)) // "bar"
```

A couple things to note from this example:

1. We use the built-in `box` function to create a box.
1. We use `unbox` to retrieve a value from a box. This is commonly called "unboxing."
1. We use `:=` to update the value in a box.

## Immutability of Boxes

With `let` bindings in Grain, boxes are immutable. The box itself cannot be swapped out for another box (or anything else for that matter). However, the _contents_ of boxes can be changed.
