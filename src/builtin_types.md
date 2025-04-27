---
title: Built-in Types
---

Grain provides some built-in types to be used throughout your programs.

### **Bool**

```grain
enum Bool {
  true,
  false
}
```

The type of Grain booleans, i.e. `true` or `false`.

### **Char**

```grain
type Char
```

The type of Grain Unicode characters, e.g. `'g'`, `'🌾'`, `'💻'`.

### **String**

```grain
type String
```

The type of Grain strings, e.g. `"The quick brown fox jumps over the lazy dog."`.

### **Bytes**

```grain
type Bytes
```

The type of Grain byte sequences, e.g. `b"The quick brown fox jumps over the lazy dog."`

### **Void**

```grain
enum Void {
  void
}
```

The type of `void`, Grain's special type for indicating the absence of a meaningful value i.e. Grain's [unit type](https://en.wikipedia.org/wiki/Unit_type).

### **Option**

```grain
enum Option<a> {
  Some(a),
  None
}
```

The type of Grain options (e.g. `Some(1)` or `None`). The `a` is the type of the value. Options are analagous to nullable values in some other languages, but are much safer to work with due to the nullability being encoded explicitly in the type.

### **Result**

```grain
enum Result<t, e> {
  Ok(t),
  Err(e)
}
```

The type of Grain results (e.g. `Ok(1)` or `Err("Something went wrong")`). The `t` and `e` are the types of the value and error, respectively. This is useful for functions that might fail.

### **Array**

```grain
type Array<a>
```

The type of Grain arrays, e.g. `[> 1, 2, 3]`. Arrays are fixed-length and allow for efficient get/set operations at any index.

### **List**

```grain
type List<a>
```
The type of Grain lists (linked lists), e.g. `[1, 2, 3]`. Lists are immutable and allow for values to be efficiently appended.

### **Box**

```grain
type Box<a>
```

The type of Grain boxes. Boxes are wrappers that allow the internal data to be swapped during execution.

### **Rational**

```grain
type Rational
```

The type of Grain rationals, e.g. `2/3r`. Rationals are represented as a numerator and denominator.

### **Range**

```grain
record Range<a> {
  rangeStart: a,
  rangeEnd: a
}
```

A range of values, with a start and end value.

### **Number**

```grain
type Number
```

The type of Grain numbers, e.g. `42`, `0x2a`, `23.19`, `2/3`. Grain numbers can be arbitrarily large integers, floats, or rationals.

### **BigInt**

```grain
type BigInt
```

The type of arbitrarily large integers, e.g. `42t`, `9_223_372_036_854_775_808t`.

### **Int8**

```grain
type Int8
```

The type of 8-bit integers, e.g. `127s`, `-127s`, `0x01s`.

### **Uint8**

```grain
type Uint8
```

The type of 8-bit unsigned integers, e.g. `255us`, `42us`, `0x01us`.

### **Int16**

```grain
type Int16
```

The type of 16-bit integers, e.g. `32768S`, `-32768S`, `0x01S`.

### **Uint16**

```grain
type Uint16
```

The type of 16-bit unsigned integers, e.g. `65535uS`, `42uS`, `0x01uS`.
### **Int32**

```grain
type Int32
```

The type of 32-bit integers, e.g. `42l`, `0x2al`.

### **Uint32**

```grain
type Uint32
```

The type of 32-bit unsigned integers, e.g. `42ul`, `0x2aul`.

### **Int64**

```grain
type Int64
```

The type of 64-bit integers, e.g. `42L`, `0x2aL`.

### **Uint64**

```grain
type Uint64
```

The type of 64-bit unsigned integers, e.g. `42uL`, `0x2auL`.

### **Float32**

```grain
type Float32
```

The type of 32-bit floating-point numbers, e.g. `3.5f`.

### **Float64**

```grain
type Float64
```

The type of 64-bit floating-point numbers, e.g. `3.5d`.

### **Exception**

```grain
type Exception
```

The type of Grain exceptions. Exceptions represent errors that have occured in a program.
