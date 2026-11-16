---
title: "Copy files using tar"
date: 2013-08-27
categories: 
  - "unix-linux"
tags: 
  - "command"
  - "technique"
  - "unix"
---

```
# cd /source
# tar cvf - . | (cd /target; tar xvf - )

```
