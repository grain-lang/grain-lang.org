---
title: Modules
slug: guide/modules
---

Larger projects are best maintained when the project's code is broken up into smaller units. In Grain, we can utilize modules to accomplish this goal. A module can be used to organize a set of code together and make certain portions of itself available to other modules for usage. Each Grain file in your project is itself a module, and modules can be further split into submodules.

## Providing From a Module

When we want to make something within a module available for another module to use, we can `provide` it. Say we write this code in a file `a.gr`:

```grain
module ModuleA

provide record User {
  id: Number,
  name: String
}

let mut id = 0
provide let makeUser = name => {
  id += 1
  { id, name }
}
```

Now, we can make use of the values provided from this module in a different module: Say we write this code in a new file in the same directory as `a.gr` above:

```grain
module ModuleB

from "./a.gr" include ModuleA

let user1 = ModuleA.makeUser("Bob")
let user2 = ModuleA.makeUser("Sally")
print(user1) // { id: 1, name: "Bob" }
print(user2) // { id: 2, name: "Sally" }
```

As you can see, our new module can use the function we defined in our first module!

### Submodules

We can create modules within modules as well! This can be used to further split code within a file (or to further split a submodule in a file).

```grain
module Main

module Helpers {
  provide let add = (a, b) => a + b
}

print(Helpers.add(1, 2)) // 3
```

### Providing after Declaration

It is also possible to provide an item from a module after it was initially declared using `provide { ... }` syntax.

```grain
module Library

record User {
  name: String,
  id: Number
}

module UserHelpers {
  // ...
}

let sampleUser = { name: "Admin", id: 1 }

// We need to prefix exported types with `type` and modules with `module`
provide { sampleUser, type User, module UserHelpers }
```

### Standard Library `include`s

We can use a standard library module by including the name of the module. Unlike including relative paths to code we've written, we can exclude the `.gr` file extension.

```grain
module Main

from "list" include List

assert List.length([1, 2, 3]) == 3
```

The name in quotes, `"list"`, is the path to the module. Grain knows how to find all of the modules in the standard library, so we can just say `"list"` without having to determine where the standard library files exist on our computer.

### Referencing Modules with a Different Name

As you've seen so far, we can include a module in another module by using `include ...` syntax with the name of the module following `include`. However, if we want to refer to that module using a different name we have the ability to do so:

```grain
module Main

from "list" include List as Stdlist

assert Stdlist.length([1, 2, 3]) == 3
```

### Bring Values from a Module into Scope

Individual items in a module can be brought into scope with the `use` keyword and placing the desired items in curly braces. Similar to with the `provide { ... }` syntax, we need to prefix types with `type` and modules with `module`. `as` can also be used to change the name an item from the target module is brought into scope as

```grain
module Main

from "array" include Array

use Array.{ length, module Immutable }
use Array.Immutable.{ length as immArrLength }

assert length([> 1, 2, 3]) == 3
let imm = Immutable.fromList([1, 2, 3])
assert Immutable.length(imm) == immArrLength(imm)
```

#### Bringing All Values into Scope

If we want to bring all of the contents of another module into scope in our program, we can use an asterisk.

```grain
module Main

from "list" include List

use List.*

assert length([1, 2, 3]) == 3
assert reverse([1, 2, 3]) == [3, 2, 1]
```
