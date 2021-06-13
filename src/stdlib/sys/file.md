---
title: Sys/File
---

This module provides utilities to access the filesystem.

Many of the functions in this module are not intended to be used directly, but rather for other libraries to be built on top of them.

```grain
import File from "sys/file"
```

## Types

### File.**FileDescriptor**

```grain
enum FileDescriptor { FileDescriptor(Number) }
```

A FileDescriptor represents a handle to an open file on the system.

### File.**LookupFlag**

```grain
enum LookupFlag {
  // Follow symlinks
  SymlinkFollow
}
```

These flags determine how paths should be resolved when looking up a file or directory.

### File.**OpenFlag**

```grain
enum OpenFlag {
  // Create file if it does not exist.
  Create,
  // Fail if not a directory.
  Directory,
  // Fail if file already exists.
  Exclusive,
  // Truncate file to size 0.
  Truncate,
}
```

These flags determine how a file or directory should be opened.

### File.**Rights**

```grain
enum Rights {
  // The right to invoke `fdDatasync`.
  // If `PathOpen` is set, includes the right to invoke
  // `pathOpen` with `FdFlag::Dsync`.
  FdDatasync,
  // The right to invoke `fdRead`.
  // If `Rights::FdSeek` is set, includes the right to invoke `fdPread`.
  FdRead,
  // The right to invoke `fdSeek`. This flag implies `Rights::FdTell`.
  FdSeek,
  // The right to invoke `fdSetFlags`.
  FdSetFlags,
  // The right to invoke `fdSync`.
  // If `PathOpen` is set, includes the right to invoke
  // `pathOpen` with `FdFlag::Rsync` and `FdFlag::Dsync`.
  FdSync,
  // The right to invoke `fdSeek` in such a way that the file offset
  // remains unaltered (i.e., `Whence::Current` with offset zero), or to
  // invoke `fdTell`.
  FdTell,
  // The right to invoke `fdWrite`.
  // If `Rights::FdSeek` is set, includes the right to invoke `fdPwrite`.
  FdWrite,
  // The right to invoke `fdAdvise`.
  FdAdvise,
  // The right to invoke `fdAllocate`.
  FdAllocate,
  // The right to invoke `pathCreateDirectory`.
  PathCreateDirectory,
  // If `PathOpen` is set, the right to invoke `pathOpen`
  // with `OpenFlag::Create`.
  PathCreateFile,
  // The right to invoke `pathLink` with the file descriptor as the
  // source directory.
  PathLinkSource,
  // The right to invoke `pathLink` with the file descriptor as the
  // target directory.
  PathLinkTarget,
  // The right to invoke `pathOpen`.
  PathOpen,
  // The right to invoke `fdReaddir`.
  FdReaddir,
  // The right to invoke `pathReadlink`.
  PathReadlink,
  // The right to invoke `pathRename` with the file descriptor as the
  // source directory.
  PathRenameSource,
  // The right to invoke `pathRename` with the file descriptor as the
  // target directory.
  PathRenameTarget,
  // The right to invoke `pathFilestats`.
  PathFilestats,
  // The right to change a file's size (there's no `pathSetSize`).
  // If `PathOpen` is set, includes the right to invoke `pathOpen` with
  // `OpenFlag::Truncate`.
  PathSetSize,
  // The right to invoke `pathSetAccessTime`, `pathSetAccessTimeNow`,
  // `pathSetModifiedTime`, or `pathSetModifiedTimeNow`.
  PathSetTimes,
  // The right to invoke `fdFilestats`.
  FdFilestats,
  // The right to invoke `fdSetSize`.
  FdSetSize,
  // The right to invoke `fdSetAccessTime`, `fdSetAccessTimeNow`,
  // `fdSetModifiedTime`, or `fdSetModifiedTimeNow`.
  FdSetTimes,
  // The right to invoke `pathSymlink`.
  PathSymlink,
  // The right to invoke `pathRemoveDirectory`.
  PathRemoveDirectory,
  // The right to invoke `pathUnlinkFile`.
  PathUnlinkFile,
  // If `Rights::FdRead` is set, includes the right to invoke
  // `pollOneoff` (not yet implemented) to subscribe to `EventType::FdRead`.
  // If `Rights::FdWrite` is set, includes the right to invoke
  // `pollOneoff` (not yet implemented) to subscribe to `EventType::FdWrite`.
  PollFdReadwrite,
  // The right to invoke `sockShutdown` (not yet implemented).
  SockShutdown,
}
```

