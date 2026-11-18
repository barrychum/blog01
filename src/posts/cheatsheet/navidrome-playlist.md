---
title: navidrome playlist
date: 2026-02-05
readSpeed: 150
tags: 
  - "Cheatsheet/navidrome"
  - "playlist"
---
{% raw %}
{
  "all": [
    { "inTheRange": { "year": [ 2010, 2023 ] } },
    { "all": [
        { "notContains": { "genre": "Classical" } },
        { "notContains": { "genre": "Instrumental" } },
        { "notContains": { "genre": "English" } },
        { "notContains": { "genre": "Japanese" } },
        { "notContains": { "genre": "OST" } }
      ] },
    { "any": [ { "is": { "rating": 0 } },
               { "gt": { "rating": 3 } } ] }
  ],
  "sort": "+artist"
}

{% endraw %}

