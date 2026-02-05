---
title: "Powershell download files"
date: 2018-08-14
categories: 
  - "powershell"
---

 

```powershell
$url = "http://mirror.internode.on.net/pub/test/10meg.test"
$output = "$PSScriptRoot\10meg.test"
$start_time = Get-Date

$wc = New-Object System.Net.WebClient
$wc.DownloadFile($url, $output)
#OR
(New-Object System.Net.WebClient).DownloadFile($url, $output)

Write-Output "Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
```

Reference:

https://blog.jourdant.me/post/3-ways-to-download-files-with-powershell
