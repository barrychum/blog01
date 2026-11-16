---
title: "Exchange commands"
date: 2013-09-10
categories: 
  - "exchange"
---

**Public folders** Get-MailPublicFolder Get-PublicFolder Get-PublicfolderClientPermission

**Export mailbox** New-MailboxExportRequest -Mailbox \-FilePath \-BadItemLimit 100 -AcceptLargeDataLoss

New-MailboxExportRequest -Mailbox \-IncludeFolders "#Contacts#" -ExcludeDumpster -FilePath \-BadItemLimit 100 -AcceptLargeDataLoss

**Mailbox permission** Add-MailboxPermission -Identity \-User \-AccessRights FullAccess -InheritanceType All

**Set out of office** Set-MailboxAutoReplyConfiguration -identity \-AutoReplyState disabled Get-InboxRule -Mailbox

**Message Tracking** Get-TransportServer |Get-MessageTrackingLog -Start "05/29/2012 08:00AM" -End "05/30/2012 01:00PM" -Recipient \-MessageSubject "subject"

**Check DAG member status**Get-MailboxServer (DatabaseCopyAutoActivationProlicy unrestricted = no in maint) Get-MailboxDatabaseCopyStatus -Server (check if there are database mounted) (Get-DatabaseAvailabilityGroup ).servers Move-ActiveMailboxDatabase \-ActivateOnServer \-MountDialOverride:None Get-MailboxDatabaseCopyStatus
