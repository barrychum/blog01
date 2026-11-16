---
title: "Encrypt web form POST data without SSL but use javascript + php"
date: 2014-05-05
categories: 
  - "php"
  - "scripts"
---

Case - sensitive data is needed to be encrypted during transmission from client to server. Other information on the page can be transmitted unencrypted. - asymmetric encryption is used (i.e. client encrypt data using public key and server decrypt using private key) - SSL is unavailable. (note: please use SSL for data require high security.) - multiple public keys can be derived from a single private key (RSA) - javascript is enabled on the client and PHP supporting openssl is required.   Steps Generate private key pem openssl genrsa -out private.pem 1024 Generate public key pem openssl rsa -pubout -in private\_key.pem -out public.pem Download the attachment from this post Put the javascript library (jsencrypt.js) on your web site Modify the included sample html and the php. Put the private key generated from the step above into the php and put the public key from the step above into the html. That's it! The form data posted from client to server will be encrypted.
