---
title: Basic types
---

Grain provides some basic types to be used throughout your programs.

### **Number**

```grain
type Number
```

The type of Grain numbers, i.e. `42`, `0x2a`. Grain numbers can be integers, floats, rationals, or "big integers".

### **Bool**

```grain
enum Bool {
  true,
  false
}
```

The type of Grain booleans, i.e. the type of `true` and `false`.

### **String**

```grain
type String
```

The type of Grain strings, i.e. `"The quick brown fox jumps over the lazy dog."`.

### **Void**

```grain
enum Void {
  void
}
```

The type of `void`, also known as "nothing".

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
