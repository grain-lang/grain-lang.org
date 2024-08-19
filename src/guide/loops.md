---
title: Loops
---

Loops allow you to repeat an action over and over (and over).

## While Loops

The most basic loop is the `while` loop. The code within the loop repeats until the condition is `false`.

```grain
let mut i = 0

while (i < 10) {
  print("looping!")
  i += 1
}
```

Loops can skip to the next iteration using the `continue` keyword. For example, to print only the odd numbers from zero to ten:

```grain
let mut i = 0

while (i < 10) {
  if (i % 2 == 0) {
    i += 1
    continue
  }
  print(i)
  i += 1
}
```

Use the `break` keyword to exit from a loop entirely:

```grain
let mut i = 0

while (true) {
  if (i < 10) {
    print("forever?")
    i += 1
  } else {
    break
  }
}
```

## For Loops

`for` loops are just like `while` loops, just with more structure. `for` loops accept an optional initializer statement which runs before the loop, an optional condition statement which runs before each iteration, and an optional increment statement which runs after each iteration.

`for` loops are commonly used to iterate arrays:

```grain
module Main

import Array from "array"

let strings = [> "foo", "bar", "baz"]

for (let mut i = 0; i < Array.length(strings); i += 1) {
  print(strings[i])
}
```

```grain
module Main

let anyNumberIsEven = array => {
  for (let mut i = 0; i < Array.length(array); i += 1) {
    if (array[i] % 2 == 0) {
      return true
    }
  }
  return false
}

print(anyNumberIsEven([> 1, 3, 5])) // false
```

Since all of the loop parameters are optional, they can all be omitted (though the semicolons are still required). For example, here's how we can define an infinite loop:

```grain
for (;;) {
  print("forever!")
}
```
