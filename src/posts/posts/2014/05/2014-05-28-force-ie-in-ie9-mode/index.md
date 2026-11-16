---
title: "Force IE in IE9 mode"
date: 2014-05-28
categories: 
  - "tips-and-tricks"
---

You can tweak your registry to force IE to open in IE9 mode. Look for in RegEdit: _HKEY\_CURRENT\_USER\\Software\\Microsoft\\Internet Explorer\\Main\\FeatureControl\\FEATURE\_BROWSER\_EMULATION_ Create a DWORD as iexplore.exe and give value 9999.
