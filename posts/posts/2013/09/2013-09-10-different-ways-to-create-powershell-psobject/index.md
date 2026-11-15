---
title: "Different ways to create Powershell psobject"
date: 2013-09-10
categories: 
  - "powershell"
---

**Quickest method to create object for data collection** $obj = "" | select prop1, prop2

**Proper method to create object** $obj = New-Object PSObject Add-Member -InputObject $obj -MemberType NoteProperty -Name customproperty -Value ""

**Hash method** $props = @{ Property1 = 'one' Property2 = 'two' Property3 = 'three' } $object = new-object psobject -Property $props

**Hash method only valid in Powershell v3** $obj = \[PSCustomObject\]@{ Property1 = 'one' Property2 = 'two' Property3 = 'three' }

**Method to include a script block** $numbers = New-Module -AsCustomObject -ScriptBlock { \[int\]$n1=$null Function Sqr { \[math\]::pow($n1,2) } Export-ModuleMember -Variable \* -Function \*}

$numbers.n1 = 5 $numbers.Sqr()

**Reference** http://social.technet.microsoft.com/wiki/contents/articles/7804.powershell-creating-custom-objects.aspx
