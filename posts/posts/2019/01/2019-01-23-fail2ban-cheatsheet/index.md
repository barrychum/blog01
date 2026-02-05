---
title: "fail2ban cheatsheet"
date: 2019-01-23
categories: 
  - "apache"
  - "fail2ban"
---

Configuration

1. create /etc/fail2ban/jail.local
2. create corresponding filter in /etc/fail2ban/filter.d
3. create corresponding action in /etc/fail2ban/action.d

https://confluence.atlassian.com/doc/using-fail2ban-to-limit-login-attempts-216433031.html

Test

fail2ban-regex /var/log/apache2/ssl\_access.log /etc/fail2ban/filter.d/sshd.conf

Check fail2ban

fail2ban-client status

fail2ban-client status <section name>

fail2ban-client reload sshd

fail2ban-client set _<jail>_ unbanip _<ip>_

0.8

/etc/fail2ban/jail.conf or jail.local

0.9

/etc/fail2ban/jail.d/local.conf

**In Fail2Ban 0.9.x the jail heading in square brackets also identifies the filter being used.**

reference:

https://www.the-art-of-web.com/system/fail2ban-filters/

https://www.digitalocean.com/community/tutorials/how-fail2ban-works-to-protect-services-on-a-linux-server
