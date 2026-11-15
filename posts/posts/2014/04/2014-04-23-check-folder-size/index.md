---
title: "Check folder size"
date: 2014-04-23
categories: 
  - "powershell"
  - "scripts"
---

gci -Recurse | ? {!$\_.psiscontainer} | group-object psparentpath | % { New-Object psobject -Property @{Item=$\_.name;sum=($\_.group | Measure-Object length -sum).sum } } | ft -auto