These flags determine which rights a `FileDescriptor` should have and which rights new `FileDescriptor`s should inherit from this `FileDescriptor`.

### File.**FdFlag**

```grain
enum FdFlag {
  // Append mode: Data written to the file is always appended to the file's end.
  Append,
  // Write according to synchronized I/O data integrity completion.
  // Only the data stored in the file is synchronized.
  Dsync,
  // Non-blocking mode.
  Nonblock,
  // Synchronized read I/O operations.
  Rsync,
  // Write according to synchronized I/O file integrity completion. In
  // addition to synchronizing the data stored in the file, the implementation
  // may also synchronously update the file's metadata.
  Sync,
}
```

These flags determine the mode(s) that a file descriptor operates in.

### File.**Filetype**

```grain
enum Filetype {
  // The type of the file descriptor or file is unknown or is different from any
  // of the other types specified.
  Unknown,
  // The file descriptor or file refers to a block device inode.
  BlockDevice,
  // The file descriptor or file refers to a character device inode.
  CharacterDevice,
  // The file descriptor or file refers to a directory inode.
  Directory,
  // The file descriptor or file refers to a regular file inode.
  RegularFile,
  // The file descriptor or file refers to a datagram socket.
  SocketDatagram,
  // The file descriptor or file refers to a byte-stream socket.
  SocketStream,
  // The file refers to a symbolic link inode.
  SymbolicLink,
}
```

The type of file a `FileDescriptor` refers to.

### File.**Whence**

```grain
enum Whence {
  // Seek relative to start-of-file.
  Set,
  // Seek relative to current position.
  Current,
  // Seek relative to end-of-file.
  End,
}
```

These flags determine where seeking should begin in a file.

### File.**Stats**

```grain
record Stats {
  filetype: Filetype,
  flags: List<FdFlag>,
  rights: List<Rights>,
  rightsInheriting: List<Rights>
}
```

Information about a `FileDescriptor`.

### File.**Filestats**

```grain
record Filestats {
  device: Int64,
  inode: Int64,
  filetype: Filetype,
  linkcount: Int64,
  size: Int64,
  accessed: Int64,
  modified: Int64,
  changed: Int64
}
```

Information about the file that a `FileDescriptor` refers to.

### File.**DirectoryEntry**

```grain
record DirectoryEntry {
  inode: Int64,
  filetype: Filetype,
  path: String
}
```

An entry in a directory.

## Values

### File.**stdin**

```grain
stdin : FileDescriptor
```

The `FileDescriptor` for `stdin`.

### File.**stdout**

```grain
stdout : FileDescriptor
```

The `FileDescriptor` for `stdout`.

### File.**stderr**

```grain
stderr : FileDescriptor
```

The `FileDescriptor` for `stderr`.

### File.**pwdfd**

```grain
pwdfd : FileDescriptor
```

The `FileDescriptor` for the current working directory of the process.

### File.**pathOpen**

```grain
pathOpen : (
  FileDescriptor,
  List<LookupFlag>,
  String,
  List<OpenFlag>,
  List<Rights>,
  List<Rights>,
  List<FdFlag>
) -> FileDescriptor
```

Open a file or directory.

Parameters:

|name|type|desc|
|-|-|-|
|dirFd| |The directory in which path resolution starts|
|dirFlags| |Flags which affect path resolution|
|path| |The path to the file or directory|
|openFlags| |Flags that decide how the path will be opened|
|rights| |The rights that dictate what may be done with the returned file descriptor|
|rightsInheriting| |The rights that dictate what may be done with file descriptors derived from this file descriptor|
|flags| |Flags which affect read/write operations on this file descriptor|

Returns a `FileDescriptor` for the opened file or directory.

### File.**fdRead**

```grain
fdRead : (FileDescriptor, Number) -> (String, Number)
```

Read from a file descriptor.

Parameters:

- *fd:* FileDescriptor The file descriptor to read from
- *size:* Number The maximum number of bytes to read from the file descriptor

Returns the bytes read and the number of bytes read.

### File.**fdPread**

```grain
fdPread : (FileDescriptor, Int64, Number) -> (String, Number)
```

