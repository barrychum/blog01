---
title: "Configure ntp source for PDC"
date: 2015-12-23
categories: 
  - "tips-and-tricks"
  - "windows-fixes"
---

w32tm /config /manualpeerlist:<ip1,ip2,etc> /syncfromflags:MANUAL

w32tm /config /update

w32tm /resync

w32tm /query /configuration

w32tm /query /status

 

https://technet.microsoft.com/en-us/library/cc784553(v=WS.10).aspx
