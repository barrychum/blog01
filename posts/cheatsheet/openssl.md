---
title: "Openssl commands"
date: 2024-06-21
tags: 
  - "Cheatsheet/openssl"
---
### Brief Steps

1. **Generate Private Key:**
   ```bash
   openssl genpkey -algorithm RSA -out private_key.pem -aes256 -pass pass:your_password
   openssl genpkey -algorithm RSA -out private_key.pem

   ```

2. **Generate Public Key:**
   ```bash
   openssl rsa -pubout -in private_key.pem -out public_key.pem -passin pass:your_password
   ```

3. **Generate Symmetric Key:**
   ```bash
   openssl rand -base64 32 -out symmetric_key.bin
   ```

4. **Encrypt File with Symmetric Key:**
   ```bash
   openssl enc -aes-256-cbc -salt -in plaintext_file -out encrypted_file.enc -pass file:symmetric_key.bin
   ```

5. **Encrypt Symmetric Key with Public Key:**
   ```bash
   openssl rsautl -encrypt -inkey public_key.pem -pubin -in symmetric_key.bin -out symmetric_key.bin.enc
   ```

### What If You Lose the Public Key and Symmetric Key?

If you lose both the public key and the symmetric key, you **cannot** regenerate them to decrypt the files. Encryption is based on the unique keys generated initially. Losing these keys means losing access to the encrypted data. Always ensure you securely back up your keys.