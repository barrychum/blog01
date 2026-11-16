---
title: "Powershell performance suggestions"
date: 2016-05-21
categories: 
  - "powershell"
  - "tips-and-tricks"
---

- Replace array with psobject
    - $Array = New-Object System.Collections.Generic.List\[psobject\]
    - $Array.Add($row)
- Use -filter instead of where
- Use foreach-object instead of foreach (http://social.technet.microsoft.com/Forums/en-US/e8da8249-ea91-4772-ae85-582a4b37425b/powershell-foreachobject-vs-foreach)
- Use multi-thread (start-job / -asjob)

Use measure-command to check script block performance
