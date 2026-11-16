---
title: "CentOS 7 missing network in VMware v9 guest"
date: 2015-08-04
categories: 
  - "unix-linux"
  - "vmware-workstation"
---

Configure the vm guest as Linux 64 bit add the following line to the guest .vmx file: ethernet0.virtualDev = "e1000"

to display network interface nmcli d

configure using nmtui
