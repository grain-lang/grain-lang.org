---
title: Introduction
---

Hey there! This is a reference manual for the Grain programming language. It assumes that you have some general familiarity with the language—it's not meant to teach you how to use Grain or act as a tutorial. If you're looking to learn how to use the language, check out the [guide](/docs).

The reference manual attempts to explain concepts in a way that is approachable for the average reader. It tries to be as complete as possible, though it's difficult to capture every nuance of the language without being too formal. It doesn't dive deeply into the exact specifics of how language concepts are implemented as these are subject to change over time (and may vary between language implementations, though any implementation notes refer to `grainc`).

Information about the standard library is only included if it is relevant to the language itself—to find everything available, check out the full [standard library docs](/docs/stdlib/pervasives)!

## Syntax notation

Throughout the reference, we'll show the syntax of a construct using this notation:

```ebnf
binary_operator =
  | "+"
  | "-"
  | "*"
  | "/"
;

binary_operation = expression binary_operator expression ;

expression = ... ;
```

This is a version of Extended Backus-Naur Form, and you can read more about it [here](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form). In this example, a `binary_operator` is either a plus sign, hyphen, asterisk, or slash, and a `binary_operation` is two `expression`s separated by a `binary_operator`. Each rule is terminated by a semicolon.

### Alternatives

Each alternative in a rule (or subrule) is separated by a pipe (`|`). These alternatives represent a choice between one of the options listed. Subrules may be introduced using parentheses, e.g. `(foo | bar)`.

### Character classes

Alternatives between single characters are represented using brackets. For example, the class `['x' 'y']` represents a single character, `x` or `y`. A `-` is used to denote a range of characters, e.g. `['a'-'z' 'A'-'Z']` represents any capital or lowercase letter.

### Quantifiers

To represent a repeated number of something, we'll use a quantifier.

| quantifier | meaning      | example  |
| ---------- | ------------ | -------- |
| `?`        | zero or one  | `"foo"?` |
| `*`        | zero or more | `"foo"*` |
| `+`        | one or more  | `"foo"+` |

### Tokens

Rules that appear in all caps, like `STRING`, are considered tokens. This section introduces a number of tokens that may be referred to throughout other sections of the language reference.
