---
title: "macOS terminal diskutil"
date: 2019-03-03
---

Destroy all partitions

- diskutil list
- `diskutil umountDisk /dev/diskX`
- sudo gpt destroy /dev/diskX
- diskutil eraseDisk <JHFS+|FAT32> <LABEL> diskX

[https://apple.stackexchange.com/questions/221688/how-do-i-remove-unused-partition-el-capitan](https://apple.stackexchange.com/questions/221688/how-do-i-remove-unused-partition-el-capitan)
