---
title: "robocopy"
date: 2017-07-14
categories: 
  - "reference"
---

 

```
robocopy /f delims^=^ eol^= %i in (dir.txt) ^
  do robocopy "s:\%i" "t:\%i" ^
  /s /e /dcopy:T /XA:SH /XJD /XJF /XD "mobilesync" "appdata" /XF "*.lrprev" /R:0 /log+:e:\log.log /NP
```
