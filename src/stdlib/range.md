---
title: Range
---

Utilities for working with ranges.

```grain
import Range from "range"
```

## Types

Type declarations included in the Range module.

### Range.**Range**

```grain
enum Range {
  Inclusive(Number, Number),
  Exclusive(Number, Number),
}
```

Ranges can be inclusive or exclusive.

## Values

### Range.**inRange**

```grain
inRange : (Number, Range) -> Bool
```

Checks if the given number is within the range.

### Range.**forEach**

```grain
forEach : ((Number -> Void), Range) -> Void
```

Calls the given function with each number in the range.
