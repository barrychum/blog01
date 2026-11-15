---
title: "Configre vmware vmx to install Hyper-V"
date: 2014-05-08
categories: 
  - "esxi"
  - "installation-guide"
  - "misc-info"
  - "vmware"
---

Open the VMX file and add hypervisor.cpuid.v0 = "FALSE" to get past the error "Hyper-V cannot be installed: A hypervisor is already running." mce.enable = "TRUE" to get pass the error "HAL\_Memory\_Allocation upon start-up." vhv.enable = "TRUE" to get VT pass through.
