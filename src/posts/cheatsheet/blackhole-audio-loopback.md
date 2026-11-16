---
title: "Blackhole audio loopback"
date: 2024-07-19
tags: 
  - "Cheatsheet/blackhole"
---
To record system audio using Audacity with the BlackHole 2ch driver on macOS, follow these steps:

1. **Set Up Audio MIDI Setup:**
   - Open the "Audio MIDI Setup" application from Applications > Utilities.
   - Click the "+" button at the bottom left corner and select "Create Multi-Output Device."
   - Check the boxes for both your Mac’s built-in output (or headphones) and the "BlackHole 2ch" device.

2. **Set Multi-Output Device as Default:**
   - Set the newly created Multi-Output Device as your default output device.
     - Right-click on the Multi-Output Device and select "Use this device for sound output."

3. **Configure Audacity:**
   - Open Audacity.
   - Go to Audacity > Preferences > Devices.
   - Set the recording device to "BlackHole 2ch."
   - Set the playback device to your built-in output or headphones.

4. **Start Recording:**
   - Now, when you play audio on your system, it should be routed through BlackHole.
   - Click the record button in Audacity to start recording system audio.

These steps should ensure that system audio is properly routed through BlackHole and can be recorded in Audacity. 




1. **Install `ffmpeg`:**
   - If you haven’t installed `ffmpeg` yet, you can install it using Homebrew:
     ```sh
     brew install ffmpeg
     ```

2. **Set Up BlackHole:**
   - Make sure BlackHole is installed and set up as an audio device in your system.

3. **Create Multi-Output Device:**
   - Follow the steps mentioned previously to create a Multi-Output Device in Audio MIDI Setup, combining your system output and BlackHole.

4. **Use `ffmpeg` to Record Audio to MP3:**
   - Use the following command to record system audio directly to an MP3 file:
     ```sh
     ffmpeg -f avfoundation -i ":BlackHole 2ch" -acodec libmp3lame -ab 192k output.mp3
     ```

This command tells `ffmpeg` to use the BlackHole device for audio input and save the output directly to an MP3 file named `output.mp3` with a bitrate of 192 kbps. Replace `"BlackHole 2ch"` with the exact name of your BlackHole device if it differs. This will allow you to record system audio directly to an MP3 file.





To configure BlackHole 16ch for recording audio from two separate Firefox tabs, follow these steps:

1. **Install and Set Up BlackHole 16ch:**
   - If you haven't installed BlackHole 16ch, download and install it from the official [BlackHole GitHub page](https://github.com/ExistentialAudio/BlackHole).

2. **Configure Audio MIDI Setup:**
   - Open "Audio MIDI Setup" from Applications > Utilities.
   - Click the "+" button at the bottom left corner and select "Create Aggregate Device."
   - Add BlackHole 16ch to the Aggregate Device.
   - Create another Aggregate Device if necessary and configure it similarly.

3. **Route Each Firefox Tab to a Separate Channel:**
   - Use an application like "Audio Hijack" or "Loopback" to route audio from each Firefox tab to different channels in BlackHole 16ch.
   - Configure one Firefox tab to route its audio to channels 1 and 2, and the other tab to channels 3 and 4.

4. **Set Up `ffmpeg` to Record from Each Channel:**
   - Open two separate shell sessions to run `ffmpeg` commands for each pair of audio channels.

### Steps in Detail:

