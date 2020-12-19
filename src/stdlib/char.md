---
title: Char
---

Utilities for working with characters. A Grain `Char` represents a single [Unicode scalar value](http://www.unicode.org/glossary/#unicode_scalar_value).

```grain
import Char from "char"
```

## Values

### Char.**min**

```grain
min : Number
```

The minimum Unicode scalar value.

### Char.**max**

```grain
max : Number
```

The maximum Unicode scalar value.

### Char.**isValid**

```grain
isValid : Number -> Bool
```

Returns true if the given number is a valid Unicode scalar value.

### Char.**code**

```grain
code : Char -> Number
```

Returns the integer value of the Unicode code point for the character.

### Char.**fromCode**

```grain
fromCode : Number -> Char
```

Returns the Char for the given Unicode code point. Fails if the code point is invalid.

### Char.**succ**

```grain
succ : Char -> Char
```

Returns the next valid Unicode character by scalar value. Fails if the input character is U+10FFFF.

### Char.**pred**

```grain
pred : Char -> Char
```

Returns the previous valid Unicode character by scalar value. Fails if the input character is U+0000.

### Char.**toString**

```grain
toString : Char -> String
```

Creates a new string containing the character.
