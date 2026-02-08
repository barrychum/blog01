---
title: "ANSI Escape Code"
date: 2024-06-28
tags: 
  - "Cheatsheet/ansi"
---
### ANSI Escape Codes for Text Attributes

ANSI escape codes are sequences of characters that control cursor movement, text formatting, and color output on text terminals. Here are some common ones for text attributes:

- **Formatting:**
  - `\e[0m`: Reset all attributes (turn off all formatting).
  - `\e[1m`: Bold or increased intensity.
  - `\e[2m`: Faint (decreased intensity).
  - `\e[3m`: Italic (not widely supported).
  - `\e[4m`: Underline.
  - `\e[5m`: Blink (slow, appears as blinking less than 150 per minute).
  - `\e[6m`: Blink (rapid, appears as blinking more than 150 per minute).
  - `\e[7m`: Image negative.


### ANSI Escape Codes for Text Colors

These codes allow you to change the color of text in your terminal:

- **Foreground (Text) Colors:**
  - `\e[30m`: Black
  - `\e[31m`: Red
  - `\e[32m`: Green
  - `\e[33m`: Yellow
  - `\e[34m`: Blue
  - `\e[35m`: Magenta
  - `\e[36m`: Cyan
  - `\e[37m`: White

- **Background Colors:**
  - `\e[40m`: Black
  - `\e[41m`: Red
  - `\e[42m`: Green
  - `\e[43m`: Yellow
  - `\e[44m`: Blue
  - `\e[45m`: Magenta
  - `\e[46m`: Cyan
  - `\e[47m`: White

### Example Usage

To use these escape codes in Bash, you typically prepend them to the text you want to color. Here’s a simple example to print "Hello, World!" in red:

```bash
echo -e "\e[31mHello, World!\e[0m"
```

In this example:
- `\e[31m` sets the text color to red.
- `\e[0m` resets the color back to the default after "Hello, World!".

### Notes
- Ensure your terminal supports ANSI escape codes for colors. Most modern terminals, including macOS Terminal, iTerm2, and most Linux terminals, support these codes.
- `\e[0m` is used to reset the color and any other formatting changes. It's good practice to include it at the end of your formatted text to avoid unintended color changes in subsequent output.

These codes provide a straightforward way to enhance the visual presentation of text output in terminal applications.