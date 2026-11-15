---
title: "Windows workstation shares timeout"
date: 2014-05-19
categories: 
  - "tips-and-tricks"
  - "windows-fixes"
---

Locate this key: HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management\\LargeSystemCache By default this value is set to "0". Change this to "1" Now go to this key HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters\\Size By default this value is to ????
