---
title: "Mount NFS for Apache"
date: 2015-05-17
categories: 
  - "apache"
---

To fix wrong fs when mounting nfs yum install nfs-utils nfs-utils-lib chkconfig nfs on service rpcbind start service nfs start mount IP:/nfs /targetpath To fix "don't have permission" error in Apache for nfs mounted directories option 1:

##### Apache HTTP Server

To allow access to NFS file systems (files labeled with the `nfs_t` type):

`/usr/sbin/setsebool -P httpd_use_nfs on`

option 2: disable selinux edit /etc/sysconfig/selinux SELINUX=disabled To restore httpd.conf to default remove httpd.conf yum reinstall httpd   Similarly, for Windows share (cifs),
