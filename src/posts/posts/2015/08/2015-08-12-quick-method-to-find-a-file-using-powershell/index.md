---
title: "Quick method to find a file using Powershell"
date: 2015-08-12
categories: 
  - "tips-and-tricks"
---

 

Get-Wmiobject -Query "Select \* from CIM\_DataFile Where Extension = 'exe' and Filename = 'java'"
