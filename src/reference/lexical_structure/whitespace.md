---
title: Whitespace
---

Spaces (`' '`), tabs (`'\t'`), carriage returns (`'\r'`), and line feeds (`'\n'`) are all considered whitespace.

## Spaces & tabs

Spaces and tabs serve no purpose other than separating tokens and otherwise have no meaning in a Grain program. They can be used interchangably and come in any amount.

## Carriage returns & line feeds

Lines in a program are delimited by a single line feed, `'\n'` (as commonly found on Unix-like systems), or by a carriage return followed by a line feed, `'\r\n'` (as commonly found on Windows systems). The lexer will accept both line ending types appearing in the same file, though mixing line endings is generally not recommended.

Line breaks have significant meaning in Grain (e.g. ending a statement), so a `NEWLINE` token is produced when the lexer encounters a line ending.
