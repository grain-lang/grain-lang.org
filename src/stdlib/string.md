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
