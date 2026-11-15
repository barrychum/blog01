---
title: "Batch program check path"
date: 2014-03-19
categories: 
  - "cmd"
  - "scripts"
---

echo ;%path%; | find /c /i ";;" > NUL echo %errorlevel%

http://stackoverflow.com/questions/141344/how-to-check-if-directory-exists-in-path
