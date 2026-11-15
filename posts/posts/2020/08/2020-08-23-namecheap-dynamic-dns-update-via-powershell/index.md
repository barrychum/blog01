---
title: "Namecheap dynamic DNS update via Powershell"
date: 2020-08-23
---

```
$a="hostname"
$domain="domain.com"
$ip=$null
$password = "xxxxxxxxxx"

if ($ip) {
$url = "https://dynamicdns.park-your-domain.com/update?host=$a&domain=$domain&password=$password&ip=$ip"
} else {
$url = "https://dynamicdns.park-your-domain.com/update?host=$a&domain=$domain&password=$password"
}

$url

invoke-webrequest $url
```
