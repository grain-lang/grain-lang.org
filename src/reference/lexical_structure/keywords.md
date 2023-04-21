---
title: Keywords
---

Languages typically classify keywords in three categories—strict, soft, and reserved.

## Strict keywords

Strict keywords can only be used where specified by the language and can never be used as identifiers. In Grain, these keywords are:

```ebnf
keyword =
  | "assert"
  | "break"
  | "continue"
  | "else"
  | "enum"
  | "except"
  | "exception"
  | "export"
  | "fail"
  | "false"
  | "for"
  | "foreign"
  | "from"
  | "if"
  | "import"
  | "let"
  | "match"
  | "mut"
  | "primitive"
  | "rec"
  | "record"
  | "throw"
  | "true"
  | "type"
  | "void"
  | "wasm"
  | "when"
  | "while"
;
```

## Soft keywords

Soft keywords are sometimes allowed be used as an identifier, depending on the context.

Grain currently has no soft keywords.

## Reserved keywords

Reserved keywords are keywords that are not yet used by the language, but are disallowed as identifiers to allow programs to continue to be compatible with future versions of `grainc`.

The reserved keywords are as follows:

```ebnf
reserved_keyword =
  | "try"
  | "catch"
;
```
