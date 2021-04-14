---
title: Option
---

Utilities for working with the Option data type.

The `Option` type is a special type of enum that exists to represent the possibility of something being present (with the `Some` variant), or not (with the `None` variant). There's no standalone `null` or `none` type in Grain; use an `Option` where you would normally reach for `null` or `none`. 

```grain
import Option from "option"
```

## Values

### Option.**isSome**

```grain
isSome : Option<a> -> Bool
```

Checks if the Option is the `Some` variant.

### Option.**isNone**

```grain
isNone : Option<a> -> Bool
```

Checks if the Option is the `None` variant.

### Option.**contains**

```grain
contains : (a, Option<a>) -> Bool
```

Checks if the Option is the `Some` variant and contains the given value. Uses the generic `==` equality operator.

### Option.**expect**

```grain
expect : (String, Option<a>) -> a
```

Attempts to unwrap the inner value from the `Some` variant. If it is `None`, raises `Failure` with the provided message.

### Option.**unwrap**

```grain
unwrap : Option<a> -> a
```

Attempts to unwrap the inner value from the `Some` variant. If it is `None`, raises `Failure` with a generic message.

### Option.**unwrapWithDefault**

```grain
unwrapWithDefault : (a, Option<a>) -> a
```

Unwraps the inner value from the `Some` variant. If it is `None`, returns the default value provided.

### Option.**map**

```grain
map : (a -> b, Option<a>) -> Option<b>
```

If the Option is the `Some` variant, call `fn` with the inner value and returns a new `Some` variant with the produced value.

### Option.**mapWithDefault**

```grain
mapWithDefault : (a -> b, b, Option<a>) -> b
```

If the Option is the `Some` variant, call `fn` with the inner value and returns the result. If it is `None`, returns the default value provided.

### Option.**mapWithDefaultFn**

```grain
mapWithDefaultFn : (a -> b, () -> b, Option<a>) -> b
```

If the Option is the `Some` variant, call `fn` with the inner value and returns the result. If it is `None`, returns the result of the default function provided.

### Option.**flatMap**

```grain
flatMap : (a -> Option<b>, Option<a>) -> Option<b>
```

If the Option is the `Some` variant, call `fn` with the inner value. The `fn` must produce its own Option to be returned.

### Option.**filter**

```grain
filter : (a -> Bool, Option<a>) -> Option<a>
```

If the Option is the `Some` variant, call `fn` with the inner value. If the `fn` returns `false`, returns a `None` variant type.

### Option.**zip**

```grain
zip : (Option<a>, Option<b>) -> Option<(a, b)>
```

If both Options are the `Some` variant, returns a new `Some` variant that contains a tuple of both values. If any of the Options are `None`, returns `None`.

### Option.**zipWith**

```grain
zipWith : ((a, b) -> c, Option<a>, Option<b>) -> Option<c>
```

If both Options are the `Some` variant, call `fn` with both inner values and returns a new `Some` variant with the produced value. If any of the Options are `None`, returns `None`.

### Option.**flatten**

```grain
flatten : Option<Option<a>> -> Option<a>
```

Flattens nested Options, like `Some(Some(1))` to `Some(1)`. If any of the Options are `None`, returns `None`.

### Option.**toList**

```grain
toList : Option<a> -> List<a>
```

If the Option is the `Some` variant, returns a `List` containing the inner value as the only item. If it is `None`, returns an empty `List`.

### Option.**toArray**

```grain
toArray : Option<a> -> Array<a>
```

If the Option is the `Some` variant, returns an `Array` containing the inner value as the only item. If it is `None`, returns an empty `Array`.

### Option.**toResult**

```grain
toResult : (b, Option<a>) -> Result<a, b>
```

If the Option is the `Some(a)`, returns `Ok(a)`. If it is `None`, returns an `Err` of the provided error value.

### Option.**sideEffect**

```grain
sideEffect : (a -> Void, Option<a>) -> Void
```

If the Option is the `Some` variant, call `fn` with the inner value. Always returns `void`.

### Option.**peek**

```grain
peek : (a -> Void, Option<a>) -> Option<a>
```

If the Option is the `Some` variant, call `fn` with the inner value. Always returns the Option it is called with; this method is a "chainable" `Option.sideEffect`.

### Option.**and**

```grain
and : (Option<a>, Option<a>) -> Option<a>
```

If the first Option is the `Some` variant, returns the second Option. Returns `None` otherwise.

### Option.**or**

```grain
or : (Option<a>, Option<a>) -> Option<a>
```

Returns the first Option if it is the `Some` variant. Returns the second Option otherwise.
