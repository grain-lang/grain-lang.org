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

The type of Grain booleans, i.e. the type of `true` and `false`.

### **Char**

```grain
type Char
```

The type of Grain Unicode characters, i.e. `'g'`, `'🌾'`, `'💻'`.

### **String**

```grain
type String
```

The type of Grain strings, i.e. `"The quick brown fox jumps over the lazy dog."`.

### **Bytes**

```grain
type Bytes
```

The type of Grain byte sequences.

### **Void**

```grain
enum Void {
  void
}
```

The type of `void`, also known as "unit" or "nothing".

### **Array**

```grain
type Array<a>
```

The type of Grain arrays, i.e. `[> 1, 2, 3]`. Arrays are fixed-length and allow for efficient get/set operations at any index.

### **Box**

```grain
type Box<a>
```

The type of Grain boxes. Boxes are wrappers that allow the internal data to be swapped during execution.

### **Number**

```grain
type Number
```

The type of Grain numbers, i.e. `42`, `0x2a`, `23.19`, `2/3`. Grain numbers can be arbitrarily large integers, floats, or rationals.

### **BigInt**

```grain
type BigInt
```

The type of arbitrarily large integers, i.e. `42t`, `9_223_372_036_854_775_808t`.

### **Int32**

```grain
type Int32
```

The type of 32-bit integers, i.e. `42l`, `0x2al`.

### **Int64**

```grain
type Int64
```

The type of 64-bit integers, i.e. `42L`, `0x2aL`.

### **Float32**

```grain
type Float32
```

The type of 32-bit floating-point numbers, i.e. `3.5f`.

### **Float64**

```grain
type Float64
```

The type of 64-bit floating-point numbers, i.e. `3.5d`.

### **Exception**

```grain
type Exception
```

The type of Grain exceptions. Exceptions represent errors that have occured in a program.
