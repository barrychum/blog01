---
title: "vmnet IP address scheme"
date: 2015-08-19
categories: 
  - "vmware"
---

 

### Address Use on a Host-Only Network

?
| **Range** | **Address use** | **Example** |
| --- | --- | --- |
| <net>.1 | Host machine | 192.168.0.1 |
| <net>.2-<net>.127 | Static addresses | 192.168.0.2-192.168.0.127 |
| <net>.128-<net>.253 | DHCP-assigned | 192.168.0.128-192.168.0.253 |
| <net>.254 | DHCP server | 192.168.0.254 |
| <net>.255 | Broadcasting | 192.168.0.255 |

### Address Use on a NAT Network

?
| **Range** | **Address use** | **Example** |
| --- | --- | --- |
| <net>.1 | Host machine | 192.168.0.1 |
| <net>.2 | NAT device | 192.168.0.2 |
| <net>.3-<net>.127 | Static addresses | 192.168.0.3-192.168.0.127 |
| <net>.128-<net>.253 | DHCP-assigned | 192.168.0.128-192.168.0.253 |
| <net>.254 | DHCP server | 192.168.0.254 |
| <net>.255 | Broadcasting | 192.168.0.255 |

 

reference

https://www.vmware.com/support/ws55/doc/ws\_net\_advanced\_ipaddress.html
