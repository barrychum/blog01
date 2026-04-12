---
title: Disable USB removable hidden files
date: 2026-04-12
readSpeed: 150
tags: 
  - "Cheatsheet/macOS"
---
{% raw %}

Yes, you can stop macOS from creating these, but because each folder serves a different "service" (indexing, trash, and time machine), you have to disable them individually. 

The most effective way to handle this for external USB drives is a combination of Terminal commands and a "kill switch" file.

---

### 1. Disable Spotlight Indexing (`.Spotlight-v100`)
Spotlight creates this folder to store search indexes. You can tell macOS to ignore the drive entirely.

**The Command:**
```bash
mdutil -i off /Volumes/YourDriveName
```
**The "Kill Switch":**
To make it permanent (even if you plug the drive into another Mac), create an empty file at the root of the USB drive named `.metadata_never_index`.
```bash
touch /Volumes/YourDriveName/.metadata_never_index
```

---

### 2. Disable the Trash Can (`.Trashes`)
By default, macOS creates a local trash folder so that "deleted" files can be recovered until the trash is emptied. You can bypass this by creating a file with the exact same name as the folder, which prevents macOS from creating the directory.

**The Fix:**
```bash
rm -rf /Volumes/YourDriveName/.Trashes
touch /Volumes/YourDriveName/.Trashes
```
*By making `.Trashes` a **file** instead of a **folder**, macOS will fail when it tries to move deleted items there.*

---

### 3. Stop Time Machine Prompts (`.com.apple.timemachine...`)
The `.com.apple.timemachine.donotpresent` file is actually a "flag" that tells macOS: *"Don't ask the user if they want to use this drive for backups."* It is usually a good thing to keep if you don't want annoying pop-ups, but if you want it gone:

**The Global Fix:**
```bash
defaults write com.apple.TimeMachine DoNotOfferNewDisksForBackup -bool TRUE
```

---

### 4. Stop Network/USB Junk (`.DS_Store`)
While not in your list, macOS often drops `.DS_Store` files (which store folder window positions). You can disable these specifically for external/network drives:

**The Command:**
```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores -bool TRUE
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool TRUE
```

---

### The "Clean Eject" Solution
Even with these settings, macOS is persistent. If you want to clean a drive right before you unplug it (especially before taking it back to your Synology or a Windows PC), use the **`dot_clean`** utility:

```bash
dot_clean -m /Volumes/YourDriveName
```
This merges and deletes those "AppleDouble" hidden files in one go.

### Summary Table

| Folder | Function | Best Fix |
| :--- | :--- | :--- |
| **.Spotlight-v100** | Search Index | `mdutil -i off` + `.metadata_never_index` file |
| **.Trashes** | Deleted files | Delete folder, `touch .Trashes` file |
| **.Temporary-items**| App swap data | Hard to block; usually cleared on eject |
| **.DS_Store** | Folder view | `defaults write` (Global setting) |

**A small warning:** Disabling Spotlight on a drive with 500,000 files means you won't be able to use the Finder search bar to find anything on that USB—you'll have to use `find` or `ls` in the terminal.

Are these files causing issues with your `rsync` script, or do they just look messy on the Synology side?


{% endraw %}


