---
title: "macOS bash installation"
date: 2024-06-19
tags: 
  - "Cheatsheet/macOS"
---
To add Bash and set it as the default shell on macOS, follow these steps:

1. **Install Bash (if not already installed):**
   Open Terminal and type the following command to check the installed version of Bash:
   ```sh
   bash --version
   ```
   If you need a newer version of Bash, install it via Homebrew:
   ```sh
   brew install bash
   ```

2. **Add the new Bash to the list of allowed shells:**
   Edit the `/etc/shells` file to include the path to the new Bash version. Open the file with a text editor, such as nano:
   ```sh
   sudo nano /etc/shells
   ```
   Add the path to the new Bash binary at the end of the file. For example, if installed via Homebrew:
   ```sh
   /usr/local/bin/bash
   ```

3. **Change the default shell to Bash:**
   Use the `chsh` command to change the default shell for your user:
   ```sh
   chsh -s /usr/local/bin/bash
   ```

4. **Verify the change:**
   Close the Terminal and open a new one. Verify that Bash is now the default shell:
   ```sh
   echo $SHELL
   ```

If the output is `/usr/local/bin/bash`, Bash is now your default shell.

Setting shell for warp
https://docs.warp.dev/getting-started/using-warp-with-shells

Find default shell
chsh 

Change default shell
chsh -s $(which bash)
chsh -s $(which zsh)
chsh -s /usr/bash



https://starship.rs/
```
brew install starship

# ~/.bashrc

eval "$(starship init bash)"

# ~/.zshrc

eval "$(starship init zsh)"
```

Edit ~/.config/starship.toml, a nice template
https://github.com/theRubberDuckiee/dev-environment-files/blob/main/starship.toml


Starship Built-in Functions: Refer to the Starship documentation on available functions: https://starship.rs/config/ Look for a section on "Functions".
Powerline Symbols: Explore the Powerline symbol list: https://github.com/denysdovhan/spaceship-prompt/issues/401 You can copy and paste the desired symbol into your configuration file.
Custom User Definitions: These depend on the specific plugin or configuration you're using. You might need to refer to the documentation for that plugin or search online for the specific symbols and their functionalities.



Install fonts

https://www.nerdfonts.com/cheat-sheet
https://www.nerdfonts.com/font-downloads
brew install --cask font-<FONT NAME>-nerd-font
e.g.
brew install --cask font-fira-code-nerd-font
brew install --cask font-fira-mono-nerd-font


https://htmlcolorcodes.com/

