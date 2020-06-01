---
title: String
---

Utilities for working with strings.

```grain
import String from 'strings'
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

### String.**slice**

```grain
slice : (String, Number, Number) -> String
```

Get a substring of the input string starting at `from` up to (but not including) `to`.

Parameters:

- *input:* The input string
- *from:* The index where the substring should begin
- *to:* The index where the substring should end (not including the character at `to`)

Returns the substring. If `from` or `to` is negative, it is treated as an offset from the end of the input string, i.e. the index plus the length of the string.

### String.**contains**

```grain
contains : (String, String) -> Bool
```

Check if a string contains a substring.

Parameters:

- *input:* The input string
- *substring:* The substring to find

### String.**startsWith**

```grain
startsWith : (String, String) -> Bool
```

Check if a string begins with another string.

Parameters:

- *input:* The input string
- *substring:* The substring to match at the beginning of the input string

### String.**endsWith**

```grain
endsWith : (String, String) -> Bool
```

Check if a string ends with another string.

Parameters:

- *input:* The input string
- *substring:* The substring to match at the end of the input string
