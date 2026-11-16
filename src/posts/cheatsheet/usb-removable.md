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


The reason you can't `rm` that folder is usually down to two things: **SIP (System Integrity Protection)** on macOS or the fact that the **Spotlight service** is currently using the folder. Even if you are `sudo`, macOS will often block you from touching its core metadata folders.

Here is how to force it out.

### 1. The "Correct" Way (Using `mdutil`)
Instead of trying to delete the folder like a normal file, you should tell the Spotlight manager to erase the index for that specific drive. This clears the folder and stops the "Permission Denied" conflict.

```bash
sudo mdutil -X /Volumes/YourDriveName
```
* **`-X`**: Tells the metadata utility to "delete the index search store" on that volume.

---

### 2. The "Force" Way (Telling Spotlight to Stop)
If you still get an error, it’s because Spotlight is actively writing to it. You need to turn indexing **off** before you can `rm` the directory.

```bash
# 1. Turn indexing off
sudo mdutil -i off /Volumes/YourDriveName

# 2. Now try to remove it
sudo rm -rf /Volumes/YourDriveName/.Spotlight-v100
```

---

### 3. If you get "Operation Not Permitted"
If you see this even with `sudo`, it’s because your **Terminal** doesn't have "Full Disk Access."

1.  Open **System Settings** > **Privacy & Security**.
2.  Click **Full Disk Access**.
3.  Ensure the toggle for **Terminal** is **ON**.
4.  Restart Terminal and try the command again.

---

### 4. Preventing it from Coming Back
Once you delete it, macOS will try to recreate it within seconds. To stop this permanently on that USB drive, do this immediately after deleting:

```bash
touch /Volumes/YourDriveName/.metadata_never_index
```

### Why it's so stubborn
The `.Spotlight-v100` folder isn't just a folder; it's a **root-level system directory** protected by the macOS kernel. On modern macOS versions, even the "Root" user is restricted from modifying certain system paths to prevent malware from hiding in metadata stores.

**One final trick:** If the drive is external, sometimes the easiest way is to eject it, plug it into your **Synology**, and run the `rm -rf` command from there via SSH. The Synology doesn't care about Apple's SIP protections and will delete it instantly!

Did the `mdutil -X` command work, or did you get a specific error message?

{% endraw %}


