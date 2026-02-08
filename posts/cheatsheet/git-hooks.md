---
title: "Git hooks"
date: 2024-07-01
tags: 
  - "Cheatsheet/git"
---
Create a pre-push in repo .git/hooks

chmod +x pre-push

add the followings :

#!/bin/sh

cp scripts/*.sh $HOME/scripts

if [ $? -eq 0 ]; then
    exit 0
else
    echo "file copy failed"
    exit 1
fi
