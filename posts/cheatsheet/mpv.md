---
title: "MPV player"
date: 2024-07-15
tags: 
  - "Cheatsheet/mpv"
---
MPV supports a wide range of commands via its IPC socket. Here's a list of some of the most commonly used commands:

1. Playback Control:
   - `["play"]` - Start playback
   - `["pause"]` - Toggle pause
   - `["stop"]` - Stop playback
   - `["frame-step"]` - Advance one frame
   - `["frame-back-step"]` - Go back one frame
   - `["seek", <seconds>]` - Seek to a specific time
   - `["set_property", "pause", <true/false>]` - Set pause state

2. Volume Control:
   - `["set_property", "volume", <0-100>]` - Set volume
   - `["cycle", "mute"]` - Toggle mute

3. Playlist Control:
   - `["playlist-next"]` - Play next file in playlist
   - `["playlist-prev"]` - Play previous file in playlist
   - `["loadfile", "<filename>"]` - Load and play a file

4. Property Queries:
   - `["get_property", "playback-time"]` - Get current playback time
   - `["get_property", "duration"]` - Get total duration
   - `["get_property", "filename"]` - Get current filename
   - `["get_property", "estimated-frame-number"]` - Get estimated frame number

5. Subtitle Control:
   - `["cycle", "sub"]` - Switch to next subtitle track
   - `["set_property", "sub-delay", <seconds>]` - Adjust subtitle delay

6. Audio Track Control:
   - `["cycle", "audio"]` - Switch to next audio track

7. Video Control:
   - `["cycle", "video"]` - Switch to next video track (for multi-video files)
   - `["cycle", "fullscreen"]` - Toggle fullscreen

8. Speed Control:
   - `["set_property", "speed", <factor>]` - Set playback speed (e.g., 1.5 for 1.5x speed)

9. Screenshot:
   - `["screenshot"]` - Take a screenshot

10. Quit:
    - `["quit"]` - Close MPV

To use these commands, you would typically format them as JSON. For example:

```bash
echo '{ "command": ["seek", "30"] }' | nc -U /tmp/mpvsocket
```

This list covers many common operations, but MPV supports many more commands and properties. You can find a more exhaustive list in the MPV documentation, specifically in the "List of Input Commands" and "Properties" sections.

