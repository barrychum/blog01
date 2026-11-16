---
title: "Reverse Web Proxy on Windows"
date: 2015-05-11
categories: 
  - "installation-guide"
---

As ISA and Forefront TMG has reached mainstream support end date, and approaching extended support end date (in 2017 and 2020 respectively), a reverse web proxy replacement is needed on Windows platform. Web Application Proxy is an option but it requires an AD FS server. An alternative is IIS with ARR. The following is a cheat sheet for ARR and steps for prerequisites (e.g. firewall port forward, DNS records for internal web servers) are omitted. Required components 1. install Web server by adding server role 2. download ARR from Microsoft and install it. How to configure 1.open IIS manager 2.create server farm, choose "No" when being asked to create "rewrite rules" 3. add a blank URL rewrite rule at root of IIS (server level) 4. Enter the following information for the new inbound rule - Name, Matches the pattern, using wildcard, "\*" , ignore case - condition {HTTP\_HOST} matches the pattern "xxxx.xxxx" -action: route to server farm , and stop processing of subsequent rules 5.
