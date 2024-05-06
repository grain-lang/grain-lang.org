---
title: Pattern Matching
---

Pattern matching is a powerful tool to work with data structures. It's like a switch statement in other languages, but with a bit more pizazz. Each case of a `match` statement defines the shape, or pattern, of the data that will match the case.

## Matching Enum Types

Let's start by looking at a simple enum type.

```grain
enum PizzaTopping { Cheese, Pepperoni, Peppers, Pineapple }

let topping = Peppers

match (topping) {
  Cheese => print("Would it really be pizza without it?"),
  Pepperoni => print("An instant classic."),
  Peppers => print("For those who like to spice things up."),
  Pineapple => print("You do you.")
}
```

This example prints out a fun message depending on which pizza topping is bound to `topping`. Each case is separated by a comma.

You can also surround the body of your `match` case with curly braces to include more statements.

```grain
enum PizzaTopping { Cheese, Pepperoni, Peppers, Pineapple }

let getPrice = (topping) => {
  match (topping) {
    Cheese => 4,
    Pepperoni => 6,
    Peppers => {
      print("Peppers are on sale this week!")
      3
    },
    Pineapple => 9
  }
}

getPrice(Peppers)
```

### Default Cases

If we only care about some of the cases, we can use an underscore pattern to match all other possible cases.

```grain
enum PizzaTopping { Cheese, Pepperoni, Peppers, Pineapple }

let topping = Peppers

match (topping) {
  Cheese => print("Would it really be pizza without it?"),
  _ => print("That's cool, but the cheese makes the pizza.")
}
```

If we were to omit the last underscore "catch-all" case, the Grain compiler would complain that we're missing cases for `Pepperoni`, `Peppers`, and `Pineapple`.

### Nested Match Patterns

We can nest match patterns as deeply as we'd like. If we sold both one-topping pizzas and calzones, we may want to single out a particular pizza/topping combo:

```grain
enum Topping { Cheese, Pepperoni, Peppers, Pineapple }
enum Menu { Pizza(Topping), Calzone(Topping) }

let item = Calzone(Peppers)

match (item) {
  Calzone(Peppers) => print("These are half off this week."),
  Pizza(Cheese) => print("We never discount this item."),
  _ => print("No current specials.")
}
```

We can also use an underscore anywhere within a pattern to match remaining cases.

```grain
enum Topping { Cheese, Pepperoni, Peppers, Pineapple }
enum Menu { Pizza(Topping), Calzone(Topping) }

let item = Calzone(Peppers)

match (item) {
  Calzone(Peppers) => print("These are half off this week."),
  Calzone(_) => print("Enjoy 10% off, on us."),
  _ => print("No current specials.")
}
```

### Bindings in Match Patterns

We can bind portions of a `match` pattern to a name and use that bound value in the body the corresponding case.

```grain
enum Topping { Cheese, Pepperoni, Peppers, Pineapple }
enum Menu { Pizza(Topping), Calzone(Topping) }

let item = Calzone(Peppers)

match (item) {
  Calzone(topping) => {
    if (checkSpecials(topping)) {
      print("These are half off this week.")
    } else {
      print("No current specials.")
    }
  },
  _ => print("No current specials.")
}
```

One common use of pattern matching and binding is working with `Option` and `Result` enums. 

```grain
let opt = Some("I'm a match")
match (opt) {
    Some(msg) => print(msg),
    None => print("No match found")
}

let result = Err("This is an error")
match (result) {
    Ok(msg) => print(msg),
    Err(e) => print(e)
}
```

The first example will print `I'm a match` because the `Option` has a value.

The second example will print `This is an error` because the `Result` contains an `Err`.

## Matching Record Types

Like most Grain data structures, pattern matching can also be done on records.

```grain
record Person { name: String, age: Number }

let person = { name: "Steve", age: 25 }

match (person) {
  { name, age } => print(name)
}
```

If we don't care about some of the record fields, we can use an underscore to tell the Grain compiler that we've intentionally left those fields out.

```grain
record Person { name: String, age: Number }

let person = { name: "Steve", age: 25 }

match (person) {
  { name, _ } => print(name)
}
```

### Nested Matching Within Records

