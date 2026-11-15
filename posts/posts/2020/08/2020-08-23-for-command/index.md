---
title: "for command"
date: 2020-08-23
---

```
for /f %i in (a.txt) do echo %i

robocopy /s /e /dcopy:T

for /f %i in (a.txt) do robocopy /s /e /dcopy:T "c:\%i" "e:\backup.20140810\%i"
```
