---
title: "Powershell get installed applications"
date: 2020-08-23
---

```
$32app = Get-ItemProperty HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, @{label="Bit";expression={"32"}}| ? {$_.displayname } | sort displayname
$64app = Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate, @{label="Bit";expression={"64"}} | ? {$_.displayname} | sort displayname
```
