---
title: "Disable Windows Defender"
date: 2018-07-23
---

1. Type **gpedit.msc** and click **OK** to open the **Local Group Policy Editor**.
2. Browse the following path:
    
    `Computer Configuration > Administrative Templates > Windows Components > Windows Defender Antivirus`
3. On the right, double-click the **Turn off Windows Defender Antivirus** policy.
    
    [![](images/trun-off-windows-defender-antivirus-gpedit.jpg)](https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/07/trun-off-windows-defender-antivirus-gpedit.jpg?itok=qsdmSlVb)
4. Select the **Enabled** option to disable Windows Defender.
    
    [![](images/policy-disable-windows-defender.jpg)](https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/07/policy-disable-windows-defender.jpg?itok=JOuxykkj)
5. Click **Apply**.
6. Click **OK**.

 

 

 

 

1. Type **regedit**, and click **OK** to open the **Registry**.
2. Browse the following path:
    
    `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender`
    
    **Quick Tip:** You can now copy and paste the path in the new Registry's address bar to quickly jump to the key destination.
3. If you don't see the **DisableAntiSpyware** DWORD, right-click the Windows Defender (folder) key, select **New**, and click on **DWORD (32-bit) Value**.
    
    [![](images/windowsdefender-regedit.jpg)](https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/07/windowsdefender-regedit.jpg?itok=OWa5XaEo)
4. Name the key **DisableAntiSpyware** and press **Enter**.
5. Double-click the newly created DWORD and set the value from **0** to **1**.
    
    [![](images/disableantispyware-regedit-1.jpg)](https://www.windowscentral.com/sites/wpcentral.com/files/styles/xlarge/public/field/image/2018/07/disableantispyware-regedit-1.jpg?itok=wH_kh14I)
6. Click **OK**.

After completing the steps, restart your device to apply the settings, and then the Windows Defender Antivirus should now be disabled.
