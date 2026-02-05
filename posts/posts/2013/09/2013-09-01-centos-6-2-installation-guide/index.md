---
title: "CentOS 6.2 installation guide"
date: 2013-09-01
categories: 
  - "installation-guide"
tags: 
  - "centos"
  - "installation"
---

`sed -i 's/^ONBOOT="no"/ONBOOT="yes"/' /etc/sysconfig/network-scripts/ifcfg-eth0 sed -i '/^ONBOOT="yes"/ aBOOTPROTO="dhcp"' /etc/sysconfig/network-scripts/ifcfg-eth0 ifup eth0  yum -y install ntp ntpdate stdtime.gov.hk  service iptables save service iptables stop chkconfig iptables off  sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config  init 6  yum -y install httpd mysql mysql-server php php-pear php-mysql php-xml yum -y install vsftpd  service httpd start service mysqld start service vsftpd start  chkconfig --level 235 httpd on chkconfig --level 235 mysqld on chkconfig --level 235 vsftpd on  sed -i 's/^root/# root/' /etc/vsftpd/ftpusers sed -i 's/^root/# root/' /etc/vsftpd/user_list  rpm -U http://prdownloads.sourceforge.net/webadmin/webmin-1.580-1.noarch.rpm`
