---
title: String
---

Utilities for working with strings.

```grain
import String from "string"
```

## Values

### String.**concat**

```grain
concat : (String, String) -> String
```

Concatenate two strings.

### String.**length**

```grain
length : String -> Number
```

Computes the character length of the input string.

### String.**byteLength**

```grain
byteLength : String -> Number
```

Returns the byte length of the input string.

### String.**indexOf**

```grain
indexOf : (String, String) -> Option<Number>
```

Finds the start index of a substring.

Parameters:

- *sub:* The substring to find
- *input:* The string to check

### String.**explode**

```grain
explode : String -> Array<Char>
```

Split a string into its Unicode characters.

### String.**implode**

```grain
implode : Array<Char> -> String
```

Create a string from an array of characters.

### String.**slice**

```grain
slice : (Number, Number, String) -> String
```

Get a substring of the input string starting at `from` up to (but not including) `to`.

Parameters:

- *from:* The index where the substring should begin
- *to:* The index where the substring should end (not including the character at `to`)
- *input:* The input string

Returns the substring. If `from` or `to` is negative, it is treated as an offset from the end of the input string, i.e. the index plus the length of the string.

### String.**contains**

```grain
contains : (String, String) -> Bool
```

Check if a string contains a substring.

Parameters:

- *substring:* The substring to find
- *input:* The input string

### String.**startsWith**

```grain
startsWith : (String, String) -> Bool
```

Check if a string begins with another string.

Parameters:

- *substring:* The substring to match at the beginning of the input string
- *input:* The input string

### String.**endsWith**

```grain
endsWith : (String, String) -> Bool
```

Check if a string ends with another string.

Parameters:

- *substring:* The substring to match at the end of the input string
- *input:* The input string

### String.**Encoding**

```grain
enum Encoding {
  UTF8,       // UTF-8
  UTF16_BE,   // UTF-16, big-endian
  UTF16_LE,   // UTF-16, little-endian
  UTF32_BE,   // UTF-32, big-endian
  UTF32_LE,   // UTF-32, little-endian
}
```

The various string encodings supported by [`String.encode`](#String-encode), [`String.decode`](#String-decode), and their associated variants.

### String.**encode**

```grain
encode = (String, Encoding) -> Bytes
```

Encodes the given string using the given encoding scheme. A byte-order marker will not be included in the output.

Parameters:

- *s:* The input string
- *encoding:* The encoding to use


### String.**encodeWithBom**

```grain
encodeWithBom = (String, Encoding) -> Bytes
```

Encodes the given string using the given encoding scheme. A byte-order marker will be included in the output.

Parameters:

- *s:* The input string
- *encoding:* The encoding to use

### String.**encodeAt**

```grain
encodeAt = (String, Encoding, Bytes, Number) -> Bytes
```

Encodes the given string using the given encoding scheme, writing the result into the given byte array. A byte-order marker will not be included in the output. The given `Bytes` object is returned.

Parameters:

- *s:* The input string
- *encoding:* The encoding to use
- *dest:* The bytes object to write the encoded output into
- *destPos:* The location in the byte array to write the output


### String.**encodeAtWithBom**

```grain
encodeAtWithBom = (String, Encoding, Bytes, Number) -> Bytes
```

Encodes the given string using the given encoding scheme, writing the result into the given byte array. A byte-order marker will be included in the output. The given `Bytes` object is returned.

Parameters:

- *s:* The input string
- *encoding:* The encoding to use
- *dest:* The bytes object to write the encoded output into
- *destPos:* The location in the byte array to write the output


### String.**decode**

```grain
decode = (Bytes, Encoding) -> String
```

Decodes the given byte sequence into a string using the given encoding scheme, skipping the byte-order marker, if it's present.

Parameters:

- *bytes:* The input bytes
- *encoding:* The encoding to use


### String.**decodeKeepBom**

```grain
decodeKeepBom = (Bytes, Encoding) -> String
```

Decodes the given byte sequence into a string using the given encoding scheme, including the byte-order marker, if it's present

Parameters:

- *bytes:* The input bytes
- *encoding:* The encoding to use


### String.**decodeRange**

```grain
decode = (Bytes, Encoding, Number, Number) -> String
```

Decodes the given byte sub-sequence into a string using the given encoding scheme, skipping the byte-order marker, if it's present.

Parameters:

- *bytes:* The input bytes
- *encoding:* The encoding to use
- *start:* The byte offset to begin decoding from
- *size:* The maximum number of bytes to decode


### String.**decodeRangeKeepBom**

```grain
decodeRangeKeepBom = (Bytes, Encoding, Number, Number) -> String
```

Decodes the given byte sub-sequence into a string using the given encoding scheme, including the byte-order marker, if it's present

Parameters:

- *bytes:* The input bytes
- *encoding:* The encoding to use
- *start:* The byte offset to begin decoding from
- *size:* The maximum number of bytes to decode