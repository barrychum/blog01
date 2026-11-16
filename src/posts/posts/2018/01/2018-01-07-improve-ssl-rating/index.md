---
title: "Improve SSL rating"
date: 2018-01-07
categories: 
  - "security"
---

How to check SSL rating

https://www.ssllabs.com/

 

Additional information for improving SSL rating

https://scaron.info/blog/improve-your-nginx-ssl-configuration.html

First, generate your DH parameters with OpenSSL:

cd /etc/ssl/certs openssl dhparam -out dhparam.pem 2048

Then, add the following to your Nginx configuration:

ssl\_dhparam /etc/ssl/certs/dhparam.pem;

add\_header X-Frame-Options DENY; This option tells browsers that my website should not be displayed inside a <frame>, an <iframe> or an <object>. Just in case someone goes phishing.
