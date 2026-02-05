---
title: "Clean up magento session directory"
date: 2018-04-01
categories: 
  - "magento"
  - "unix-linux"
---

```
cd /var/<wwwroot>/var/session

find . -name 'sess*' -mtime +3 -type f -delete

ls -l | wc -l

```
