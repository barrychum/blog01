---
title: "Sync Windows 2008 with ntp server"
date: 2014-04-01
categories: 
  - "tips-and-tricks"
---

  net stop w32time w32tm /config /syncfromflags:manual /manualpeerlist:time.nist.gov net start w32time Set PDC as a time source for clients w32tm /config /reliable:yes

Check w32tm configuraiton w32tm /query /configuration
