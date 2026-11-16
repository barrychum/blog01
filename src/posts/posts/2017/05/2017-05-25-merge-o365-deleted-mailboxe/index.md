---
title: "Merge O365 deleted mailboxe"
date: 2017-05-25
categories: 
  - "exchange"
---

Procedure to copy the data from Deleted Mailbox to Active Mailbox.

1) Start Windows PowerShell Start > search for "PowerShell" > Start Windows PowerShell by clicking on "Run as Administrator".

2) Connect the Windows PowerShell to Office 365 Exchange Online Jump . ?Please execute below command in PowerShell.

$LiveCred = Get-Credential (Supply Exchange Online Admin? log in credentials in the prompt window)

Set-ExecutionPolicy Unrestricted (Proceed with Y if prompted)

$Session = New-PSSession -ConfigurationName Microsoft.Exchange -ConnectionUri https://ps.outlook.com/powershell/ Jump -Credential $LiveCred -Authentication Basic -AllowRedirection

Import-PSSession $Session

3) Verify if the old mailbox is in deleted state.

Get-Mailbox -SoftDeletedMailbox accounts

4) If the Mailbox is found collect the ExchangeGuid of the deleted Mailbox. (Get-Mailbox -SoftDeletedMailbox Deleted\_User\_Alias@domain.com).ExchangeGuid

5) Collect the ExchangeGuid of the Active Mailbox. (Get-Mailbox ACTIVE\_USER\_ALIAS@domain.com).ExchangeGuid

6) Now copy the data from the deleted mailbox to the new Mailbox.

New-MailboxRestoreRequest -SourceMailbox "Guid of Deleted Mailbox copied from step 4" -TargetMailbox "Guid of Deleted Mailbox copied from step 5" -AllowLegacyDNMismatch -verbose

7) Monitor the same.

Get-MailboxRestoreRequest

8) Once it is completed all the data would be moved to the new one.
