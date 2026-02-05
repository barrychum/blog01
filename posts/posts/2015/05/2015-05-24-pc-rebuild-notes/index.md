---
title: "PC rebuild notes"
date: 2015-05-24
categories: 
  - "installation-guide"
  - "misc-info"
---

Server 1. Install Windows to HDD 2. Intel RST (requires dotnet framework 4.5) 3. Enabled acceleration Apps - 7-zip - dvbviewer pro 5.3.2 - dvbviewer recording service - wamp - update gpedit.msc (for headless, and blank password RDP) - create autologin netplwiz You can disable blank password restrictions by using a policy. To locate and change this policy: Click Start, point to Run, type gpedit.msc, and then click OK to start the Group Policy Editor. Open Computer Configuration\\Windows Settings\\Security Settings\\Local Policies\\Security Options\\Accounts: Limit local account use of blank passwords to console logon only. Double-click Limit local account use of blank passwords to consol logon only. Click Disabled, and then click OK. Press Win+R Type gpedit.msc and press Enter. Click Yes if you get a prompt to allow the program. Navigate to Local Computer Policy, Computer Configuration, Administrative Templates, Windows Components, Remote Desktop Services, Remote Desktop Session Host, Remote Session Environment. Right click on "Enforce Removal of Remote Desktop Wallpaper" and then click Edit. Change the setting to Disabled, or Not Configured. Click Apply and then OK. Now close the (Local Group Policy Editor) window.
