---
title: Queue
---

An immutable queue implementation. A queue is a FIFO (first-in-first-out) data structure where new values are added to the end and retrieved or removed from the beginning.

```grain
import Queue from "queue"
```

## Values

### Queue.**make**

```grain
make : () -> Queue<a>
```

Creates a new queue.

### Queue.**isEmpty**

```grain
isEmpty : Queue<a> -> Bool
```

Checks if the given queue contains no elements.

### Queue.**head**

```grain
head : Queue<a> -> Option<a>
```

Returns `Some(item)` with the next item in the queue, or `None` if the queue is empty.

### Queue.**enqueue**

```grain
enqueue : (a, Queue<a>) -> Queue<a>
```

Adds an item to the end of the queue.

### Queue.**dequeue**

```grain
dequeue : Queue<a> -> Queue<a>
```

Removes the next item in the queue.

### Queue.**size**

```grain
size : Queue<a> -> Number
```

Computes the size of the input queue.
