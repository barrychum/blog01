---
title: "Linux boot to single user mode"
date: 2017-05-15
categories: 
  - "unix-linux"
---

To boot into single user mode you edit the boot instructions for the GRUB menu entry you wish to boot and add the kernel parameter/option single.

Brief instructions for how to do this are below.

Hold down the left Shift key while rebooting to bring up GRUB menu Select (highlight) the GRUB boot menu entry you wish to use.

Press e to edit the GRUB boot commands for the selected boot menu entry.

Look near the bottom of the list of commands for lines similar to

linux /boot/vmlinuz-3.2.0-24-generic root=UUID=bc6f8146-1523-46a6-8b\\ 6a-64b819ccf2b7 ro quiet splash initrd /boot/initrd.img-3.2.0-24-generic

Change the middle line in (4) by adding the kernel boot parameter single to the end of the line (i.e. after ro quiet splash).
