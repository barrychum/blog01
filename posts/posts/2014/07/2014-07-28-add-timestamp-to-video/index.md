---
title: "Add timestamp to video"
date: 2014-07-28
categories: 
  - "tips-and-tricks"
---

Convert videos in a folder to mpeg

for /f %f in ('dir /b c:\\folder\\\*.mjpeg') do ffmpeg -i %f -b 1000k -an %f.mpeg

Convert video to jpeg for each frame

ffmpeg -i inputvideo.mjpeg image-%4d.jpeg?-qscale 1

Imprint timestamp onto jpeg

convert.exe infile.jpg -pointsize 15 -fill white -box black -gravity northwest -annotate +0+0 "dd/mm/yy h:mm:ss" out.jpg

Convert jpeg into mpeg

ffmpeg -i c:\\path\\out-%4d.jpeg -b 600k test.mpg

Change video fps

mencoder in.mpg -oac copy -ovc copy -fps 10 -ofps 30 -o out10.mpg