1. **Install BlackHole 16ch:**
   - Follow the installation instructions provided on the [BlackHole GitHub page](https://github.com/ExistentialAudio/BlackHole).

2. **Configure Audio MIDI Setup:**
   - Open "Audio MIDI Setup" from Applications > Utilities.
   - Click the "+" button and select "Create Aggregate Device."
   - Add "BlackHole 16ch" to the Aggregate Device.
   - Set "BlackHole 16ch" as the output device.

3. **Use Audio Routing Software:**
   - **Audio Hijack:**
     - Open Audio Hijack.
     - Create a new session for the first Firefox tab.
     - Add an Application Block and select Firefox.
     - Add an Output Device Block and select "BlackHole 16ch."
     - Set the output channels to 1 and 2.
     - Create another session for the second Firefox tab.
     - Repeat the steps, setting the output channels to 3 and 4.

4. **Record Audio Using `ffmpeg`:**

### Shell Session 1:
```sh
ffmpeg -f avfoundation -i ":0" -channel_layout stereo -channels 2 -acodec libmp3lame -ab 192k output1.mp3
```

### Shell Session 2:
```sh
ffmpeg -f avfoundation -i ":0" -channel_layout stereo -channels 2 -acodec libmp3lame -ab 192k output2.mp3
```

### Adjusting Commands for Specific Channels:
To ensure you're capturing the correct channels, you might need to adjust the `ffmpeg` command to specify the channels more precisely.

#### Example for Channels 1 and 2:
```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch:0" -ac 2 -map_channel 0.0.0 -map_channel 0.0.1 -acodec libmp3lame -ab 192k output1.mp3
```

#### Example for Channels 3 and 4:
```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch:0" -ac 2 -map_channel 0.0.2 -map_channel 0.0.3 -acodec libmp3lame -ab 192k output2.mp3
```

### Notes:
- Ensure the channel mapping in `ffmpeg` matches the channel configuration in Audio Hijack.
- The commands assume that `:BlackHole 16ch` is appropriately configured as the input source.

These steps should allow you to route audio from two Firefox tabs to separate channels in BlackHole 16ch and record them into two separate MP3 files.

It seems there was an error in the command syntax for `ffmpeg`. Let's correct the commands for recording from specific channels using BlackHole. Instead of `-map_channel`, we can use a different approach to specify the input channels.

### Corrected Steps to Record from Specific Channels

1. **Install and Set Up BlackHole 16ch:**
   - Ensure BlackHole 16ch is installed and configured as detailed previously.

2. **Configure Audio MIDI Setup:**
   - Follow the steps to create an Aggregate Device and a Multi-Output Device, ensuring you include BlackHole 16ch and your Mac's Built-in Output or headphones.

3. **Use Audio Routing Software:**
   - Use an application like "Audio Hijack" to route audio from each Firefox tab to different channels in BlackHole 16ch.

4. **Record Audio Using `ffmpeg` (Revised Commands):**

### Shell Session 1 (Recording from channels 1 and 2):

```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch" -filter_complex "[0:0] channelsplit=channel_layout=stereo:channels=0x3[left][right]" -map "[left]" -map "[right]" -acodec libmp3lame -ab 192k output1.mp3
```

### Shell Session 2 (Recording from channels 3 and 4):

```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch" -filter_complex "[0:0] channelsplit=channel_layout=stereo:channels=0xC[left][right]" -map "[left]" -map "[right]" -acodec libmp3lame -ab 192k output2.mp3
```

### Detailed Steps:

1. **Install Homebrew (if not already installed):**

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **Install `ffmpeg`:**

```sh
brew install ffmpeg
```

3. **Configure Audio MIDI Setup:**
   - Open "Audio MIDI Setup" from Applications > Utilities.
   - Create Aggregate Devices for BlackHole (you may need multiple instances of BlackHole if the default doesn't support more channels).
   - Create Multi-Output Device and include BlackHole 16ch and your Mac's Built-in Output.

4. **Route Audio Using Audio Hijack (or Similar Tool):**
   - Use Audio Hijack to route the audio from each Firefox tab to different BlackHole channels.
   - Set one Firefox tab to output to channels 1 and 2.
   - Set the other Firefox tab to output to channels 3 and 4.

5. **Record System Audio:**

#### Shell Session 1 (Recording from channels 1 and 2):

```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch" -filter_complex "[0:0] channelsplit=channel_layout=stereo:channels=0x3[left][right]" -map "[left]" -map "[right]" -acodec libmp3lame -ab 192k output1.mp3
```

#### Shell Session 2 (Recording from channels 3 and 4):

```sh
ffmpeg -f avfoundation -i ":BlackHole 16ch" -filter_complex "[0:0] channelsplit=channel_layout=stereo:channels=0xC[left][right]" -map "[left]" -map "[right]" -acodec libmp3lame -ab 192k output2.mp3
```

### Explanation:

- `channelsplit`: This filter is used to split the channels from the input.
- `channel_layout`: Defines the layout of the input channels.
- `channels=0x3`: Represents channels 1 and 2.
- `channels=0xC`: Represents channels 3 and 4.
- `-map "[left]" -map "[right]"`: Maps the split channels to the output.

This setup should allow you to route audio from two Firefox tabs to different channels in BlackHole 16ch and record them into two separate MP3 files using `ffmpeg`. If you have any further issues or need additional assistance, please let me know!
