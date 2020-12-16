---
title: Sys/Time
---

This module provides access to system clocks.

```grain
import Time from "sys/time"
```

## Values

### Time.**realTime**

```grain
realTime : () -> Int64
```

Get the current time, in nanoseconds.
Time value 0 corresponds with 1970-01-01T00:00:00Z.

### Time.**monotonicTime**

```grain
monotonicTime : () -> Int64
```

Get the time of the system's high-resolution clock, in nanoseconds.
This system clock cannot be adjusted and cannot have negative time jumps.
The epoch of this clock is undefined, and thus time value 0 is meaningless.
Useful for calculation of precise time intervals.

### Time.**processCpuTime**

```grain
processCpuTime : () -> Int64
```

Get the number of nanoseconds elapsed since the process began.

### Time.**threadCpuTime**

```grain
threadCpuTime : () -> Int64
```

Get the number of nanoseconds elapsed since the thread began.
