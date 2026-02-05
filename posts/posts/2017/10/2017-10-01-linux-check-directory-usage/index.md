---
title: "Linux check directory usage"
date: 2017-10-01
categories: 
  - "tips-and-tricks"
  - "ubuntu"
  - "unix-linux"
---

cd /var

du --max-depth=1 \* | sort -n or, again, avoiding the redundant \* : du --max-depth=1 | sort -n
