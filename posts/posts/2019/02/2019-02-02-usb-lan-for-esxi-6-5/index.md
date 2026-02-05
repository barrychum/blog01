---
title: "USB LAN for esxi 6.5"
date: 2019-02-02
categories: 
  - "esxi"
---

In ESXi 6.5, the legacy USB drivers are replaced with a single USB driver named vmkusb. This first needs to disabled and esx rebooted

esxcli system module list  
esxcli system module set -m=vmkusb -e=FALSE (original is TRUE)  
reboot

download vib driver r8152-2.06.0-2\_esxi60.vib

updated 2019 Feb (https://labs.vmware.com/flings/usb-network-native-driver-for-esxi#instructions)

esxcli software acceptance get  
PartnerSupported

esxcli software acceptance get Check level  
esxcli software acceptance set --level CommunitySupported (original is PartnerSupported)

esxcli software vib install -v /tmp/r8152-2.06.0-4\_esxi65.vib

esxcli network nic list  
esxcfg-nics -l

To remove the drivers.

esxcli software vib list  
esxcli software vib remove -n r8152

```
William Lam
https://www.virtuallyghetto.com/2016/11/usb-3-0-ethernet-adapter-nic-driver-for-esxi-6-5.html
```

https://myinternetsnotworking.wordpress.com/2017/08/04/install-esx-drivers-for-usb-nic/
