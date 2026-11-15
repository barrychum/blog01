---
title: "Create Windows Event from Powershell"
date: 2014-11-26
categories: 
  - "powershell"
---

New-EventLog -LogName ScriptingGuys -Source scripts Get-EventLog -LogName scriptingguys Write-EventLog -LogName ScriptingGuys -Source scripts -Message "Event message" -EventId 123 -EntryType Information Remove-EventLog -LogName ScriptingGuys

or use command line eventcreate /L ScriptingGuys /T INFORMATION /ID 222 /D Test

Reference http://blogs.technet.com/b/heyscriptingguy/archive/2013/02/01/use-powershell-to-create-and-to-use-a-new-event-log.aspx http://technet.microsoft.com/en-us/library/hh849768.aspx http://technet.microsoft.com/en-us/library/hh849786.aspx
