---
title: "Exchange databasecopy settings"
date: 2013-10-18
categories: 
  - "exchange"
---

(Get-MailboxDatabase <xxxx>).databasecopies

?Set-MailboxDatabaseCopy -Identity dbserver -ActivationPreference 1

Set-MailboxDatabaseCopy -Identity xxxxxserver -ReplayLagTime 2.00:00:00
