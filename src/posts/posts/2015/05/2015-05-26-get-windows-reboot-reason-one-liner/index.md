---
title: "Get Windows reboot reason one-liner"
date: 2015-05-26
categories: 
  - "tips-and-tricks"
---

PS> Get-WinEvent -FilterHashtable @{logname='System';id=1074} | select @{n="Time";e={ $\_.timecreated }}, @{n="Reason";e={$\_.properties\[2\].value}}, @{n="user";e={$\_.properties\[6\].value}} , @{n="Action";e={$\_.properties\[4\].value}}, @{n="Comment";e={$\_.properties\[5\].value}}, @{n="Code";e={$\_.properties\[3\].value}},
