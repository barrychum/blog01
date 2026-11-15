---
title: "esxi USB datastore"
date: 2019-01-26
---

https://communities.vmware.com/thread/343194

```
diskutil list
diskutil umountDisk /dev/diskx
sudo gpt destroy /dev/diskx
exit

partedUtil mklabel /dev/disks/mpx.vmhba33\:C0\:T0\:L0 gpt
partedUtil setptbl /dev/disks/mpx.vmhba33\:C0\:T0\:L0 gpt "1 2048 1953520064 AA31E02A400F11DB9590000C2911D1B8 0" 
vmkfstools -C vmfs5 -S USBstore01 /dev/disks/mpx.vmhba33\:C0\:T0\:L0:1 

```

https://www.virten.net/2015/10/usb-devices-as-vmfs-datastore-in-vsphere-esxi-6-0/

https://www.virten.net/2016/11/usb-devices-as-vmfs-datastore-in-vsphere-esxi-6-5/
