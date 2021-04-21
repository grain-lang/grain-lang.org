---
title: Range
---

Utilities for working with ranges. A range represents an interval, or a set of values with a beginning and an end.

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

Ranges can be inclusive or exclusive. When `Inclusive`, the end value will be included in operations. When `Exclusive`, the end value will be excluded from operations.

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

Calls the given function with each number in the range. For increasing ranges, the value is increased by `1` in each iteration, and for decreasing ranges, the value is decreased by `1`. The value is always changed by `1`, even if non-integer values were provided in the range.
