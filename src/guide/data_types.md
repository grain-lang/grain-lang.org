---
title: Custom Data Types
---

Primitive types like numbers and strings are all cool, but sometimes we need to represent more complex data structures. That's where data types come in—they allow us to define our own types that are better suited to solve specific problems.

## Record Types

Records are sort of like tuples, though each field has a name.

```grain
record Person { name: String, age: Number }

let user = { name: "Klaus Teuber", age: 42 }
print(user.name) // prints "Klaus Teuber"
```

Record fields are accessed using the dot operator, i.e. `record.field`.

### Field Shorthand

If we create a binding with the same name as our record's fields, we can use a shorthand to create the fields of our record: this is called "punning".

```grain
record Person { name: String, age: Number }

let name = "Klaus Teuber"
let age = 42

let user = { name, age }
print(user) // { name: "Klaus Teuber", age: 42 }
```

## Mutable record properties

We've previously created mutable `let` bindings with the `mut` keyword. In a similar fashion, we can also create mutable record fields.

```grain
record Counter {
  mut count: Number
}

let counter = { count: 0 }

let addOne = (c) => {
  c.count += 1
}

let subtractOne = (c) => {
  c.count -= 1
}

addOne(counter)
addOne(counter)

print(counter) // { count: 2 }

subtractOne(counter)

print(counter) // { count: 1 }
```

## Enum Types

Enums allow you to represent data that has multiple variations. Combined with pattern matching, they will make you feel like you've got superpowers. They're the backbone of programming in Grain, and you'll come to find that they are a very useful tool for expressing complex scenarios intuitively. Among other benefits, they enable Grain to have safe nullability through the `Option` type and intuitive errors-as-values through the `Result` type (both of which we will cover more extensively in later sections).

Let's imagine for a moment that we're vegetable farmers and we want to represent the vegetables we offer. We could represent them like this:

```grain
module Main

enum Veggie { Squash, Cabbage, Broccoli }
```

If we have many vegetables to offer, we could instead write it this way for readability:

```grain
module Main

enum Veggie {
  Squash,
  Cabbage,
  Broccoli,
}
```

This declaration does two things—it creates a new type called `Veggie` and it creates data constructors for each vegetable, each of which is called a _variant_. Type names and variant names always begin with a capital letter.

### Data Constructors

Data constructors allow us to create data. For the `Veggie` type, we now have constructors for each vegetable variant, and each one shares its name.

If someone were to purchase our vegetables, their shopping cart might look like this:

```grain
module Main

enum Veggie { Squash, Cabbage, Broccoli }

let cart = [Cabbage, Cabbage, Broccoli]
```

Since this constructed data is just like any other value in Grain, we can do things like check equality.

```grain
module Main

enum Veggie { Squash, Cabbage, Broccoli }

let veggie = Broccoli

if (veggie == Broccoli) {
  print("We've got the best vegetable!")
}
```

This is great, but we'll soon explore a much more powerful way to work with our data constructors in the section on pattern matching.

### Compound Variants

What if we sold both red and green cabbage? While we might be tempted to create variants `RedCabbage` and `GreenCabbage`, a better way might be to give the kind of cabbage its own type.

```grain
module Main

enum CabbageColor { Red, Green }
enum Veggie {
  Squash,
  Cabbage(CabbageColor),
  Broccoli
}

let redCabbage = Cabbage(Red)
```

If we wanted to associate a quantity with each vegetable, we could do that too:

```grain
module Main

enum CabbageColor { Red, Green }
enum Veggie {
  Squash(Number),
  Cabbage(CabbageColor, Number),
  Broccoli(Number)
}

let cart = [Cabbage(Red, 4), Squash(1)]
```

### Type Variables

Imagine a world where we sell both fruits and vegetables. If we wanted to represent our inventory, we might do it like this:

```grain
module Main

enum Veggie { Squash, Cabbage, Broccoli }
enum Fruit { Apples, Oranges, Bananas }

enum VeggieInventory { VeggieCrate(Veggie), VeggieTruckload(Veggie) }
enum FruitInventory { FruitCrate(Fruit), FruitTruckload(Fruit) }

let veggieInventory = [VeggieCrate(Broccoli), VeggieTruckload(Cabbage)]
let fruitInventory = [FruitCrate(Apples), FruitTruckload(Oranges)]
```

Instead of creating an inventory type for each kind of produce, we could instead create one type and use a type variable to allow us to use it with both fruits and vegetables.

```grain
module Main

enum Veggie { Squash, Cabbage, Broccoli }
enum Fruit { Apples, Oranges, Bananas }

enum Inventory<produce> { Crate(produce), Truckload(produce) }

let veggieInventory = [Crate(Broccoli), Truckload(Cabbage)]
let fruitInventory = [Crate(Apples), Truckload(Oranges)]
```

Type variables always begin with a lowercase letter. Something to note from this example: although we've created one type that works with both fruits and vegetables, we would still not be allowed to mix inventory types, i.e. `[Crate(Broccoli), Crate(Apples)]` because `veggieInventory` has type `Inventory<Veggie>` and `fruitInventory` has type `Inventory<Fruit>`.

## Recursive Data Types

In some instances, it is necessary to define a data type which refers to its own type. For example, say you were creating your own custom linked list implementation:

```grain
module Main

enum List {
  Cons(Number, List),
  Nil
}
```

This particular example will fail to compile because of the type recursion. To allow this we will need to specify the `rec` keyword on our type:

```grain
module Main

enum rec List {
  Cons(Number, List),
  Nil
}
```

Furthermore, it is sometimes necessary to define multiple data types which refer to each other. For example, imagine you wanted to define your own number system based on [Peano Arithmetic](https://en.wikipedia.org/wiki/Peano_axioms). You might try something like this:
```grain
module Main

enum EvenNumber {
  Zero, // 0
  OddPlusOne(OddNumber) // one plus an odd number
}

enum OddNumber {
  EvenPlusOne(EvenNumber) // one plus an even number
}

let two = OddPlusOne(EvenPlusOne(Zero)) // 2 == (0 + 1) + 1
```

However, this program won't compile! That's because when the Grain compiler reads the definition for `EvenNumber`, it sees the reference to `OddNumber` before it reads its definition. This means that the compiler isn't sure what `OddNumber` is referring to! Luckily, there is a simple fix for this: we can place the `and` keyword after `EvenNumber`'s definition to tell the compiler that the next data definition is allowed to be recursive with `EvenNumber`, and add the `rec` keyword to the first type in the group to indicate that it is a group of mutually recursive types:

```grain
module Main

enum rec EvenNumber {
  Zero, // 0
  OddPlusOne(OddNumber) // one plus an odd number
}
and enum OddNumber {
  EvenPlusOne(EvenNumber) // one plus an even number
}

let two = OddPlusOne(EvenPlusOne(Zero)) // 2 == (0 + 1) + 1
```

This example compiles without any issues.

### Inline Record Variants

`enum` variants can also have record-like constructors, which can be useful in cases where we want to explicitly label the data associated with a variant.

```grain
enum Color {
  Red,
  Green,
  Blue,
  Custom{
    r: Number,
    g: Number,
    b: Number
  }
}

let color = Custom{r: 255, g: 133, b: 14}
```

## Type Aliasing

Type aliasing can be used to assign an alternate name to a type, which can be useful to provide abstraction or avoid repetition of long type names

```grain
type Vec3 = (Number, Number, Number)
type T = AReallyLongTypeName<Type1, Type2>
```
