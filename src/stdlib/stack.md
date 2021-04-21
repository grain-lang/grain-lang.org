---
title: Stack
---

An immutable stack implementation. A stack is a LIFO (last-in-first-out) data structure where new values are added, retrieved, and removed from the end.

## Values

### Stack.**make**

```grain
make : () -> Stack<a>
```

Creates a new stack.

### Stack.**isEmpty**

```grain
isEmpty : Stack<a> -> Bool
```

Checks if the given stack contains no items.

### Stack.**head**

```grain
head : Stack<a> -> Option<a>
```

Returns `Some(item)` where `item` is the value at the top of the stack, and `None` otherwise.

### Stack.**push**

```grain
push : (a, Stack<a>) -> Stack<a>
```

Adds a new item to the top of the stack.

### Stack.**pop**

```grain
pop : Stack<a> -> Stack<a>
```

Removes the item at the top of the stack.
