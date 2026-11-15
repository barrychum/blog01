---
title: "find text in files on Linux"
date: 2016-05-15
categories: 
  - "tips-and-tricks"
  - "unix-linux"
---

```
grep --include=\*.{c,h} -irnwl '/path/to/somewhere/' -e "pattern" 
```

- `i` stands for ignore case.
- r stands for recursive.
- `n` is line number, and
- w is whole word
- `l` stands for "show the file name,
