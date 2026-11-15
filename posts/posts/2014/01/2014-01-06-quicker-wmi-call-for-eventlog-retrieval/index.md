---
title: "Quicker wmi call for eventlog retrieval"
date: 2014-01-06
categories: 
  - "powershell"
---

 

```
$WmidtQueryDT = [System.Management.ManagementDateTimeConverter]::ToDmtfDateTime([DateTime]::Now.AddDays(-2))?
```

```
$qry = "select InsertionStrings,TimeGenerated from win32_ntlogevent where eventcode='1221' and logfile='Application' and TimeGenerated >='" + $WmidtQueryDT +"'"
```

```
$ServerWhitespace = get-wmiobject -query $qry -computername $server?

```
