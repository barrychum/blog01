---
title: "ftp command line"
date: 2014-03-20
categories: 
  - "tips-and-tricks"
---

ftp -s:test.scr 11.11.11.11

content of scr file =================== open 11.11.11.11 user guest guest put file1 quit

ftp -n -s:test.scr 11.11.11.11

reference http://support.microsoft.com/kb/96269
