---
title: "Apache 2.4 config http.conf to allow local LAN access only"
date: 2015-02-21
categories: 
  - "apache"
---

`AllowOverride All Require all denied Require ip 127 192.168`

Remarks: Other possible format Require ip 192.168.0.0/24

http://httpd.apache.org/docs/2.4/mod/mod\_authz\_host.html
