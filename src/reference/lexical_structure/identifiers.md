---
title: Identifiers
---

There are two kinds of identifiers in Grain—those that begin with an uppercase letter, and those that do not.

## Uppercase identifiers

Identifers that start with an uppercase letter are used for the names of modules and concrete types. We call these tokens `UIDENT`s (**U**ppercase **Ident**ifiers).

```ebnf
UIDENT = ['A'-'Z']['A'-'Z' 'a-z' '0'-'9' '_']* ;
```

A `UIDENT` starts with an uppercase letter A through Z, followed by any number of:

- Uppercase letters A through Z
- Lowercase letters a through z
- Digits 0 through 9
- Underscores

## Lowercase identifiers

Identifers that don't start with an uppercase letter are used for the names of new bindings, record fields, type variables, and more. We call these tokens `LIDENT`s (**L**owercase **Ident**ifiers) though it should be noted that `LIDENT`s may also start with underscores.

```ebnf
LIDENT = ['a-z' '_']['A'-'Z' 'a-z' '0'-'9' '_']* ;
```

An `LIDENT` starts with an underscore or a lowercase letter a through z, followed by any number of:

- Uppercase letters A through Z
- Lowercase letters a through z
- Digits 0 through 9
- Underscores
