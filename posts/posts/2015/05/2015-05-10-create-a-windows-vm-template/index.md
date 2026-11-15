---
title: "Create a Windows VM template"
date: 2015-05-10
categories: 
  - "vmware"
  - "vmware-workstation"
---

  1. Install a Windows VM guest - remove sp files (Dism.exe /online /Cleanup-Image /spsuperseded )

```
- Stop the Windows Updateservice and delete the C:\Windows\SoftwareDistribution folder. Start Windows Update.  -Next up the hibernation file: open a command prompt as Administrator.  Type powercfg.exe/hibernate off
```

2\. run sysprep /generalize /oobe /shutdown 3.Enable template mode for vm 4.
