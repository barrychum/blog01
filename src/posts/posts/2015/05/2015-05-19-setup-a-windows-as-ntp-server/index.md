---
title: "Setup a Windows as ntp server"
date: 2015-05-19
categories: 
  - "tips-and-tricks"
---

There are many articles on the internet to show you how to enable a Windows to act as a stratum 3 ntp server (basically enable a setting in registry) However, there are pitfalls to do that. - It is difficult to make sure the machine time is accurate to serve other ntp clients - The w32tm does not contain advanced settings (eg redundant ntp sources, stop act as ntp server in case the machine has not connected to a reliable source for a long time,
