---
title: "Remove uncategorised from post"
date: 2018-01-07
categories: 
  - "wordpress"
---

```
SELECT *
FROM `wp_term_relationships`
WHERE `term_taxonomy_id`
IN ( SELECT `term_taxonomy_id`
FROM `wp_term_taxonomy`
WHERE `taxonomy` = 'category' )
GROUP BY `object_id`
HAVING ( COUNT( `object_id` ) >1 )
```
