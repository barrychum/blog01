---
title: "ffmpeg join files"
date: 2019-08-11
---

```
ffmpeg -f concat -safe 0 -i list.txt -vf scale=1024:-1 -an scalednoaudio.mp4

file ./001.mov

file ./002.mov

```
