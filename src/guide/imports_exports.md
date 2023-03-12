---
title: Imports and Exports
---

Larger projects are best maintained when the project's code is broken up into small files. Imports are used to access values within other modules and exports are used to control which values within a module are available to other modules.

## Exporting From a Module

When we want to make a value in a module available for another module to import, we export it. The easiest way to export values from a module is to export everything:

```grain
module Main

let add = (a, b) => a + b
let five = 5

provide *
```

In this example, the values `add` and `five` could both be imported into another module.

Grain also includes a way to exclude values from being exported this way.

```grain
let add = (a, b) => a + b
let five = 5

export * except five
```

Here, the only value available for export is `add`.

It sometimes makes sense to export everything from a module, but often it's best to explicitly declare which values should be exported.

### Exporting Specific Names

Using the same example, we could choose to only export `add` with an export statement.

```grain
module Library

let add = (a, b) => a + b
let five = 5

provide { add }
```

We could also define the export inline:

```grain
module Library

provide let add = (a, b) => a + b
let five = 5
```

### Exporting Data Types

Exports work the same way for data types. If we had a record type that we wanted to include in another module, we'd just export it as we'd export anything else.

```grain
module Library

provide record User {
  name: String,
  id: Number
}
```

If we export a variant type, each variant constructor gets exported and is available to other modules. For example, in this code:

```grain
module Library

provide enum Vehicle { Car, Minivan, Bus }
```

constructors `Car`, `Minivan`, and `Bus` will all be imported with the `Vehicle` type.

## Importing From a Module

Things can be imported from standard libraries or other files we've written.

### Standard Library Imports

We can import a module by giving it a name and providing the path to the module.

```grain
module Main

include "list"

List.length([1, 2, 3])
```

The name in quotes, `"list"`, is the path to the module. Grain knows how to find all of the modules in the standard library, so we can just say `"list"` without having to determine where the standard library files exist on our computer.

### Relative Imports

We can import values from files we've written by providing the path to that file. We don't need to include the `.gr` extension.

With these two files in the same directory, `math.gr` and `main.gr`, we'd have the workings of a full program.

```grain
// math.gr
module Math

provide let add = (a, b) => a + b
```

```grain
// main.gr
module Main

Math.add(5, 6)
```

### Named Modules

As you've seen so far, we can import an entire module from the standard library by giving it a name beginning with a capital letter, like so:

```grain
module Main

include "list"

List.length([1, 2, 3])
```

Module names don't have to mirror the path name. We can name them whatever we'd like:

```grain
module Main

include "list" as Stdlist

Stdlist.length([1, 2, 3])
```

### Importing All Values

If we want to include all of the values from another module in our program, we can use an asterisk.

```grain
module Main

include "list"

from List use *

length([1, 2, 3])
reverse([1, 2, 3])
```

### Importing Specific Values

Individual values in a module can be imported by placing the names in curly braces.

```grain
module Main

include "list"

from List use { length, reverse }

length([1, 2, 3])
reverse([1, 2, 3])
```
