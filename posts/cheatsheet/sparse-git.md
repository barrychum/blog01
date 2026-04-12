---
title: "git Cheatsheet"
date: 2026-04-12
tags: 
  - "Cheatsheet/git"
---
{% raw %}
mkdir posts
cd posts/

git init
git remote add origin https://github.com/barrychum/blog01.git
git sparse-checkout init --cone
git sparse-checkout set posts
git pull origin main

git clone --filter=blob:none --no-checkout https://github.com/barrychum/blog01.git
cd blog01
git sparse-checkout set posts
git checkout


git clone --filter=blob:none --no-checkout https://github.com/barrychum/blog01.git
cd blog01
git sparse-checkout init
git sparse-checkout set posts/
git checkout main
{% endraw %}