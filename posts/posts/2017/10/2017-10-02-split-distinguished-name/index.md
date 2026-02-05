---
title: "Split distinguished name"
date: 2017-10-02
categories: 
  - "powershell"
---

$a = "cn=abc\\, def,ou=ghi,ds=klm"

$pattern = ".\*?\[^\\\\\](,|$)"

Select-String $pattern -InputObject $a -AllMatches | \` % {$\_.matches} | % {$\_.captures.value} | \` % {($\_.replace(",","")).replace("\\",",")}
