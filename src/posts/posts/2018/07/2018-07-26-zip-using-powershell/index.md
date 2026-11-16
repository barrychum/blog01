---
title: "Zip using Powershell"
date: 2018-07-26
---

 

**\>= PowerShell 5.0**

Per @SonnyPuijk's answer above, use `Compress-Archive`.

```
clear-host
[string]$zipFN = 'c:\temp\myZipFile.zip'
[string]$fileToZip = 'c:\temp\myTestFile.dat'
Compress-Archive -Path $fileToZip -Update -DestinationPath $zipFN
```

**< PowerShell 5.0**

**_To add a single file to an existing zip:_**

```
clear-host
Add-Type -assembly 'System.IO.Compression'
Add-Type -assembly 'System.IO.Compression.FileSystem'

[string]$zipFN = 'c:\temp\myZipFile.zip'
[string]$fileToZip = 'c:\temp\myTestFile.dat'
[System.IO.Compression.ZipArchive]$ZipFile = [System.IO.Compression.ZipFile]::Open($zipFN, ([System.IO.Compression.ZipArchiveMode]::Update))
[System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($ZipFile, $fileToZip, (Split-Path $fileToZip -Leaf))
$ZipFile.Dispose()

```

**_To create a single file zip file from scratch:_**

Same as above, only replace: `[System.IO.Compression.ZipArchiveMode]::Update`

With: `[System.IO.Compression.ZipArchiveMode]::Create`

```

reference: 
https://stackoverflow.com/questions/39496251/how-to-move-a-single-txt-file-to-the-zip-in-powershell-3
```

- `Compress-Archive`: [https://technet.microsoft.com/en-us/library/dn841358.aspx](https://technet.microsoft.com/en-us/library/dn841358.aspx)
- `CreateEntryFromFile`: [https://msdn.microsoft.com/en-us/library/hh485720(v=vs.110).aspx](https://msdn.microsoft.com/en-us/library/hh485720\(v=vs.110\).aspx)
