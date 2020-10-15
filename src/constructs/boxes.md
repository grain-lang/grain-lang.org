---
title: Boxes
---

## `box` and `unbox`

Boxes can be used for adding a mutable property to an immutable data structure, like a tuple or a list. `let mut` should be preferred when creating mutable value bindings.

## Syntax

```grain
let name1 = box(value1)
unbox(name1)
^name1
name1 := newValue
```

### Parameters

`name1`
Name to be used for the box binding.

`value1`
Any valid Grain expression.

## Description

* `box` allows you to create a reference to a value.
* `unbox` allows you to access the value inside a box.
* `^` is an alias for `unbox`.
* `:=` allows you to assign a reference to a new value inside the box.

## Using Boxes

Take a look at the following example:

```grain
let b = box("foo")

print(^b) // "foo"

b := "bar"

print(^b) // "bar"
```

A couple things to note from this example:

1. We use the built-in `box` function to create a box.
1. We use a caret (`^`) to retrieve a value from a box. We call this "unboxing."
1. We use `:=` to update the value in a box.

## Immutability of Boxes

With `let` bindings in Grain, boxes are immutable. The box itself cannot be swapped out for another box (or anything else for that matter). However, the _contents_ of boxes can be changed.
