---
title: Pattern Matching
---

Pattern matching allows you to express code paths for all of the possible shapes of a piece of data.

## Pattern Types

Pattern matching can be done on any type of value. This section breaks down each `match` type.

### Any Value

An underscore character, `_`, represents a pattern that matches any value.

```grain
match (value) {
  _ => print("A match on any value")
}
```

This single case will always be executed, regardless of the shape of the input value.

Similarly, a lowercase identifier also matches any value, and creates a binding.

```grain
match ("foo") {
  str => print(str ++ " bar")
}
```

### Enums



### Records

### Tuples

### Lists

### Arrays

### Constants

## Exhaustiveness Checks

## Nested Patterns

## Pattern Bindings

### Enums

### Records

## Branch Guards

## Constant Patterns