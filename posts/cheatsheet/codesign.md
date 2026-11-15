---
title: "tccplus codesigning bypass"
date: 2024-06-15
tags: 
  - "Cheatsheet/macOS"
---
## tccplus to grant/remove macOS accessibility permissions to any app
https://github.com/jslegendre/tccplus/releases/tag/1.0

https://superuser.com/questions/1779925/macos-ventura-cant-give-permissions-opencore


Requires SIP and AMFI to be disabled.

```
$ codesign -dr - /Applications/Microsoft\ Teams.app
Executable=/Applications/Microsoft Teams.app/Contents/MacOS/Teams designated => 
identifier "com.microsoft.teams" and anchor apple generic and certificate 1
[field.1.2.840.113635.100.6.2.6] /* exists / and certificate leaf[field.1.2.840.113635.100.6.1.13] 
/ exists */ and certificate leaf[subject.OU] = UBF8T346G9 
```

Next type in
```
chmod +x tccplus 
./tccplus add Microphone [identifier]
./tccplus add Camera [identifier]
```
So in this case
```
cd ~/Downloads/ 
chmod +x tccplus 
./tccplus add Microphone com.microsoft.teams
```

## Force codesign in macOS
```
codesign --force --deep --sign - /Applications/Visual\ Studio\ Code.app
```