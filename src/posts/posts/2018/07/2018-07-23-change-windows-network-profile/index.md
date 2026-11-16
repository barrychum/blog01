---
title: "Change Windows network profile"
date: 2018-07-23
---

```
PS C:\>$Profile = Get-NetConnectionProfile -InterfaceAlias Ethernet1

PS C:\>$Profile.NetworkCategory = "Private"

PS C:\>Set-NetConnectionProfile -InputObject $Profile
```