Read from a file descriptor without updating the file descriptor's offset.

- *fd:* The file descriptor to read from
- *offset:* The position within the file to begin reading
- *size:* The maximum number of bytes to read from the file descriptor

Returns the bytes read and the number of bytes read.

### File.**fdWrite**

```grain
fdWrite : (FileDescriptor, String) -> Number
```

Write to a file descriptor.

Parameters:

- *fd:* The file descriptor to which data will be written
- *data:* The data to be written

Returns the number The number of bytes written.

### File.**fdPwrite**

```grain
fdPwrite : (FileDescriptor, String, Int64) -> Number
```

Write to a file descriptor without updating the file descriptor's offset.

Parameters:

- *fd:* The file descriptor to which data will be written
- *data:* The data to be written
- *offset:* The position within the file to begin writing

Returns the number The number of bytes written.

### File.**fdAllocate**

```grain
fdAllocate : (FileDescriptor, Int64, Int64) -> Void
```

Allocate space within a file.

Parameters:

- *fd:* The file descriptor in which space will be allocated
- *offset:* The position within the file to begin writing
- *size:* The number of bytes to allocate

### File.**fdClose**

```grain
fdClose : (FileDescriptor) -> Void
```

Close a file descriptor.

Parameters:

- *fd:* The file descriptor to close

### File.**fdDatasync**

```grain
fdDatasync : (FileDescriptor) -> Void
```

Synchronize the data of a file to disk.

Parameters:

- *fd:* The file descriptor to synchronize

### File.**fdSync**

```grain
fdSync : (FileDescriptor) -> Void
```

Synchronize the data and metadata of a file to disk.

Parameters:

- *fd:* The file descriptor to synchronize

### File.**fdStats**

```grain
fdStats : (FileDescriptor) -> FdStats
```

Retrieve information about a file descriptor.

Parameters:

- *fd:* The file descriptor of which to retrieve information

Returns a record containing the filetype, flags, rights, and inheriting rights associated with the file descriptor.

### File.**fdSetFlags**

```grain
fdSetFlags : (FileDescriptor, List<FdFlag>) -> Void
```

Update the flags associated with a file descriptor.

Parameters:

- *fd:* The file descriptor to update flags
- *flags:* The flags to apply to the file descriptor

### File.**fdSetRights**

```grain
fdSetRights : (FileDescriptor, List<Rights>, List<Rights>) -> Void
```

Update the rights associated with a file descriptor.

Parameters:

- *fd:* The file descriptor to update rights
- *rights:* Rights to apply to the file descriptor
- *rightsInheriting:* Inheriting rights to apply to the file descriptor

### File.**fdFilestats**

```grain
fdFilestats : (FileDescriptor) -> Filestats
```

Retrieve information about a file.

Parameters:

- *fd:* The file descriptor of the file to retrieve information

Returns a record containing the information about the file.

### File.**fdSetSize**

```grain
fdSetSize : (FileDescriptor, Int64) -> Void
```

Set (truncate) the size of a file.

Parameters:

- *fd:* The file descriptor of the file to truncate
- *size:* The number of bytes to retain in the file

### File.**fdSetAccessTime**

```grain
fdSetAccessTime : (FileDescriptor, Int64) -> Void
```

Set the access (created) time of a file.

Parameters:

- *fd:* The file descriptor of the file to update
- *timestamp:* The time to set

### File.**fdSetAccessTimeNow**

```grain
fdSetAccessTimeNow : (FileDescriptor) -> Void
```

Set the access (created) time of a file to the current time.

Parameters:

- *fd:* The file descriptor of the file to update

### File.**fdSetModifiedTime**

```grain
fdSetModifiedTime : (FileDescriptor, Int64) -> Void
```

Set the modified time of a file.

Parameters:

- *fd:* The file descriptor of the file to update
- *timestamp:* The time to set

### File.**fdSetModifiedTimeNow**

```grain
fdSetModifiedTimeNow : (FileDescriptor) -> Void
```

Set the modified time of a file to the current time.

Parameters:

- *fd:* The file descriptor of the file to update

### File.**fdReaddir**

```grain
fdReaddir : (FileDescriptor) -> Array<DirectoryEntry>
```

Read the entries of a directory.

Parameters:

- *fd:* The directory to read.

