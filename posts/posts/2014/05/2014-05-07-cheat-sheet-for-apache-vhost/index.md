---
title: "Cheat sheet for Apache vhost"
date: 2014-05-07
categories: 
  - "apache"
---

  After setting up WAMP, check the followings, - edit hosts file - enable "Include conf/extra/httpd-vhosts.conf" in httpd.conf - edit httpd-vhosts.conf

```
 <VirtualHost *:80> DocumentRoot "c:/www/test" ServerName dev.local <Directory "c:/www/test"> Require all granted or All from all or AllowOverride All Require local </Directory> 
```
