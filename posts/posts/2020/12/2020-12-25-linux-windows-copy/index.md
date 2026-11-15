---
title: "Linux Windows copy"
date: 2020-12-25
---

```
rsync --stats -aP <source> <target>

e.g. rsync --stats -aP Documents/photos /Volumes/share2/from.hackintosh/Documents

robocopy <source> <target> /copy:DT /dcopy:DT /E

e.g. robocopy y:\video x:\video /copy:DT /dcopy:DT /E

```
