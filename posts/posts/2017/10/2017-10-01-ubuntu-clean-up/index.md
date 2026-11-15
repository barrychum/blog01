---
title: "ubuntu clean up"
date: 2017-10-01
categories: 
  - "tips-and-tricks"
  - "ubuntu"
  - "unix-linux"
---

Cleanup /var/cache/apt

sudo apt-get clean

sudo apt-get autoclean

sudo apt-get autoremove

 

sudo e4defrag /dev/sdb1

cd /

sudo dd if=/dev/zero of=wipefile bs=1024x1024

sudo rm wipefile
