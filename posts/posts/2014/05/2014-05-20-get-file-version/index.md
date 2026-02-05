---
title: "Get file version"
date: 2014-05-20
categories: 
  - "powershell"
---

To check the version a file using Powershell `Get-item "Path\To\File.dll" | select @{n="Filename";e={$_.name}},`
