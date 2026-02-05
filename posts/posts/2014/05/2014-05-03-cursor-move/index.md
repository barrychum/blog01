---
title: "Cursor move"
date: 2014-05-03
categories: 
  - "powershell"
---

```
[system.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") | out-null $Pos = [System.Windows.Forms.Cursor]::Position [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point((($Pos.X) + 2) ,
```
