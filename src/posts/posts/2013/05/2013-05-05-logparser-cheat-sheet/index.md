---
title: "LogParser cheat sheet"
date: 2013-05-05
categories: 
  - "tips-and-tricks"
---

Convert IIS log to CSV format

```
LogParser "SELECT * INTO output.csv FROM input.log" -o:CSV
```

Convert IIS log to localtime

```
logparser ?ELECT TO_TIMESTAMP(date, time) AS utc-timestamp, TO_LOCALTIME(utc-timestamp) AS local-timestamp,* FROM input.log WHERE local-timestamp between timestamp(??012/02/02 00:00:00?? ?yyy/MM/dd hh:mm:ss?? and timestamp(??012/02/03 00:00:00??
```
