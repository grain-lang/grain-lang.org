---
title: Hash
---

Utilities for hashing.

```grain
import Hash from 'hash'
```

## Values

### Hash.**hash**

```grain
hash : a -> Number
```

Generic hashing.

Takes any value and produces an integer. If `a == b` then `Hash.hash(a) == Hash.hash(b)`.
