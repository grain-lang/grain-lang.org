---
title: Sys/Process
---

This module provides utilities to access functionality and information about the Grain program's process. This includes things like accessing environment variables and sending signals.

```grain
import Process from "sys/process"
```

## Types

### Process.**Signal**

```grain
enum Signal {
  // Hangup.
  HUP,
  // Terminate interrupt signal.
  INT,
  // Terminal quit signal.
  QUIT,
  // Illegal instruction.
  ILL,
  // Trace/breakpoint trap.
  TRAP,
  // Process abort signal.
  ABRT,
  // Access to an undefined portion of a memory object.
  BUS,
  // Erroneous arithmetic operation.
  FPE,
  // Kill.
  KILL,
  // User-defined signal 1.
  USR1,
  // Invalid memory reference.
  SEGV,
  // User-defined signal 2.
  USR2,
  // Write on a pipe with no one to read it.
  PIPE,
  // Alarm clock.
  ALRM,
  // Termination signal.
  TERM,
  // Child process terminated, stopped, or continued.
  CHLD,
  // Continue executing, if stopped.
  CONT,
  // Stop executing.
  STOP,
  // Terminal stop signal.
  TSTP,
  // Background process attempting read.
  TTIN,
  // Background process attempting write.
  TTOU,
  // High bandwidth data is available at a socket.
  URG,
  // CPU time limit exceeded.
  XCPU,
  // File size limit exceeded.
  XFSZ,
  // Virtual timer expired.
  VTALRM,
  PROF,
  WINCH,
  POLL,
  PWR,
  // Bad system call.
  SYS,
}
```

Signals that can be sent to the host system.

## Values

### Process.**argv**

```grain
argv : () -> Array<String>
```

Access command line arguments.

Returns the positional string arguments to the process.

### Process.**env**

```grain
env : () -> Array<String>
```

Access environment variables.

Returns the environment variables supplied to the process.

### Process.**exit**

```grain
exit : (Number) -> Void
```

Terminate the process normally.

Parameters:

- *code:* The value to exit with. An exit code of 0 is considered normal, with other values having meaning depending on the platform

### Process.**sigRaise**

```grain
sigRaise : (Signal) -> Void
```

Send a signal to the process of the calling thread.

Parameters:

- *signal:* The signal to send

### Process.**schedYield**

```grain
schedYield : () -> Void
```

Yield execution to the calling thread.