Things are a bit more interesting when we have data structures nested within records.

```grain
enum Topping { Cheese, Pepperoni, Peppers, Pineapple }
enum Order { Pizza(Topping), Calzone(Topping) }

record Person { name: String, order: Order }

let person = { name: "Steve", order: Calzone(Pepperoni) }

match (person) {
  { order: Pizza(_), _ } => print("All pizzas are great here."),
  { order: Calzone(Peppers), _ } => print("Someone with great taste!"),
  { order: _, _ } => print("Yep, that's an order.")
}
```

## Matching Tuples

Pattern matching can also be performed on tuples.

```grain
enum Topping { Cheese, Pepperoni, Peppers, Pineapple }
enum Order { Pizza(Topping), Calzone(Topping) }
enum OrderType { DineIn, Takeaway }

let order = (Calzone(Pineapple), DineIn)

match (order) {
  (Calzone(Pineapple), DineIn) => {
    print("We can't let the other customers see this.")
  },
  (_, Takeaway) => print("Box it up to go."),
  (_, DineIn) => print("Clean off table 5.")
}
```

## Matching Lists

Often with lists, we want to do something with the first element of a list and then do some further processing with the rest of the list.

In this example, we define an `add2` function to increment each value in a list of numbers by 2.

```grain
let rec add2 = (list) => {
  match (list) {
    [first, ...rest] => [first + 2, ...add2(rest)],
    [] => []
  }
}

add2([1, 2, 3]) // [3, 4, 5]
```

Let's break this down.

The `[first, ...rest]` pattern creates bindings for the first element in the list, and a list containing the rest of the elements. In the body of this case, the `[first + 2, ...add2(rest)]` expression creates a new list. The first element of the result is the sum of 2 and the first element of the original list. The remaining elements of the list are the result of a recursive call to the `add2` function on the rest of the original list.

We can also match on multiple elements at the beginning of a list:

```grain
let list = [1, 2, 3]

match (list) {
  [first, second, ..._] => first + second,
  _ => fail "List contained fewer than 2 elements"
}
```

Finally, matches can also be performed on lists with specific lengths.

```grain
let list = [1, 2, 3]

match (list) {
  [] => print("List contains no elements"),
  [_] => print("List contains one element"),
  [_, _] => print("List contains two elements"),
  [_, _, _] => print("List contains three elements"),
  _ => print("List containes more than 3 elements")
}
```

## Match Guards

Sometimes you want to be more specific about conditions for matching. You can use a **match guard** to place more specific limitations on a `match` case.

You can think of a match guard as a combination of a `match` and an `if`. A guard allows you to add an additional statement to qualify whether the case matches.

```grain
let myNumber = Some(123)
match (myNumber) {
    Some(val) when val > 100 => print("More than 100"),
    Some(val) => print("Less than or equal to 100"),
    None => print("Nothing at all")
}
```

In the example above, `myNumber` is an `Option` whose value is `Some(123)`. But our `match` statement has _three_ cases instead of two. The first case adds a guard: `Some(val) when val > 100`. This case will only be matched when the `Option` is `Some()` and the value inside that option is a number greater than `100`.

The next case, `Some(val)`, will match any `Some()` value that is not matched by the guarded version.

Order is important when using guards. The **first case to match** is the one that will be used. For example, we could change the above example to this:

```grain
let myNumber = Some(123)
match (myNumber) {
    Some(val) => print("Less than or equal to 100"),
    Some(val) when val > 100 => print("More than 100"),
    None => print("Nothing at all")
}
```

In this version, regardless of the size of `myNumber`, it would always match the first case.

Even default cases can have guards.

```grain
let myNumber = Some(99)
let isTuesday = true
match (myNumber) {
    Some(val) when val > 100 => print("Greater than 100"),
    _ when isTuesday => print("It's Tuesday"),
    _ => print("Nothing else matched")
}
```

In the example above, if `myNumber` is greater than `100` (which it is not), then the program prints `Greater than 100`. Otherwise, if `isTuesday` is `true`, then it prints `It's Tuesday` (regardless of whether `myNumber` is a `Some()` or a `None`). Finally, if nothing else matches, the program prints `Nothing else matched`.
