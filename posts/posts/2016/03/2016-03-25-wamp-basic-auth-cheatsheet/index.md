---
title: "WAMP basic auth cheatsheet"
date: 2016-03-25
categories: 
  - "apache"
---

To change default .htaccess to different name for windows

Edit httpd.conf

AccessFileName htaccess.acl .htaccess

Edit httpd.vhosts.conf <VirtualHost \*:80> DocumentRoot "s:/www/dev" ServerName abc.ddns.net

<Directory "S:/www/dev/restricted"> AuthType Basic AuthName "Restricted Content" AuthUserFile "S:\\wamp\\bin\\apache\\apache2\\bin\\pwd.txt" # Require valid-user </Directory> </VirtualHost>

Create pwd.txt

s:\\wamp\\bin\\apache\\apache2\\bin\\htpasswd pwd.txt userid
