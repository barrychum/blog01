---
title: "rtl_fm cheatsheet"
date: 2017-10-06
categories: 
  - "ubuntu"
---

Record rtl\_fm to mp3

rtl\_fm -f 93.2M -M fm -s 170k -A std -l 0 -E deemp -r 44.1k | ffmpeg -f s16le -ac 1 -i pipe:0 -acodec libmp3lame -ab 32k -af lowpass=8000,highpass=150 -t 5 -y /tmp/test01.mp3

Stream rtl\_fm to http

rtl\_fm -f 93.2M -M fm -s 170k -A std -l 0 -E deemp -r 44.1k | sox -t raw -r 170k -e s -b 16 -c 1 -V1 - -t flac - | cvlc - --sout '#standard{access=http,mux=ogg,dst=localhost:8080/audio.ogg}'

Reference

https://medium.com/@luigifcruz/listening-live-fm-radio-over-the-network-with-rtl-sdr-2349c5abe878 https:// www.reddit.com/r/RTLSDR/comments/4jt4uk/transfer\_sdrsettings\_to\_rtl\_fm\_sox/ https://lansley.com/ 2014/09/27/using-rtl\_fm-and-ffmpeg-to-stream-radio-audio-over-network/
