---
title: "Fix Exchange 2010 Content Index failed"
date: 2013-09-17
categories: 
  - "exchange"
---

Get-MailboxDatabaseCopyStatus \* | where {$\_.ContentIndexState -eq "Failed"}

Get-MailboxDatabaseCopyStatus \* | where {$\_.ContentIndexState -eq "Failed"} | Update-MailboxDatabaseCopy -CatalogOnly
