---
title: "Fix unable to open /var/db/bootcache.playlist for OSX"
date: 2014-07-28
categories: 
  - "fixes"
  - "osx"
  - "tips-and-tricks"
---

 

1- Restart the computer in sigle user mode: cmd + s when starting

2 - Mount the drive in read/write mode: mount -uw /

3 - Remove the file: rm /etc/launchd.conf

4 - Restart computer

 

Reference

https://discussions.apple.com/message/24347785

http://www.niresh.co/hackintosh-topic/896-fixed-bootcachecontrol-unable-to-open-vardbbootcacheplaylist-2-no-such-file-or-directory/page-2#entry4890
