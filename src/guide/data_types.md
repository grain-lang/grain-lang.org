---
title: Data Types
---

Lists, numbers, and strings are all cool, but sometimes we need to represent more complex data structures. That's where data types come in—they allow us to define our own types that are better suited to solve specific problems.

## Variant Types

You can think of variant types as enums with superpowers.

Let's imagine for a moment that we're vegetable farmers and we want to represent the vegetables we offer. We could represent them like this:

```grain
data Veggies = Squash | Cabbage | Broccoli
```

If we have many vegetables to offer, we could instead write it this way for readability:

```grain
data Veggie =
  | Squash
  | Cabbage
  | Broccoli
```

This declaration does two things—it creates a new type called `Veggie` and it creates data constructors for each vegetable. Type names and variant names always begin with a capital letter.

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
data CabbageColor = Red | Green
data Veggie =
  | Squash
  | Cabbage(CabbageColor)
  | Broccoli

let redCabbage = Cabbage(Red)
```

If we wanted to associate a quantity with each vegetable, we could do that too:

```grain
data CabbageColor = Red | Green
data Veggie =
  | Squash(Number)
  | Cabbage(CabbageColor, Number)
  | Broccoli(Number)

let cart = [Cabbage(Red, 4), Squash(1)]
```

### Type Variables

Imagine a world where we sell both fruits and vegetables. If we wanted to represent our inventory, we might do it like this:

```grain
data Veggie = Squash | Cabbage | Broccoli
data Fruit = Apples | Oranges | Bananas

data VeggieInventory = VeggieCrate(Veggie) | VeggieTruckload(Veggie)
data FruitInventory = FruitCrate(Fruit) | FruitTruckload(Fruit)

let veggieInventory = [VeggieCrate(Broccoli), VeggieTruckload(Cabbage)]
let fruitInventory = [FruitCrate(Apples), FruitTruckload(Oranges)]
```

Instead of creating an inventory type for each kind of produce, we could instead create one type and use a type variable to allow us to use it with both fruits and vegetables.

```grain
data Veggie = Squash | Cabbage | Broccoli
data Fruit = Apples | Oranges | Bananas

data Inventory<produce> = Crate(produce) | Truckload(produce)

let veggieInventory = [Crate(Broccoli), Truckload(Cabbage)]
let fruitInventory = [Crate(Apples), Truckload(Oranges)]
```

Type variables always begin with a lowercase letter. Something to note from this example: although we've created one type that works with both fruits and vegetables, we would still not be allowed to mix inventory types, i.e. `[Crate(Broccoli), Crate(Apples)]` because `veggieInventory` has type `Inventory<Veggie>` and `fruitInventory` has type `Inventory<Fruit>`.

### Printing Variants

If your variant type is exported from your module, the variants are printable.

```grain
export data Veggie = Squash | Cabbage | Broccoli

print(Cabbage)
```

We haven't discussed exports yet, but we'll go much deeper into them in another section.

## Record Types

Records are sort of like tuples, though each field has a name.

```grain
data Person = { name: String, age: Number }

let user = { name: 'Klaus Teuber', age: 42 }
print(user.name) # prints 'Klaus Teuber'
```

Record fields are accessed using the dot operator, i.e. `record.field`.

### Field Shorthand

If we create a binding with the same name as our record's fields, we can use a shorthand to create our record.

```grain
data Person = { name: String, age: Number }

let name = 'Klaus Teuber'
let age = 42

{ name, age }
```

### Printing Records

If your record type is exported from your module, records of that type are printable.

```grain
export data Person = { name: String, age: Number }

print({ name: 'Klaus Teuber', age: 42 })
```

We haven't discussed exports yet, but we'll go much deeper into them in another section.

## Mutable record properties

We've previously creating mutable `let` bindings, but you can also label individual properties on your records `mut`.

```grain
export data Counter = {
  mut count: Number
}

let counter = { count: 0 }

let incr = (c) => {
  c.count = c.count + 1
}

let decr = (c) => {
  c.count = c.count - 1
}

incr(counter)
incr(counter)

print(counter) # { count: 2 }

decr(counter)

print(counter) # { count: 1 }
```
