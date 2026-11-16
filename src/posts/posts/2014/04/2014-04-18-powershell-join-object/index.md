---
title: "Powershell join-object"
date: 2014-04-18
categories: 
  - "powershell"
---

http://blogs.msdn.com/b/powershell/archive/2012/07/13/join-object.aspx

 

Usage

```
Join-Object -Left $employee -Right $entrance -Where {$args[0].Id -eq $args[1].EmployeeId} ?eftProperties "Name" ?ightProperties "When" -Type OnlyIfInBoth
```

|   Powershell   | SQL join |
| --- | --- |
|   AllInLeft   | Left Outer |
|   AllIInRight   | Right Outer |
|   OnlyIfInBoth   | Inner |
|   AllInBoth   | Full Outer |

Example

```
$csv1 = Import-Csv ".\test.csv"
$csv2 = Import-csv ".\test2.csv"

$params = @{
    Left = $csv1
    Right = $csv2
    Where = { $args[0].Day -eq $args[1].Day -and $args[0].Sender -eq $args[1].Sender }
    LeftProperties = "Sender","Day","Timestamp"
    RightProperties = "Sender","Day"
    Type = 'AllInBoth'
}

$Join = Join-Object @params |
ForEach-Object {
    $fail = 'N'
    if ($null -ne $_.Timestamp) { $fail = 'Y' }

    Add-Member -InputObject $_ -MemberType NoteProperty -Name Fail -Value $fail -PassThru
}

$Join | Export-Csv .\output.csv -NoTypeInformation
```
