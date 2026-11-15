---
title: "Update schedule task credential using Powershell v2"
date: 2014-01-23
categories: 
  - "powershell"
  - "scripts"
---

 

Reference

\>http://windowsitpro.com/scripting/updating-scheduled-tasks-credentials

 

To list scheduled tasks that under a particular credential

```
$schedule = new-object -com("Schedule.Service")
```

```
$schedule.connect("servername")?
```

```
$tasks = $schedule.getfolder("").gettasks(0)
```

```
$tasks | ? {([xml]$_.xml).task.principals.principal.userid -eq "userid" } | SELECT name
```

or

```
$tasks |select Name,@{Name="RunAs";Expression={([xml]$_.xml).Task.Principals.principal.userID}}
```

To list scheduled tasks locally using schtasks.exe

```
schtasks /query /fo csv | convertfrom-csv
```
