---
title: "Apache Basic Authen cheatsheet"
date: 2015-05-17
categories: 
  - "apache"
---

Step 1 - Create password database for user To create htpasswd -c <your choice of password file location> <first username> To add htpasswd <your choice of password file location> <other username> Step 2 Check AllowOverride setting for the directory Create .htaccess with the followings,
