---
title: "zabbix installation cheatsheet"
date: 2015-05-13
categories: 
  - "zabbix"
---

A 5-minutes quick start guide using zabbix appliance (for zabbix 2.4) 1. download appliance (https://www.zabbix.com/documentation/2.4/manual/appliance). Note the default password on the page 2. start appliance, login root 3. change root password 4. run yast - to change datetime, disable IPv6, set manual IP and hostname 5. create swap using following commands, # free -tom # dd if=/dev/zero of=/swap bs=1024 count=512000 # mkswap /swap # swapon /swap # swapon -s # vi /etc/fstab add "swap /swap swap defaults 0 0" to fstab 6. update timezone in php.ini (e.g. "Asia/Hong\_Kong" ) 7. reboot 8. Login zabbix frontend 9. disable Guest 10. change Admin password, edit Admin login for Web Scenario under Configure -> Host -> zabbix server 11.
