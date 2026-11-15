---
title: "Powershell to check volume space"
date: 2013-09-10
categories: 
  - "powershell"
---

get-wmiobject win32\_volume -computername | select name, @{expression={$\_.capacity/1GB}}, @{expression={$\_.freespace/1GB}}, @{name="PercentFree";expression={$\_.freespace/$\_.capacity\*100}}
