---
title: "Github commands"
date: 2024-06-21
tags: 
  - "Cheatsheet/github"
---
gh auth logout
gh auth token

gh auth login

gh config set git_protocol ssh



ssh-keygen -t ed25519 -C "nerdvanasite@gmail.com" -f ~/.ssh/id_ed25519_nerdvanasite 

ssh-keygen -f ~/.ssh/acct01

gh auth status


To login to a specific account using `gh auth login`, you typically manage multiple accounts by using different SSH keys and SSH configuration entries, as `gh auth login` doesn't directly support multiple accounts. Here’s how you can set up SSH keys and use them with `gh auth login`:

### Detailed Steps:

1. **Generate a New SSH Key Pair for a Specific Account:**

   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com" -f ~/.ssh/id_ed25519_accountname1
   ```

   This command generates a new SSH key pair and saves it with a name that includes your account name (e.g., `id_ed25519_accountname1`).

2. **Add the SSH Key to the SSH Agent:**

   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519_accountname1
   ```

3. **Add the SSH Key to Your GitHub Account:**

   ```bash
   cat ~/.ssh/id_ed25519_accountname1.pub
   ```

   Copy the output and add it to your GitHub account at https://github.com/settings/keys.

4. **Configure SSH to Use the Key for GitHub:**

   Edit the `~/.ssh/config` file:

   ```bash
   nano ~/.ssh/config
   ```

   Add an entry for your GitHub account:

   ```plaintext
   Host github.com-accountname1
     HostName github.com
     User git
     IdentityFile ~/.ssh/id_ed25519_accountname1
   ```

5. **Login to GitHub with `gh` CLI Using the Specific Account:**

   Unfortunately, `gh auth login` doesn’t allow you to directly specify the SSH key or account. Instead, you can log in normally and configure Git to use the appropriate SSH configuration. Here’s how you can manage this:

   ```bash
   gh auth login
   ```

   Follow the prompts to authenticate.

6. **Use the SSH Configuration in Git Commands:**

   When you clone or interact with repositories, specify the custom host from your SSH config:

   ```bash
   git clone git@github.com-accountname1:username/repository.git
   ```

### Example Script to Automate This Setup:

```bash
#!/bin/bash

# Ask for the GitHub email address and account name
read -p "Enter your GitHub email address: " GITHUB_EMAIL
read -p "Enter your GitHub account name: " ACCOUNT_NAME

# Specify a filename for the new SSH key
KEY_FILENAME="id_ed25519_${ACCOUNT_NAME}"

# Generate a new SSH key pair
ssh-keygen -t ed25519 -C "$GITHUB_EMAIL" -f ~/.ssh/$KEY_FILENAME -N ""

# Start the SSH agent
eval "$(ssh-agent -s)"

# Add the new SSH key to the SSH agent
ssh-add ~/.ssh/$KEY_FILENAME

# Create or update the SSH config file
SSH_CONFIG_FILE=~/.ssh/config

# Add configuration for GitHub to use the new SSH key
echo -e "\nHost github.com-$ACCOUNT_NAME\n  HostName github.com\n  User git\n  IdentityFile ~/.ssh/$KEY_FILENAME" >> $SSH_CONFIG_FILE

# Display the public key
echo "Here is your new SSH public key:"
cat ~/.ssh/$KEY_FILENAME.pub

echo "Please add this SSH key to your GitHub account by visiting: https://github.com/settings/keys"
echo "After adding the SSH key, you can test the connection with: ssh -T git@github.com-$ACCOUNT_NAME"

# Authenticate with GitHub using gh CLI
echo "Logging in to GitHub with gh CLI..."
gh auth login

echo "Configuration complete. Use 'git@github.com-$ACCOUNT_NAME:username/repository.git' for your Git operations."
```

### To Use the Script:

1. Save it to a file, for example, `setup_github_account.sh`.
2. Make the script executable:
   ```bash
   chmod +x setup_github_account.sh
   ```
3. Run the script:
   ```bash
   ./setup_github_account.sh
   ```

This script will help you set up an SSH key for a specific GitHub account, add it to the SSH agent, configure SSH to use this key for GitHub, and guide you through logging in with the `gh` CLI. When interacting with repositories, use the custom host configuration from the SSH config file.