---
title: Sys/Random
---

This module provides system access to random values.

```grain
import Random from 'sys/random'
```

## Values

### Random.**random**

```grain
random : () -> Number
```

Produce a random number. This function can be slow, so it's best to seed a generator if lots of random data is needed.
