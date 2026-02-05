---
title: "hackintosh d54250"
date: 2019-02-26
categories: 
  - "installation-guide"
---

[https://www.tonymacx86.com/threads/customacmini-2014-intel-nuc-haswell-i5-4250u-sierra.201537/page-15](https://www.tonymacx86.com/threads/customacmini-2014-intel-nuc-haswell-i5-4250u-sierra.201537/page-15)

[https://gist.github.com/julianxhokaxhiu/08c63e646afdfb91f746e0685baa414a](https://gist.github.com/julianxhokaxhiu/08c63e646afdfb91f746e0685baa414a)

cheatsheet:

clover releases

[https://github.com/Dids/clover-builder/releases](https://github.com/Dids/clover-builder/releases)

hackintosh clover

[https://hackintosh.gitbook.io/-r-hackintosh-vanilla-desktop-guide/building-the-usb-installer](https://hackintosh.gitbook.io/-r-hackintosh-vanilla-desktop-guide/building-the-usb-installer)

disable APFS

https://hackintosher.com/guides/macos-high-sierra-hackintosh-install-clover-walkthrough/

remove all partitions

[https://apple.stackexchange.com/questions/221688/how-do-i-remove-unused-partition-el-capitan](https://apple.stackexchange.com/questions/221688/how-do-i-remove-unused-partition-el-capitan)

489 diskutil list  
490 diskutil umountDisk /dev/disk4  
492 sudo gpt destroy /dev/disk4  
493 diskutil list  
494 exit  
504 cd Installation\\ sources  
505 ls  
507 diskutil list  
508 sudo Install\\ macOS\\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/USB
