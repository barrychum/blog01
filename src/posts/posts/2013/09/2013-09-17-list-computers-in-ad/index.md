---
title: "List computers in AD"
date: 2013-09-17
categories: 
  - "powershell"
---

(\[adsisearcher\]"objectCategory=computer").findall() | foreach-object {($\_.properties).cn}
