---
title: "Git clone"
date: 2024-07-05
tags: 
  - "Cheatsheet/git"
---

### Method 1

git clone https://github.com/exuanbo/actions-deploy-gist.git

cd <repo>

rm -rf .git

### Method 2

git clone https://github.com/exuanbo/actions-deploy-gist.git

git remote set-url origin https://github.com/your-username/your-new-repo.git

git push -u origin main

