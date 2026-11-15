---
title: "robocopy cheatsheet"
date: 2019-07-22
---

```
for /f delims^=^ eol^= %%i in (4T.txt) 
do robocopy "f:\%%i" "e:\4TB\%%i" /s /e /dcopy:T /XA:SH /XJD /XJF /XD "mobilesync" "appdata" /XF "*.lrprev" /R:0
```
