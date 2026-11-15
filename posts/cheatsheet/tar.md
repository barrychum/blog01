---
title: "tar commands"
date: 2024-07-08
tags: 
  - "Cheatsheet/tar"
---
find . -mindepth 1 -exec tar -rvf archive.tar {} +


find . -mindepth 1 -type f -exec tar -rvf archive.tar {} \; -exec rm {} \;




find . -mindepth 1 \( -type f -o -type d \) -exec tar -rvf archive.tar {} \; -exec rm -rf {} +

tar tf archive.tar 

find . -depth -type d -empty -delete



```bash
find . -mindepth 1 -exec tar -rvf archive.tar {} +
```

Here's what each part of the command does:

- `find .`: Starts searching from the current directory (`a` in your case).
- `-mindepth 1`: Ensures that `find` does not include the starting directory itself in its output.
- `-exec tar -rvf archive.tar {} +`: Executes `tar` for each found file or directory (`{}`) and appends (`-r`) it to the `archive.tar` file (`-vf` specifies verbose and file name). The `+` at the end ensures that `tar` is called with as many files as possible at once, which is efficient for handling large numbers of files.

This command recursively finds all files and subfolders starting, adds them to `archive.tar`, and avoids including the tar file itself in the archive.

