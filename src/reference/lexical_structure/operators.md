---
title: Operators
---

The following tokens are considered operators.

```ebnf
OPERATOR =
  | "..."
  | "."
  | "::"
  | ":"
  | ":="
  | "=="
  | "="
  | "^"
  | "<"
  | "<<"
  | ">"
  | "<="
  | ">="
  | "++"
  | "+"
  | "-"
  | "*"
  | "/"
  | "%"
  | "&"
  | "&&"
  | "|"
  | "||"
  | "!"
  | "is"
  | "isnt" ;
```

It's worth noting that `>>` and `>>>` are also considered operators, but due to an ambiguity when writing a nested type like `List<Option<a>>`, the `>>` and `>>>` operators are composed of multiple `>` tokens.
