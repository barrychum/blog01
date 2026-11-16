---
title: "create bootable ISO on mac"
date: 2019-02-27
---

For Windows USB install

```
diskutil list  diskutil unmountDisk   sudo dd if=/Volumes/Machintosh\ HD/Users/barry/Downloads/ of=/dev/disk5 bs=8m ctrl-T diskutil eject disk5
```

For macOS USB installer

```
https://www.blackmanticore.com/158492368920c2b7675200593055a2c1Erase the USB flash drive as FAT32 / MBRdiskutil listdiskutil unmount /dev/diskXsYsudo fdisk -e /dev/diskXfdisk: 1> f 1fdisk: 1> writefdisk: 1> quitRemount the USB drive again.Mount the ESXi installer ISO (double-click it).Copy the entire contents of the ISO in the root of the USB drive.Rename the file ISOLINUX.CFG to SYSLINUX.CFG.Open the file SYSLINUX.CFG using a text editor (TextEdit)change APPEND -c boot.cfg to APPEND -c boot.cfg -p 1Save and close the fileUnmount the ISO and USB drive.https://www.techrepublic.com/article/how-to-create-a-bootable-vmware-esxi-usb-drive-on-macs/or use unetbootin https://unetbootin.github.io/
```
