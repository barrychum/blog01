---
title: "New ubuntu partition"
date: 2017-10-01
categories: 
  - "tips-and-tricks"
  - "ubuntu"
  - "unix-linux"
---

 

sudo fdisk /dev/sdb (o, n->p->1->enter->enter, w) sudo mkfs.ext4 /dev/sdb1 sudo vi /etc/fstab #device mountpoint fstype optionsadmi dump fsck /dev/sdb1 /mnt/www2 ext4 defaults 0 1
