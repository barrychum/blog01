---
title: "Migrate Whatsapp history from iPhone to Android"
date: 2013-08-27
categories: 
  - "gadgets"
tags: 
  - "android"
  - "iphone"
  - "smartphone"
---

Required software

\- iTunes

\- java 7 SE RE

\- iPhone Backup Browser (https://code.google.com/p/iphonebackupbrowser)

\- Whatsapp migrato (http://www.whatsappmigrator.com)

 

Procedure

\- install java 7 SE RE

\- install iPhone Backup Browser

\- backup iPhone to compute using iTunes.? Uncheck encrypt backup option.

\- start iPhone backup browser, locate net.whatsapp.WhatsApp

\- export Documents/ChatStorage.sqlite

\- install Whatsapp on Android and activate

\- connect Android to computer, goto?WhatsApp/Databases directory and backup either msgstore.db.crypt (encrypted) or msgstore.db (unencrypted)

\- start WhatsAppMigrator (run as administrator), select chatstorage.sqlite and msgstore.db, convert

\- stop Whatsapp forcibly on Android and clear information

\- overwrite msgstore.db or msgstore.db.crypt on Android with the converted one.

\- restart Whatsapp on Android and reactivate

 

That's it.? Enjoy.
