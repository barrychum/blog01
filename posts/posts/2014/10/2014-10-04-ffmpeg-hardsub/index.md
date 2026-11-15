---
title: "ffmpeg hardsub"
date: 2014-10-04
categories: 
  - "misc-info"
---

\-i in\_file.ts -filter\_complex '\[0:v\]\[0:s:1\]overlay\[v\]' -map \[v\] -map 0:a -strict -2 out\_file.mp4

ffmpeg -i bg.mp4 -i video1.mp4 -i video2.mp4 -filter\_complex \\ "\[0:0\]\[1:0\]overlay=20:40\[background\];\\ \[background\]\[2:0\]overlay=overlay\_w\*2:overlay\_h" output.mp4

https://trac.ffmpeg.org/wiki/HowToBurnSubtitlesIntoVideo
