---
title: "Powershell datetime timezone"
date: 2017-09-19
categories: 
  - "powershell"
  - "scripts"
---

$zone = \[system.timezoneinfo\]::findsystemtimezonebyid("Central Standard Time") $zone = \[system.timezoneinfo\]::findsystemtimezonebyid("Tokyo Standard Time") \[system.timezoneinfo\]::converttimefromutc((get-date).touniversaltime(),$zone)

\[System.TimeZoneInfo\]::GetSystemTimeZones()

reference

https://stackoverflow.com/questions/12649055/create-datetime-object-of-other-timezone-in-powershell
