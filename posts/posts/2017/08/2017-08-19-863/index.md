---
title: "Local Powershell repository cheatsheet"
date: 2017-08-19
categories: 
  - "powershell"
  - "scripts"
---

requirement : Powershell v5 or above, or PowershellGet module for Powershell v3 and v4

Create Powershell modules (psm1) and manifest (psd1). new-modulemanifest

FunctionsToExport, ModuleToProcess, FileList

https://msdn.microsoft.com/en-us/library/dd878337(v=vs.85).aspx

Create a directory share (editable by module owner and read only by others)

```
$path = '\\shared IP\PSRepository'
Register-PSRepository -Name <Local Repository name> -SourceLocation $path -InstallationPolicy Trusted
Get-PSRepository
Publish-Module -Name <my module name> -Repository <Local repository name> -Verbose
or
Publish-Module -Path <path to psd1 and psm1> -Repository <local repository name> -Verbose
Find-Module -Repository <Local repository name>
Install-Module -Name <my module name> -Repository <Local repository name> -Scope CurrentUser

```

New-ScriptFileInfo -Path "c:\\pstools\\b.ps1" -Version 1.0 -Author "test@microsoft.com" -Description "my test" Test-ScriptFileInfo -Path C:\\pstools\\b.ps1 Get-PSRepository Publish-Script -Repository LocalRepository -Path C:\\pstools\\b.ps1 Find-Script -Repository LocalRepository Install-Script -Repository LocalRepository -Name b -Scope CurrentUser
