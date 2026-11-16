---
title: "Find command"
date: 2024-06-27
tags: 
  - "Cheatsheet/find"
---
find . -type f ! -name "*.mp3" -size +5M -exec du -h {} + 2>/dev/null
find . -type f -name "*" -size +5M -exec du -h {} +       2>/dev/null
find . -type f \( -name "*.tar" -o -name "*.tar.gz" \) -size +5M -exec du -h {} + 2>/dev/null | sort -rh

find . -type f ! -name "*.mp3" -size +5M -exec du -h {} + 2>/dev/null | sort -rh

find . -type f ! -name "*.mp3" -size +5M -ctime -30 -exec du -h {} + 2>/dev/null | sort -rh

find . -type f ! -name "*.mp3" -size +5M -mtime +30 -exec du -h {} + 2>/dev/null | sort -rh
