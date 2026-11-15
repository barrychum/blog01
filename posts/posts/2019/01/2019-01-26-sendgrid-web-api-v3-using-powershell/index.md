---
title: "Sendgrid web API v3 using Powershell"
date: 2019-01-26
---

$headers = @{} $headers.add("Content-Type","application/json") $headers.add("Authorization","Bearer password")

$todoc = @() $todoc += \[pscustomobject\]@{"email"="receiver@domain.com";"name"="receiver name"}

$personalizationsdoc = @() $personalizationsdoc += \[pscustomobject\]@{"to"=$todoc;"subject"="subject"}

$fromdoc = \[pscustomobject\]@{"email"="sender@domain.com";"name"="sender name"}

$replydoc = \[pscustomobject\]@{"email"="sender@domain.com";"name"="sender name"}

$contentdoc = @() $contentdoc += \[pscustomobject\]@{"type"="text/plain";"value"="hello"}

$r = \[pscustomobject\]@{"personalizations"=$personalizationsdoc;"from"=$fromdoc;"reply\_to"=$replydoc;"content"=$contentdoc} | ConvertTo-Json -depth 4

$m = 'POST' $u = 'https://api.sendgrid.com/v3/mail/send' Invoke-WebRequest -Method $m -Uri $u -Body $c -Headers $headers