Returns an array of records containing information about each entry in the directory.

### File.**fdRenumber**

```grain
fdRenumber : (FileDescriptor, FileDescriptor) -> Void
```

Atomically replace a file descriptor by renumbering another file descriptor.

Parameters:

- *fromFd:* The file descriptor to renumber
- *toFd:* The file descriptor to overwrite

### File.**fdSeek**

```grain
fdSeek : (FileDescriptor, Int64, Whence) -> Int64
```

Update a file descriptor's offset.

Parameters:

- *fd:* The file descriptor to operate on
- *offset:* The number of bytes to move the offset
- *whence:* The location from which the offset is relative

Returns the new offset of the file descriptor, relative to the start of the file.

### File.**fdTell**

```grain
fdTell : (FileDescriptor) -> Int64
```

Read a file descriptor's offset.

Parameters:

- *fd:* The file descriptor to read the offset

Returns the offset of the file descriptor, relative to the start of the file.

### File.**pathCreateDirectory**

```grain
pathCreateDirectory : (FileDescriptor, String) -> Void
```

Create a directory.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *path:* The path to the new directory

### File.**pathFilestats**

```grain
pathFilestats : (FileDescriptor, List<LookupFlag>, String) -> Filestats
```

Retrieve information about a file.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *dirFlags:* Flags which affect path resolution
- *path:* The path to retrieve information about

Returns a record containing information about the file.

### File.**pathSetAccessTime**

```grain
pathSetAccessTime : (FileDescriptor, List<LookupFlag>, String, Int64) -> Void
```

Set the access (created) time of a file.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *dirFlags:* Flags which affect path resolution
- *path:* The path to set the time
- *timestamp:* The time to set

### File.**pathSetAccessTimeNow**

```grain
pathSetAccessTimeNow : (FileDescriptor, List<LookupFlag>, String) -> Void
```

Set the access (created) time of a file to the current time.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *dirFlags:* Flags which affect path resolution
- *path:* The path to set the time

### File.**pathSetModifiedTime**

```grain
pathSetModifiedTime : (FileDescriptor, List<LookupFlag>, String, Int64) -> Void
```

Set the modified time of a file.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *dirFlags:* Flags which affect path resolution
- *path:* The path to set the time
- *timestamp:* The time to set

### File.**pathSetModifiedTimeNow**

```grain
pathSetModifiedTimeNow : (FileDescriptor, List<LookupFlag>, String) -> Void
```

Set the modified time of a file to the current time.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *dirFlags:* Flags which affect path resolution
- *path:* The path to set the time

### File.**pathLink**

```grain
pathLink : (FileDescriptor, List<LookupFlag>, String, FileDescriptor, String) -> Void
```

Create a hard link.

Parameters:

- *sourceFd:* The file descriptor of the directory in which the source path resolution starts
- *dirFlags:* Flags which affect path resolution
- *sourcePath:* The path to the source of the link
- *targetFd:* The file descriptor of the directory in which the target path resolution starts
- *targetPath:* The path to the target of the link

### File.**pathSymlink**

```grain
pathSymlink : (FileDescriptor, String, String) -> Void
```

Create a symlink.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *sourcePath:* The path to the source of the link
- *targetPath:* The path to the target of the link

### File.**pathUnlink**

```grain
pathUnlink : (FileDescriptor, String) -> Void
```

Unlink a file.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *path:* The path of the file to unlink

### File.**pathReadlink**

```grain
pathReadlink : (FileDescriptor, String, Number) -> (String, Number)
```

Read the contents of a symbolic link.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *path:* The path to the symlink
- *size:* number of bytes to read

Returns the bytes read and the number of bytes read.

### File.**pathRemoveDirectory**

```grain
pathRemoveDirectory : (FileDescriptor, String) -> Void
```

Remove a directory.

Parameters:

- *fd:* The file descriptor of the directory in which path resolution starts
- *path:* The path to the directory to remove

### File.**pathRename**

```grain
pathRename : (FileDescriptor, String, FileDescriptor, String) -> Void
```

Rename a file or directory.

Parameters:

- *sourceFd:* The file descriptor of the directory in which the source path resolution starts
- *sourcePath:* The path of the file to rename
- *targetFd:* The file descriptor of the directory in which the target path resolution starts
- *targetPath:* The new path of the file
