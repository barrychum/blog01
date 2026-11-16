---
title: "Multiple button on a form"
date: 2014-05-04
categories: 
  - "php"
---

Method 1 <form action='' method='post'> <button type='submit' name='reset'>Clear</button> <button type='submit' name='submit'>Submit</button> </form> ... if(isset($\_POST\['reset'\])) { /\* ...clear and reset stuff... \*/ } else if(isset($\_POST\['submit'\]) { /\* ...submit stuff... \*/ } Method 2 <form action='' method='post'> <button name='submit' value='0'>Clear</button> >button name='submit' value='1'>Submit</button> >button name='submit' value='2'>Something Else</button> </form> ... if($\_POST\['submit'\]==0) { /\* ...clear and reset stuff... \*/ } else if($\_POST\['submit'\]==1) { /\* ...submit stuff... \*/ } else if($\_POST\['submit'\]==2) { /\* ...do something else...
