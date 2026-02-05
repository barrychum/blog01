---
title: "Fail to activate Exchange 2010 database on a server"
date: 2013-09-24
categories: 
  - "exchange"
---

Using E2k10 sp1 management scripts to start DAG maintenance mode, a database fails to move with error says that the target server blocks it from activation.? (remarks, the problem is still not fixed up to sp2 ru5)

To solve this, suspend and then resume the target database copy

Reference http://blogs.technet.com/b/timmcmic/archive/2011/07/25/exchange-2010-sp1-startdagservermaintenance-ps1-fails-when-a-server-contains-databases-with-a-single-copy.aspx

http://blogs.technet.com/b/exchange/archive/2013/04/10/preserving-activation-blocks-after-performing-dag-member-maintenance.aspx
