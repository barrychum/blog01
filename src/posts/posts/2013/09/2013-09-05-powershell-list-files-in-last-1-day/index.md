---
title: "Powershell list files in last 1 day"
date: 2013-09-05
categories: 
  - "powershell"
tags: 
  - "powershell-2"
  - "tips"
---

get-childitem | where { $\_.lastwritetime -ge (get-date).adddays(-1) }
