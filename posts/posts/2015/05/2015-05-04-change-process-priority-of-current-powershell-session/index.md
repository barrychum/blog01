---
title: "Change process priority of current Powershell session"
date: 2015-05-04
categories: 
  - "powershell"
---

  (Get-Process -Id $pid).priorityclass = 'Normal' Idle, BelowNormal, Normal, AboveNormal, High,
