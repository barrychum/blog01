---
title: "Timelapse cheat sheet"
date: 2013-05-07
categories: 
  - "photography-2"
tags: 
  - "timelapse"
---

Suggested software

- 422ToImage
- xvid codec
- MSU deflicker
- virtualdub
- mp4box

  Use 422ToImage to convert 422 files to JPG (skip this if you are not shooting .422 files using MagicLantern. Move all the JPG of the same sequence into a separate folder Use virtualdub to convert to avi (xvid codec)

- File... open video file... select option "automatically load linked segment", and open the first image. The images need to be in sequenece
- Video... frame rate. (24-30 fps should be fine.)
- Video... Compression... XviD
- Video... Filter... Add... MSU deflicker
- Video... Filter... Add... Resize... to resize to full HD (1920x1280) or whatever you like. Tip: The width and length is with advantage a multiple of 4!
- File... Save as avi...
