---
title: "Group Policy (GPO) cheat sheet"
date: 2016-01-13
categories: 
  - "reference"
  - "settings"
  - "windows-fixes"
---

Create shortcuts

Computer Configuration\\Preferences\\Windows Settings\\Shortcuts

Internet Settings (Preferences)

User Configuration\\Preferences\\Control Panel Settings\\Internet Settings

 

Printer installation

 

Computer Configuration\\Policies\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\Devices: Prevent users from installing printer drivers - Disabled

Computer Configuration\\Policies\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\User Account Control: Detect application installations and prompt for elevation - Disabled

Computer Configuration\\Policies\\Administrative Templates\\System\\Driver Installation\\Allow non-administrators to install drivers for these device setup classes - Enabled

Java exception via GPO

https://community.spiceworks.com/how\_to/119934-add-exception-site-list-to-java-via-gpo

https://community.spiceworks.com/how\_to/119934-add-exception-site-list-to-java-via-gpo
