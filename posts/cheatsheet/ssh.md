---
title: "ssh cheatsheet"
date: 2024-07-31
tags: 
  - "Cheatsheet/ssh"
---
To use this script:

1. Generate an SSH key pair if you haven't already:
   ```
   ssh-keygen -t rsa -b 4096 -f ~/.ssh/nas_rsa
   ```

2. Copy the public key to the NAS:
   ```
   ssh-copy-id -i ~/.ssh/nas_rsa.pub admin@192.168.38.49
   ```

3. On the NAS, configure sudo to allow the admin user to run poweroff without a password. Add this line to the sudoers file (use `visudo`):
   ```
   admin ALL=(ALL) NOPASSWD: /sbin/poweroff, /sbin/shutdown
   ```

4. Save the script with a `.sh` extension (e.g., `nas_shutdown.sh`), make it executable (`chmod +x nas_shutdown.sh`), and run it.

# Attempt to shut down the NAS
```
if ssh -i "$SSH_KEY_PATH" -o StrictHostKeyChecking=no -o ConnectTimeout="$TIMEOUT" "$ADMIN_USER@$NAS_IP" 'sudo -n poweroff'; then
    log_message "Shutdown command sent successfully to NAS"
else
    log_message "Error: Failed to send shutdown command to NAS"
    exit 1
fi
```
