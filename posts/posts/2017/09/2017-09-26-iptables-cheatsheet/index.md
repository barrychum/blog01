---
title: "iptables cheatsheet"
date: 2017-09-26
categories: 
  - "debian"
  - "unix-linux"
---

iptables -A INPUT -s xxx.xxx.xxx.xxx/xx -j DROP

iptables -nL INPUT --line-numbers

iptables -D INPUT x
