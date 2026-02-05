---
title: "A fast alternative for Get-ChildItem"
date: 2014-05-21
categories: 
  - "powershell"
  - "scripts"
---

```
[reflection.assembly]::loadwithpartialname("Microsoft.VisualBasic") | Out-Null
```

```
[Microsoft.VisualBasic.FileIO.FileSystem]::GetFiles($Path,[Microsoft.VisualBasic.FileIO.SearchOption]::SearchAllSubDirectories,
```
