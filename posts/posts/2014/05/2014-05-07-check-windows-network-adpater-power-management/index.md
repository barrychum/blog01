---
title: "Check Windows network adpater power management"
date: 2014-05-07
categories: 
  - "powershell"
---

Check the network adapter power management via registry check `function checkPNP { param ($server) $adapters = gwmi win32_networkadapter -computername $server | select systemname, speed, name, deviceid, netconnectionid $results = @() foreach ($adapter in $adapters) { $tempstr = "0000"+ $adapter.deviceid $devicenumber = $tempstr.substring($tempstr.length - 4, 4) $keypath = "SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002bE10318}\\$devicenumber" $Reg = [Microsoft.Win32.RegistryKey]::OpenRemoteBaseKey('LocalMachine', $server) $RegKey= $Reg.OpenSubKey($keypath) $PnPCapabilitiesValue = $RegKey.GetValue("PnPCapabilities") $result = "" | select systemname, speed, name, deviceid, pnpsetting,`
