---
title: "Change Wordpress site URL without login"
date: 2020-12-26
---

 

### Edit functions.php

Add these two lines to the file, immediately after the initial “<?php” line:

|   `update_option(` `'siteurl'``,` `'http://example.com'` `);`  `update_option(` `'home'``,` `'http://example.com'` `);`     |
| --- |

 

https://wordpress.org/support/article/changing-the-site-url/
