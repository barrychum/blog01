---
title: "Update enom ddns using Powershell"
date: 2016-09-03
categories: 
  - "powershell"
  - "scripts"
---

`$html = Invoke-WebRequest 'http://checkip.dyndns.com' $regex = '([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})' $regex = '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' $regex = '\d{1,3}(\.\d{1,3}){3}' $regex = '(\d{1,3}\.){3}\.\d{1,3}'`

$regex = '\\b((25\[0-5\]|2\[0-4\]\[0-9\]|\[01\]?\[0-9\]\[0-9\]?)\\.){3} (25\[0-5\]|2\[0-4\]\[0-9\]|\[01\]?\[0-9\]\[0-9\]?)\\b'

$found = ($html.allelements | ? {$\_.tagname -eq 'body'}).innertext -match $regex $IPv4 = $matches\[0\]

$HostName = "hostname" $DomainName = "domain.com" $Password = "DomainAccessPassword"

$enomclient = New-Object System.Net.WebClient \[System.Net.ServicePointManager\]::ServerCertificateValidationCallback = {$true} $dynupdateurl = "https://dynamic.name-services.com/interface.asp?Command=SetDNSHost&HostName=" + $HostName $dynupdateurl += "&Zone=" + $DomainName $dynupdateurl += "&DomainPassword=" + $Password $dynupdateurl += "&Address=" + $IPv4

$result = $enomclient.DownloadString($dynupdateurl) $enomclient.dispose()
