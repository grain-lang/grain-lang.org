---
title: "Library Preview: Regex"
subtitle: Pattern matching, parsing, oh my!
date: 2021-09-20 12:00:00
author: Philip Blair
cover: /src/images/cover/carl-raw-_NEzKE6Zdp4-unsplash.jpg
coverAttribution: Carl Raw / Unsplash
tags:
  - Standard Library
---

What separates toy projects from fully-fledged programming languages? There are a number of valid answers to this question, but I think that a major one is the strength of its standard library. A powerful and fleshed-out standard library makes it quick and easy to do common tasks without having to reinvent the wheel at every turn. One such task is seemingly simple: recognizing simple patterns in strings. Most major modern programming languages come with a standard way of doing this, known as _regular expressions_. While these libraries may be straightforward to use, they're anything but straightforward to implement! Consequently, it is essential for languages to save users from having to roll their own versions of this functionality for each of their needs.

I am proud to announce the [`Regex` module](/docs/stdlib/regex)'s inclusion in Grain's standard library in the upcoming `0.4.3` release (also available now on `main`). This milestone is particularly exciting for a number of reasons:

First, most overtly, this module provides an easy way of matching simple patterns in strings:

```grain
import Regex from "regex"
import Result from "result"
import Option from "option"

// Grain's Result type tells us whether we made a mistake
// in our pattern. We use Result.expect to unwrap the
// parsed pattern or throw an error if it failed to parse.
let pat = Result.expect(
  "Failed to parse regular expression",
  Regex.make("ca+[rt]"),
)

// Now that we've compiled our Regular Expression pattern,
// we can use it to search strings. Because a pattern may
// or may not match the input string, it returns an
// Option&lt;Regex.MatchResult&gt;. Here, we know it matches,
// so we can use Option.unwrap to get the underlying value.
let matchResult = Option.unwrap(Regex.find(pat, "caar"))
assert Option.unwrap(matchResult.group(0)) == "caar"

// We can look at another example where we don't
// match the whole string:
let matchResult = Option.unwrap(Regex.find(pat, "scare"))
assert matchResult.group(0) == Some("car")

// We can replace substrings too!
assert Regex.replace(pat, "cart", "ski") == "skit"
```

The full documentation can be found [here](/docs/stdlib/regex), but this library should be very useful for building even more nifty features in the future, such as the tokenization needed for JSON support.

In addition, this library marks a soft milestone in Grain's maturity: it's one of the most complex things which has been written in the language so far, and it is written entirely in standard Grain! It packs a regular expression parser (so we can understand what pattern you're trying to match) and matching engine, all written in a Grain module with no foreign host functions! It is far and away the largest module in the standard library:

```bash
 $ find stdlib -name '*.gr' \
   | xargs -L 1 wc -l \
   | sort -nk1 | tail -5
    1324 stdlib/runtime/numberUtils.gr
    1465 stdlib/runtime/numbers.gr
    1612 stdlib/string.gr
    1709 stdlib/sys/file.gr
    3055 stdlib/regex.gr
```

This module landing in the standard library continues to demonstrate our vision—writing complex programs in Grain is both possible and fun, and features like this make it easier and easier. We're constantly improving Grain's standard library, and [you can help too](https://github.com/grain-lang/grain/issues?q=is%3Aopen+is%3Aissue+label%3Astdlib)!

A huge thank you to the Grain Core Team for all of the code reviews and bug squashing which went into making this happen. I'm pumped to see what we can land in the standard library next!
