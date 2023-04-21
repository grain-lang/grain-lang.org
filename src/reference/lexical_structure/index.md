---
title: Lexical Structure
---

## Encoding

A Grain program is a UTF-8 encoded list of Unicode code points.

## Lexical analysis

Before being parsed, the input program is run through a lexical analyzer, or "lexer" for short. The job of the lexer is to convert the input program into a stream of tokens. Although this process is done to make parsing much easier, these tokens are also a great way for humans to think about the structure of a program. The remaining pages in this section explain how the lexer breaks up the input into tokens for identifiers, keywords, and more.
