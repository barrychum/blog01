---
title: "esxi cheatsheet"
date: 2019-11-18
categories: 
  - "esxi"
  - "vmware"
---

 

Fix for unable to run scripts

\-disable "Secure boot" in BIOS

 

Fix for TPM warning

\-disable TPM in BIOS

 

compact vmdk

\-vmkfstools -K <filename.vmdk>

 

change UI timeout

Navigate to Host > Manage > System > Advanced Settings and scroll down on the right side searching for the key UserVars.HostClientSessionTimeout. - > set to 0

 

Enable SSH by default

Navigate to Host > Manage > Service > TSM-SSH > Policy > Start and stop with host
