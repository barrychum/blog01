---
title: "svn crash course"
date: 2014-03-18
categories: 
  - "tips-and-tricks"
  - "unix-linux"
---

set REPOS\_DIR=C:\\repos\\my-repos mkdir C:\\repos svnadmin create %REPOS\_DIR% svn mkdir -m "Create directory structure." "file:///%REPOS\_DIR%/trunk" "file:///%REPOS\_DIR%/branches" file:///%REPOS\_DIR%/tags" cd my-directory svn checkout "file:///%REPOS\_DIR%/trunk" ./ svn add --force ./ svn commit -m "Initial import" svn up

http://subversion.apache.org/quick-start http://svnbook.red-bean.com/en/1.7/svn-book.html#svn.basic.vsn-models
