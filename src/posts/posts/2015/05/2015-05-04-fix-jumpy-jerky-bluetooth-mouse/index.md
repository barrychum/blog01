---
title: "Fix jumpy / jerky bluetooth mouse"
date: 2015-05-04
categories: 
  - "fixes"
  - "windows-fixes"
---

  If your computer is using Broadcom 802.11n network adapter, and you experience jumpy bluetooth mouse movement. This is probably due to bluetooth collaboration setting is disabled. Bluetooth Collaboration enables general purpose input/output transmit suppression protocol between the IEEE 802.11 media access control (MAC) and an external Bluetooth chip to minimize transmit interference. To fix this in Windows, Control Panel > Device Manager > Network Adapters > Broadcom 802.11n Network Adapter. Right click and choose "Properties". Under the "Advanced" tab, highlight the setting named "Bluetooth Collaboration", then change it to Enable.
