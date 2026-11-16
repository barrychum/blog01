---
title: "Powershell parameter splatting"
date: 2015-06-16
categories: 
  - "powershell"
---

```
$parms = @{'class'='Win32_BIOS';
'computername'='SERVER-R2';
'filter'='drivetype=3';
'credential'='Administrator'
}
Get-WmiObject @parms

$parms.computername='SERVER-R3'
$parms.remove('filter')
```

https://technet.microsoft.com/en-us/magazine/gg675931.aspx https://technet.microsoft.com/en-us/library/ee692803.aspx
