---
title: "DISM cheatsheet"
date: 2016-05-08
categories: 
  - "tips-and-tricks"
---

1\. After booting to winpe, assign a drive letter to your target disk / partition, which is useful in a automated script environment

diskpart list disk select disk x list partition select partition=x assign letter=S exit

2\. Capture S: drive to an image file d:\\test.wim

dism /capture-image /imagefile:d:\\test.wim /capturedir:S:\\ /name:"test"

  3. Create partition on the target disk for image restoration and set partition active

select disk 0 clean create partition primary size=3000 id=27 format quick fs=ntfs label="Recovery" assign letter="R" create partition primary size=300 format quick fs=ntfs label="System" assign letter="S" active create partition primary format quick fs=ntfs label="Windows" assign letter="C" exit

4.
