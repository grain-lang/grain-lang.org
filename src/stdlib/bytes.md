---
title: Bytes
---

This module provides utilities for working with the `Bytes` type.

```grain
import Bytes from "bytes"
```

## Values

### Bytes.**setInt8**

```grain
setInt8: (Number, Int32, Bytes) -> Void
```

Sets a signed 8-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *value:* `Int32` - The value to set
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt8S**

```grain
getInt8S: (Number, Bytes) -> Int32
```

Gets a signed 8-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt8U**

```grain
getInt8U: (Number, Bytes) -> Int32
```

Gets an unsigned 8-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**setInt16**

```grain
setInt16: (Number, Int32, Bytes) -> Void
```

Sets a signed 16-bit integer starting at the given byte index.

Parameters:

 - *index:* `Number` - The byte index
 - *value:* `Int32` - The value to set
 - *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt16S**

```grain
getInt16S: (Number, Bytes) -> Int32
```

Gets a signed 16-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt16U**

```grain
getInt16U: (Number, Bytes) -> Int32
```

Gets an unsigned 16-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**setInt32**

```grain
setInt32: (Number, Int32, Bytes) -> Void
```

Sets a signed 32-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *value:* `Int32` - The value to set
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt32**

```grain
getInt32: (Number, Bytes) -> Int32
```

Gets a signed 32-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**setFloat32**

```grain
setFloat32: (Number, Float32, Bytes) -> Void
```

Sets a 32-bit float starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *value:* `Float32` - The value to set
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getFloat32**

```grain
getFloat32: (Number, Bytes) -> Float32
```

Gets a signed 32-bit float starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**setInt64**

```grain
setInt64: (Number, Int64, Bytes) -> Void
```

Sets a signed 64-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *value:* `Int64` - The value to set
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getInt64**

```grain
getInt64: (Number, Bytes) -> Int64
```

Gets a signed 64-bit integer starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**setFloat64**

```grain
setFloat64: (Number, Float64, Bytes) -> Void
```

Sets a 64-bit float starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *value:* `Float64` - The value to set
- *bytes:* `Bytes` - The byte sequence

### Bytes.**getFloat64**

```grain
getFloat64: (Number, Bytes) -> Float64
```

Gets a signed 64-bit float starting at the given byte index.

Parameters:

- *index:* `Number` - The byte index
- *bytes:* `Bytes` - The byte sequence

### Bytes.**copy**

```grain
copy: (Bytes) -> Bytes
```

Return a new Bytes sequence that contains the same bytes as the argument.

Parameters:

- *bytes:* `Bytes` - The byte sequence to copy

### Bytes.**slice**

```grain
slice: (Number, Number, Bytes) -> Bytes
```

Returns a new Bytes sequence containing a subset of the original Bytes sequence.

Parameters:

- *index:* `Number` - The start position to copy from
- *len:* `Number` - The number of bytes to copy
- *bytes:* `Bytes` - The byte sequence get a subset of bytes from

### Bytes.**bytes**

```grain
resize: (Number, Number, Bytes) -> Bytes
```

Add or remove bytes from the start and/or end of a byte sequence. A positive number represents bytes to add, while a negative number represents bytes to remove.appended.

Parameters:

- *left:* `Number` - The number of uninitialized bytes to prepend
- *right:* `Number` - The number of uninitialized bytes to append
- *bytes:* `Bytes` - The byte sequence get a subset of bytes from

### Bytes.**move**

```grain
move: (Number, Number, Number, Bytes, Bytes) -> Void
```

Copies a range of bytes from a source sequence to a given location in a destination sequence.

Parameters:

- *srcPos:* `Number` - The starting byte index to copy bytes from
- *dstPos:* `Number` - The starting byte index to copy bytes into
- *len:* `Number` - The amount of bytes to copy from the source sequence
- *src:* `Bytes` - The source sequence
- *dst:* `Bytes` - The destination sequence

### Bytes.**length**

```grain
length: (Bytes) -> Number
```

Get the byte length of a Bytes sequence.

Parameters:

- *bytes:* `Bytes` - The byte sequence to check

### Bytes.**append**

```grain
append: (Bytes, Bytes) -> Bytes
```

Creates a new Bytes sequence that contains the bytes of both buffers a and b.

Parameters:

- *first:* `Bytes` - The sequence to be copied first
- *second:* `Bytes` - The sequence to be copied last

### Bytes.**toString**

```grain
toString: (Bytes) -> String
```

Creates a new String from a Bytes sequence.

Parameters:

- *bytes:* `Bytes` - The source sequence

### Bytes.**fromString**

```grain
fromString: (String) -> Bytes
```

Creates a new byte sequence from a String.

Parameters:

- *str:* `String` - The String to copy into a byte sequence

### Bytes.**fill**

```grain
fill: (Int32, Bytes) -> Void
```

Fills a byte sequence with a given value.

Parameters:

- *value:* `Int32` - The value to fill the byte sequence with
- *bytes:* `Bytes` - The byte sequence to fill

### Bytes.**make**

```grain
make: (Number) -> Bytes
```

Make a new Bytes sequence of n-bytes size.

Parameters:

- *n:* `Number` - The number of bytes to store

### Bytes.**empty**

```grain
empty: Bytes
```

An empty Bytes sequence.
