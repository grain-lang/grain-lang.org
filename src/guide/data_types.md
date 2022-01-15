---
title: Data Types
---

Lists, numbers, and strings are all cool, but sometimes we need to represent more complex data structures. That's where data types come in—they allow us to define our own types that are better suited to solve specific problems.

## Enum Types

Enums allow you to represent data that has multiple variations. Combined with pattern matching, they will make you feel like you've got superpowers. They're the backbone of programming in Grain, and you'll come to find that they make it ridiculously easy to understand what a program does.

Let's imagine for a moment that we're vegetable farmers and we want to represent the vegetables we offer. We could represent them like this:

```grain
enum Veggie { Squash, Cabbage, Broccoli }
```

If we have many vegetables to offer, we could instead write it this way for readability:

```grain
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
let cart = [Cabbage, Cabbage, Broccoli]
```

Since this constructed data is just like any other value in Grain, we can do things like check equality.

```grain
let veggie = Broccoli

if (veggie == Broccoli) {
  print("We've got the best vegetable!")
}
```

This is great, but we'll soon explore a much more powerful way to work with our data constructors in the section on pattern matching.

### Compound Variants

What if we sold both red and green cabbage? While we might be tempted to create variants `RedCabbage` and `GreenCabbage`, a better way might be to give the kind of cabbage its own type.

```grain
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
enum Veggie { Squash, Cabbage, Broccoli }
enum Fruit { Apples, Oranges, Bananas }

enum VeggieInventory { VeggieCrate(Veggie), VeggieTruckload(Veggie) }
enum FruitInventory { FruitCrate(Fruit), FruitTruckload(Fruit) }

let veggieInventory = [VeggieCrate(Broccoli), VeggieTruckload(Cabbage)]
let fruitInventory = [FruitCrate(Apples), FruitTruckload(Oranges)]
```

Instead of creating an inventory type for each kind of produce, we could instead create one type and use a type variable to allow us to use it with both fruits and vegetables.

```grain
enum Veggie { Squash, Cabbage, Broccoli }
enum Fruit { Apples, Oranges, Bananas }

enum Inventory<produce> { Crate(produce), Truckload(produce) }

let veggieInventory = [Crate(Broccoli), Truckload(Cabbage)]
let fruitInventory = [Crate(Apples), Truckload(Oranges)]
```

Type variables always begin with a lowercase letter. Something to note from this example: although we've created one type that works with both fruits and vegetables, we would still not be allowed to mix inventory types, i.e. `[Crate(Broccoli), Crate(Apples)]` because `veggieInventory` has type `Inventory<Veggie>` and `fruitInventory` has type `Inventory<Fruit>`.

### Printing Variants

If your variant type is exported from your module, the variants are printable.

```grain
export enum Veggie { Squash, Cabbage, Broccoli }

print(Cabbage)
```

We haven't discussed exports yet, but we'll go much deeper into them in another section.

## Record Types

Records are sort of like tuples, though each field has a name.

```grain
record Person { name: String, age: Number }

let user = { name: "Klaus Teuber", age: 42 }
print(user.name) // prints "Klaus Teuber"
```

Record fields are accessed using the dot operator, i.e. `record.field`.

### Field Shorthand

If we create a binding with the same name as our record's fields, we can use a shorthand to create our record.

```grain
record Person { name: String, age: Number }

let name = "Klaus Teuber"
let age = 42

{ name, age }
```

### Printing Records

If your record type is exported from your module, records of that type are printable.

```grain
export record Person { name: String, age: Number }

print({ name: "Klaus Teuber", age: 42 })
```

We haven't discussed exports yet, but we'll go much deeper into them in another section.

## Mutable record properties

We've previously created mutable `let` bindings with the `mut` keyword. In a similar fashion, we can also create mutable record fields.

```grain
export record Counter {
  mut count: Number
}

let counter = { count: 0 }

let addOne = (c) => {
  c.count = incr(c.count)
}

let subtractOne = (c) => {
  c.count = decr(c.count)
}

addOne(counter)
addOne(counter)

print(counter) // { count: 2 }

subtractOne(counter)

print(counter) // { count: 1 }
```

## Mutually Recursive Data Types

In some instances, it is necessary to define multiple data types which refer to one another. For example, imagine you wanted to define your own number system based on [Peano Arithmetic](https://en.wikipedia.org/wiki/Peano_axioms). You might try something like this:
```grain
enum EvenNumber {
  Zero, // 0
  OddPlusOne(OddNumber) // one plus an odd number
}

enum OddNumber {
  EvenPlusOne(EvenNumber) // one plus an even number
}

let two = OddPlusOne(EvenPlusOne(Zero)) // 2 == (0 + 1) + 1
```

If you try to run this program, it won't work! That's because when the Grain compiler reads the definition for `EvenNumber`, it sees the reference to `OddNumber` before it's read its definition. This means that the compiler isn't sure what `OddNumber` is referring to! Luckily, there is a simple fix for this: we can place a comma after `EvenNumber`'s definition to tell the compiler that the next data definition is allowed to be recursive with `EvenNumber`:

```grain
enum EvenNumber {
  Zero, // 0
  OddPlusOne(OddNumber) // one plus an odd number
}, // <- allows EvenNumber and OddNumber to be recursive!

enum OddNumber {
  EvenPlusOne(EvenNumber) // one plus an even number
}

let two = OddPlusOne(EvenPlusOne(Zero)) // 2 == (0 + 1) + 1
```

This example compiles without any issues.
