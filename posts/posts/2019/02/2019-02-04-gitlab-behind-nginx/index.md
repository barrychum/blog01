---
title: "gitlab behind nginx"
date: 2019-02-04
categories: 
  - "debian"
  - "unix-linux"
---

edit letsencrypt\['enable'\] = true mkdir /etc/gitlab/ssl chmod 777 /etc/gitlab/ssl

gitlab-ctl reconfigure

gitlab-rake gitlab:env:info

Access your server using the domain name or IP address on standard HTTP port 80. You will get the password change screen for root user for the first time as below. Update the new secure password for the root user.

netstat -ntap

sudo gitlab-rake gitlab:backup:create 0 22 \* \* 2-6 sudo gitlab-rake gitlab:backup:create

https://docs.gitlab.com/omnibus/settings/nginx.html

https://docs.gitlab.com/omnibus/settings/ssl.html#lets-encrypt-integration
