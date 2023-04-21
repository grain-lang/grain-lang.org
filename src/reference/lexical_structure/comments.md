---
title: Comments
---

Comments are completely ignored by the lexer. It's worth noting that comments act as token separators in the same way that whitespace does—`a/**/b` will produce two tokens, `a` and `b`.

Each comment type accepted by the lexer is described below.

## Documentation comments

```ebnf
doc_comment = '/**' .* '*/' ;
```

Documentation comments begin with `/**` and end with `*/`. Everything between the start and end characters is considered the the body of the comment.

### Examples

```grain
/** single line documentation comment */
```

```grain
/** multiple
line
documentation
comment
*/
```

## Block comments

```ebnf
block_comment = '/*' .* '*/' ;
```

Block comments begin with `/*` and end with `*/`. Everything between the start and end characters is considered the the body of the comment.

### Examples

```grain
/* single line block comment */
```

```grain
/* multiple
line
documentation
comment
*/
```

## Line comments

```ebnf
line_comment = '//' .* NEWLINE ;
```

Line comments begin with `//` and are terminated by a `NEWLINE`. Everything that appears after the `//` and before the end of the line is considered the body of the comment.

### Examples

```grain
// single line line comment
```

## Shebangs

```ebnf
shebang = '#!' .* NEWLINE ;
```

Shebangs, also known as hashbangs, begin with `#!` and are terminated by a `NEWLINE`. Everything that appears after the `#!` and before the end of the line is considered the body of the comment. The lexer allows shebangs to appear anywhere in the input, not just the first line.

### Examples

```grain
#! /usr/bin/grain
```
