---
title: "rsyslog cheatsheet"
date: 2017-11-11
categories: 
  - "apache"
  - "tips-and-tricks"
  - "unix-linux"
---

For facility / severity level, please refers to https://en.wikipedia.org/wiki/Syslog

vi /etc/rsyslog.conf add local6.\* @xxx.xxx.xxx.xxx:514 service rsyslog restart

vi /etc/apache2/site-enabled/xxxx.conf

CustomLog "| /usr/bin/logger -t httpd -p local6.info" "%{X-Forwarded-For}i %l %u %t \\"%r\\" %s %b \\"%{Referer}i\\" \\"%{User-agent}i\\"" CustomLog "| /usr/bin/logger -t httpd -p local6.info" "%h %l %u %t \\"%r\\" %s %b \\"%{Referer}i\\" \\"%{User-agent}i\\""

service apache2 restart
