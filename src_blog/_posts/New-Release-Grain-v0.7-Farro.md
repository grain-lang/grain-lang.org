---
title: New Release! Grain v0.7 - Farro
subtitle: Announcing the release of Grain v0.7, Farro, with improved language and standard library ergonomics.
date: 2025-04-28 8:00:00
author: Oscar Spencer
cover: /blog/photos/cover/ant-rozetsky--c0PJUAtpSo-unsplash.jpg
coverAttribution: Ant Rozetsky / Unsplash
tags: Release, Changelog
---

We're excited to present the release of Grain v0.7, Farro! This release comes with a number of developer experience improvements across the language and standard library, and as always, bug fixes. Thanks to all of the community members who have given us feedback! Keep it coming, and the language will continue to get better and better. I'll highlight some of the most notable changes in this release, though you'll definitely want to check out the full [release notes](https://github.com/grain-lang/grain/releases/tag/grain-v0.7.0) on GitHub!

## Infix operator expression chaining

Statements in Grain are generally terminated by the end of the line, so chaining expressions of infix operators generally looks like this:

```grain
module Main

aFirstThing +
  aSecondThing() +
  aThirdThing(with, some, arguments) -
  aFourthThing
```

This forces you to look all the way to the end of the line to see what operation is being applied, which can make the code harder to understand, especially when the lines are all different lengths. Putting the operator at the start of the line was previously disallowed, but with a few tweaks of the grammar (largely to remove ambiguity with expressions like negative numbers), this is now allowed:

```grain
module Main

aFirstThing
  + aSecondThing()
  + aThirdThing(with, some, arguments)
  - aFourthThing
```

Much easier to follow the logic! Grainfmt has also been updated to apply this style when formatting programs.

## New `Fs` library

Dealing with files can be a pain, but the new `Fs` standard library provides high-level APIs for working with files that make it a breeze. These APIs still use WASI under the hood, but handle all of the hard work for you.

```grain
module Main

from "path" include Path
from "fs" include Fs

// Reading a full file
Fs.Utf8.readFile(Path.fromString("baz.txt"))

// Writing a full file
Fs.Utf8.writeFile(Path.fromString("baz.txt"), "Hello World\n")

// Copying a file
Fs.copy(Path.fromString("foo.txt"), Path.fromString("foocopy.txt"))
```

## JSON lenses 🔍

The `Json` library now provides the `Lenses` submodule, providing utilities to focus in on particular values and get or set them. For example, getting the price value from this JSON:

```grain
module Main

from "json" include Json
from "result" include Result

let metadata = Result.unwrap(Json.parse("{\"currency\":\"$\",\"price\":119}"))

// Previously, to get the `price` value, you'd need a full pattern match:
let price = match (metadata) {
  JsonObject([_, ("price", JsonNumber(price)), ..._]) => Some(price),
  _ => None
}

// Somewhat fine for small JSON values (where you know the order of object
// keys), but quickly gets out of hand when values are deeply nested.

// Now we can instead use a Json lens:
use Json.Lenses.{ get, property, number, (||>) }

let price = get(property("price") ||> number, metadata)
```

Lenses are a powerful way to work with JSON data. When it's time to update prices, it's not a tough job:

```grain
module Main

from "json" include Json
use Json.Lenses.{ map, property, number, (||>) }

from "result" include Result

let metadata = Result.unwrap(Json.parse("{\"currency\":\"$\",\"price\":119}"))

let doublePrice = price => price * 2

let metadata = map(property("price") ||> number, doublePrice, metadata)
// Some(JsonObject([("currency", JsonString("$")), ("price", JsonNumber(238))]))
```

Deeply nested values can be focused in on with the `propertyPath` lens. We can even define our own lenses:

```grain
module Main

from "json" include Json
use Json.{ type Json }
use Json.Lenses.{ get, set, propertyPath, (||>), type Lens }

from "result" include Result

let metadata = Result.unwrap(
  Json.parse("{\"vehicles\":{\"car\":{\"color\":\"red\"}}}")
)

enum Color {
  Red,
  Blue,
  Green,
}

// Let's define a lens that works with Color values.

// The getter.
let colorGet = json => {
  match (json) {
    JsonString("red") => Some(Red),
    JsonString("green") => Some(Green),
    JsonString("blue") => Some(Blue),
    _ => None,
  }
}

// The setter.
let colorSet = (newValue, _) => {
  match (newValue) {
    Red => Some(JsonString("red")),
    Green => Some(JsonString("green")),
    Blue => Some(JsonString("blue")),
  }
}

// The lens is just a record with the getter and setter.
let color = { get: colorGet, set: colorSet }

// Now we can use our new lens!

// Some(Red)
get(propertyPath(["vehicles", "car", "color"]) ||> color, metadata)

// Returns a new Json value with the color set to "blue"
set(propertyPath(["vehicles", "car", "color"]) ||> color, Blue, metadata)
```

As you can see, we can create lenses that can get and set arbitrary values. This is a massive leap forward for the JSON library, and we can't wait to see what you build with it!

## Standard library submodules

Like the new `Json.Lenses` submodule, we're continuing to add new and useful submodules to the standard library, allowing us to add tons of new functionality while keeping the standard library organized. I want to call attention to two in particular—`Char.Ascii` and `List.Associative`.

Grain `Char`s are Unicode scalar values, but there are many properties of the subset of those values that are ASCII that are interesting. The new `Ascii` submodule gives you access to many of those properies, like `Ascii.isAlpha`, without polluting the namespace of the broader `Char` library.

The `List.Associative` submodule provides utilities for working with lists of key-value pairs. This is a fairly common pattern (and is used for JSON objects!), so this submodule finds a welcome home in `List`.

## Grain object files

Previously, the Grain compiler would produce intermediate `.gr.wasm` files when compiling a project. This could be confusing, as these `.wasm`s weren't useful on their own. The compiler now produces `.gro` files, which are better suited to be linked together later, along with reducing the need to completely re-compile a project when some compiler flags change. This will also allow us to provide a better debugging experience. As a bonus, this also improves compiler performance, resulting in faster compile times.

## Looking to the future

As the [garbage collection proposal](https://github.com/webassembly/gc) for WebAssembly is now fairly mature, Grain is ready to take advantage of it! I recently [spoke about this proposal at Wasm I/O 2025](https://www.youtube.com/watch?v=nbqjDEaRkVI) and gave some sneak peeks of the upgraded Grain compiler. Be sure to check it out, and stay tuned for a massive Grain update soon!

I'd like to give a special shoutout to [spotandjake](https://github.com/spotandjake) and [alex-snezhko](https://github.com/alex-snezhko) for continuing to make this project awesome. This release wouldn't have been possible without them! As always, there's much more to this release than what was covered here—be sure to check out the full [release notes](https://github.com/grain-lang/grain/releases/tag/grain-v0.7.0). We'd love to hear what you think! Join the conversation with us on [Discord](​​https://discord.com/invite/grain-lang).
