---
title: Result
---

Utilities for working with the Result data type.

```grain
import Result from 'result'
```

## Values

### Result.**isOk**

```grain
isOk : Result<t, e> -> Bool
```

Checks if the Result is the `Ok` variant.

### Result.**isErr**

```grain
isErr : Result<t, e> -> Bool
```

Checks if the Result is the `Err` variant.

### Result.**toOption**

```grain
toOption : Result<t, e> -> Option(t)
```

Converts the Result to an Option. The error is discarded and replaced with `None`.

### Result.**flatMap**

```grain
flatMap : (t -> Result<t, e>, Result<t, e>) -> Result<t, e>
```

If the Result is `Ok`, applies the given function to the `Ok` value and returns the result. Returns the unmodified `Err` otherwise.

### Result.**flatMapErr**

```grain
flatMapErr : (e -> Result<t, e>, Result<t, e>) -> Result<t, e>
```

If the Result is an `Err`, applies the given function to the `Err` value and returns the result. Returns the unmodified `Ok` value otherwise.

### Result.**map**

```grain
map : (t -> u, Result<t, e>) -> Result<u, e>
```

If the Result is `Ok(x)`, returns `Ok(fn(x))`. Returns the unmodified `Err` otherwise.

### Result.**mapErr**

```grain
mapErr : (e -> Result<t, e>, Result<t, e>) -> Result<t, e>
```

If the Result is `Err(x)`, returns `Err(fn(x))`. Returns the unmodified `Ok` value otherwise.

### Result.**mapWithDefault**

```grain
mapWithDefault : (t -> u, u, Result<t, e>) -> u
```

If the Result is `Ok(x)`, returns `fn(x)`. Returns the provided default otherwise.

### Result.**mapWithDefaultFn**

```grain
mapWithDefaultFn : (t -> u, e -> u, Result<t, e>) -> u
```

If the Result is `Ok(x)`, returns `fnOk(x)`. If the Result is `Err(y)`, returns `fn(Err(y))`.

### Result.**or**

```grain
or : (Result<t, e>, Result<t, e>) -> Result<t, e>
```

If the first Result is `Ok`, returns the first Result. Returns the second Result otherwise.

### Result.**and**

```grain
and : (Result<t, e>, Result<t, e>) -> Result<t, e>
```

If the first Result is `Err`, returns the first Result. Returns the second Result otherwise.

### Result.**peek**

```grain
peek : (t -> a, e -> b, Result<t, e>) -> Void
```

If the Result is `Ok(x)`, applies the first function to `x`. If the Result is `Err(y)`, applies the second function to `y`.

### Result.**peekOk**

```grain
peekOk : (t -> a, Result<t, e>) -> Void
```

If the Result is `Ok(x)`, applies the function to `x`.

### Result.**peekErr**

```grain
peekErr : (e -> b, Result<t, e>) -> Void
```

If the Result is `Err(y)`, applies the function to `y`.
