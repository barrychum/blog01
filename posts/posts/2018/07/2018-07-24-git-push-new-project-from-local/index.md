---
title: "Git push new project from local"
date: 2018-07-24
---

### Command line instructions

##### Git global setup

```
git config --global user.name "barry"
git config --global user.email "barry@hkcutie.com"

```

##### Create a new repository

```
git clone http://gitlab.snoopyhk.com/barrychum/MageCurrency.git
cd MageCurrency
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```

##### Existing folder

```
cd existing_folder
git init
git remote add origin http://gitlab.snoopyhk.com/barrychum/MageCurrency.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

##### Existing Git repository

```
cd existing_repo
git remote rename origin old-origin
git remote add origin http://gitlab.snoopyhk.com/barrychum/MageCurrency.git
git push -u origin --all
git push -u origin --tags
```
