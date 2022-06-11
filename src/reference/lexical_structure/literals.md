---
title: Literals
---

Literals are single tokens that represent constant values of built-in Grain types.

## Strings

```ebnf
STRING = '"' character* '"' ;

character =
  | ascii_escape
  | unicode_escape
  | unicode_character ;

ascii_escape =
  | "\" oct_digit oct_digit? oct_digit?
  | "\x" hex_digit hex_digit?
  | "\" ['b' 'f' 'n' 'r' 't' 'v' '"' '\'] ;

unicode_escape =
  | "\u" hex_digit hex_digit hex_digit hex_digit
  | "\u{" hex_digit hex_digit? hex_digit? hex_digit? hex_digit? hex_digit? "}" ;

unicode_character = <any valid unicode character> ;

oct_digit = ['0'-'7'] ;
hex_digit = ['0'-'9' 'A'-'F' 'a'-'f'] ;
```

A string is a sequence of characters and/or escape sequences surrounded by double quotation marks.

Ascii escapes can be written in octal, as a backslash (`\`) followed by 1-3 octal digits. They can also be written in hexadecimal, as a blackslash and `x` followed by 1-2 hexadecimal digits. There are also a number of character-specific escapes available.

| escape | value                                 |
| ------ | ------------------------------------- |
| `\123` | An octal escape with 1-3 octal digits |
| `\x4f` | A hex escape with 1-2 hex digits      |
| `\b`   | Backspace                             |
| `\f`   | Form feed                             |
| `\n`   | Line feed (newline)                   |
| `\r`   | Carriage return                       |
| `\t`   | Tab                                   |
| `\v`   | Vertical tab                          |
| `\"`   | Double quote                          |
| `\\`   | Backslash                             |

Unicode escapes can be written in a fixed-width form with exactly four hexadecimal digits, or a variable form in brackets with 1-6 digits.

| escape      | value                                                 |
| ----------- | ----------------------------------------------------- |
| `\u200D`    | A unicode escape with exactly four hexadecimal digits |
| `\u{1F926}` | A unicode escape with 1-6 hexadecimal digits          |

Additionally, if a line in a string ends in backslash `\` character followed by a newline, the newline and backslash are ignored. This allows very long strings be be split over multiple lines:

```grain
"The quick \
brown fox \
jumps over the \
lazy dog."
```

### Examples

```grain
"Hello, world!"
```

```grain
"inner \"quote\""
```

```grain
"with unicode 💯🔥🌾"
```

```grain
"\u{1F926}\u{1F3FC}\u{200D}\u{2642}\u{FE0F}" // 🤦🏼‍♂️
```

## Chars

```ebnf
CHAR = "'" character "'" ;

character =
  | ascii_escape
  | unicode_escape
  | unicode_character ;

ascii_escape =
  | "\" oct_digit oct_digit? oct_digit?
  | "\x" hex_digit hex_digit?
  | "\" ['b' 'f' 'n' 'r' 't' 'v' "'" '\'] ;

unicode_escape =
  | "\u" hex_digit hex_digit hex_digit hex_digit
  | "\u{" hex_digit hex_digit? hex_digit? hex_digit? hex_digit? hex_digit? "}" ;

unicode_character = <any valid unicode character> ;

oct_digit = ['0'-'7'] ;
hex_digit = ['0'-'9' 'A'-'F' 'a'-'f'] ;
```

A char is a single character or escape sequence surrounded by single quotation marks.

Ascii escapes can be written in octal, as a backslash (`\`) followed by 1-3 octal digits. They can also be written in hexadecimal, as a blackslash and `x` followed by 1-2 hexadecimal digits. There are also a number of character-specific escapes available.

| escape | value                                 |
| ------ | ------------------------------------- |
| `\123` | An octal escape with 1-3 octal digits |
| `\x4f` | A hex escape with 1-2 hex digits      |
| `\b`   | Backspace                             |
| `\f`   | Form feed                             |
| `\n`   | Line feed (newline)                   |
| `\r`   | Carriage return                       |
| `\t`   | Tab                                   |
| `\v`   | Vertical tab                          |
| `\'`   | Single quote                          |
| `\\`   | Backslash                             |

Unicode escapes can be written in a fixed-width form with exactly four hexadecimal digits, or a variable form in brackets with 1-6 digits.

| escape      | value                                                 |
| ----------- | ----------------------------------------------------- |
| `\u200D`    | A unicode escape with exactly four hexadecimal digits |
| `\u{1F926}` | A unicode escape with 1-6 hexadecimal digits          |

### Examples

```grain
'H'
```

```grain
'\''
```

```grain
'🌾'
```

```grain
'\u{1F926}'
```

## Numerics

The lexer recognizes numerics of the `Number`, `BigInt`, `Int32`, `Int64`, `Float32`, `Float64`, `WasmI32`, `WasmI64`, `WasmF32`, and `WasmF64` types.

### Integers

```ebnf
INTEGER = "-"? (binary | octal | decimal | hexadecimal) int_suffix? ;

decimal = dec_digit (dec_digit | "_")* ;
binary = "0" ['b' 'B'] bin_digit (bin_digit | "_")* ;
octal = "0" ['o' 'O'] oct_digit (oct_digit | "_")* ;
hexadecimal = "0" ['x' 'X'] hex_digit (hex_digit | "_")* ;

dec_digit = ['0'-'9'] ;
bin_digit = ['0'-'1'] ;
oct_digit = ['0'-'7'] ;
hex_digit = ['0'-'9' 'A'-'F' 'a'-'f'] ;

int_suffix = ['t', 'l' 'L' 'n' 'N'] ;
```

Integers can be written in decimal (base 10), binary (base 2), octal (base 8), or hexadecimal (base 16). An integer written without a prefix is considered to be a decimal integer, while an `0b` or `0B` prefix denotes a binary integer, `0o` or `0O` denotes an octal integer, and `0x` or `0X` denotes a hexadecimal integer. The numeric part of the integer must start with a digit, but underscores are allowed to appear throughout the numeric portion to help with the readability of the integer and don't affect the value of the integer.

A suffix (or lack of suffix) denotes the Grain type of the integer:

| Suffix | Type      |
| ------ | --------- |
| none   | `Number`  |
| `t`    | `BigInt`  |
| `l`    | `Int32`   |
| `L`    | `Int64`   |
| `n`    | `WasmI32` |
| `N`    | `WasmI64` |

#### Examples

```grain
42
```

```grain
-5
```

```grain
// one billion
1_000_000_000
```

```grain
// 42 in hexadecimal
0x2A // or 0x2a, 0X2A, 0X2a
```

```grain
// 42 in octal
0o52
```

```grain
// 42 in binary
0b101010
```

```grain
// 0xDEC0DE in binary
0b1101_1110_1100_0000_1101_1110
```

```grain
// Int64 literal
65L
```

```grain
// WasmI32 literal
987n
```

### Floats

```ebnf
FLOAT =
  | "-"? dec_digit (dec_digit | "_")* "." (dec_digit | "_")* exponent? float_suffix?
  | "-"? dec_digit (dec_digit | "_")* exponent float_suffix?
  | "-"? "." dec_digit (dec_digit | "_")* exponent? float_suffix? ;

exponent = ['e' 'E'] ['+' '-']? dec_digit (dec_digit | '_')* ;

dec_digit = ['0'-'9'] ;

float_suffix = ['f' 'd' 'w' 'W'] ;
```

A float is distinguished from an integer by the existence of a decimal point or exponent. The numeric parts of a float must start with a digit, but underscores are allowed to appear throughout the numeric portions to help with the readability of the float and don't affect its value.

A suffix (or lack of suffix) denotes the Grain type of the float:

| Suffix | Type      |
| ------ | --------- |
| none   | `Number`  |
| `f`    | `Float32` |
| `d`    | `Float64` |
| `w`    | `WasmF32` |
| `W`    | `WasmF64` |

#### Examples

```grain
1.23 // a floating-point number
```

In the scientific notation form, the significand (the part of a floating-point number that contains the significant digits) is multiplied by 10 raised to the power of the provided exponent. For example,

```grain
1.23e3 // computes as 1.23x10^3, for a value of 1230.
```

The sign of the exponent can also be provided:

```grain
1.23e+3 // 1230
```

```grain
1.23e-3 // 0.00123
```

As with integers, underscores can be placed throughout the number to make it more readable:

```grain
1_000.555_5e2
```

### Rationals

```ebnf
RATIONAL = integer '/' integer ;

integer = "-"? (binary | octal | decimal | hexadecimal) ;

decimal = dec_digit (dec_digit | "_")* ;
binary = "0" ['b' 'B'] bin_digit (bin_digit | "_")* ;
octal = "0" ['o' 'O'] oct_digit (oct_digit | "_")* ;
hexadecimal = "0" ['x' 'X'] hex_digit (hex_digit | "_")* ;

dec_digit = ['0'-'9'] ;
bin_digit = ['0'-'1'] ;
oct_digit = ['0'-'7'] ;
hex_digit = ['0'-'9' 'A'-'F' 'a'-'f'] ;
```

A rational literal is an integer numerator and an integer denominator separated by a slash (`/`). Like integers and floats, underscores may be placed throughout.

#### Examples

```grain
1/3
```

```grain
-5/7
```

```grain
14/-0xf
```

```grain
10/1_000_000_000
```

## Booleans

Boolean literals consist of the values `true` and `false`.

```ebnf
TRUE = "true" ;
FALSE = "false" ;
```

### Examples

```grain
true
```

```grain
false
```

## Void

The `void` literal is the only value of the `Void` type.

```ebnf
VOID = "void" ;
```

### Examples

```grain
void
```
