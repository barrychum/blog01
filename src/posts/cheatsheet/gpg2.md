---
title: "GPG cheatsheet 2"
date: 2024-06-17
tags: 
  - "Cheatsheet/GPG"
---
## GPG Quick Guide

### Table of Contents
1. [Introduction](#introduction)
2. [Create a Key Pair](#create-a-key-pair)
3. [List Public Keys](#list-public-keys)
4. [List Private Keys](#list-private-keys)
5. [Export a Public Key](#export-a-public-key)
6. [Import a Public Key](#import-a-public-key)
7. [Encrypting a File](#encrypting-a-file)
8. [Decrypting a File](#decrypting-a-file)
9. [Delete a Key Pair](#delete-a-key-pair)
10. [Generate GPG Keys in Batch Mode](#generate-gpg-keys-in-batch-mode)
11. [Bash Script to Export All GPG Private Keys](#bash-script-to-export-all-gpg-private-keys)
12. [Backup and Restore](#backup-and-restore)
    - [Backup the Private Key](#backup-the-private-key)
    - [Import and Restore on the New Machine](#import-and-restore-on-the-new-machine)
    - [Script for Importing and Setting Up Keys on the New Machine](#script-for-importing-and-setting-up-keys-on-the-new-machine)
    - [Steps to Use the Script](#steps-to-use-the-script)
13. [Comparison of RSA, ECC, and Ed25519](#comparison-of-rsa-ecc-and-ed25519)
14. [Use ECC for OpenSSL](#use-ecc-for-openssl)
    - [Generating an ECC Private Key](#generating-an-ecc-private-key)
    - [Generating a Corresponding Public Key](#generating-a-corresponding-public-key)
    - [Generating an ECC Certificate Signing Request (CSR)](#generating-an-ecc-certificate-signing-request-csr)
    - [Creating a Self-Signed ECC Certificate](#creating-a-self-signed-ecc-certificate)
    - [Encrypting and Decrypting Data](#encrypting-and-decrypting-data)
15. [Summary](#summary)

---

### 1. Introduction
This guide provides a quick reference for using GnuPG (GPG) for key management and file encryption. It covers key pair creation, listing and deleting keys, exporting and importing keys, encrypting and decrypting files, and scripting key backup and restore processes. Additionally, it includes a comparison of RSA, ECC, and Ed25519 encryption methods and instructions for using ECC with OpenSSL.

---

### 2. **Create a Key Pair**
Generate a new GPG key pair for encryption and signing.

   ```
   gpg --full-generate-key
   ```
   - Follow the prompts to select the key type. For file encryption, use ECC or RSA. Email and comment are optional. Real name is used for key pair identification. To avoid a passphrase, use [batch mode](#generate-gpg-keys-in-batch-mode) to create the key.

### 3. **List Public Keys**
Display all public keys stored in your keyring.

   ```
   gpg --list-keys
   ```

### 4. **List Private Keys**
Display all private (secret) keys stored in your keyring.

   ```
   gpg --list-secret-keys
   ```

### 5. **Export a Public Key**
Export a public key to a file, which can be shared with others.

   ```
   gpg --export -a KEY_ID > public_key.asc
   ```

### 6. **Import a Public Key**
Import a public key from a file to your keyring.

   ```
   gpg --import public_key.asc
   ```

### 7. **Encrypting a File**
Encrypt a file using a recipient's public key.

   ```
   gpg --output encrypted-file.gpg --encrypt --recipient "MyLabel" file-to-encrypt.txt
   ```

### 8. **Decrypting a File**
Decrypt an encrypted file using your private key.

   ```
   gpg --output decrypted-file.txt --decrypt encrypted-file.gpg
   ```

### 9. **Delete a Key Pair**
Remove a key pair (both public and private keys) from your keyring.

   - First, delete the public key:
     ```
     gpg --delete-key KEY_ID
     ```
   - Then, delete the private key:
     ```
     gpg --delete-secret-key KEY_ID
     ```

### 10. **Generate GPG Keys in Batch Mode**
You can create a GnuPG key pair for file encryption without a password (passphrase). This can be useful in automated scripts where manual entry of the passphrase is impractical. Create a configuration file for GnuPG that specifies the key parameters and includes the `%no-protection` option to indicate that the key should not be protected by a passphrase.

1. **Create a Configuration File**:
   Create a configuration file, `gpg-key-gen.conf`, with the desired key parameters.

   #### RSA Configuration File
   ```plaintext
   %echo Generating a basic OpenPGP key
   Key-Type: RSA
   Key-Length: 2048
   Subkey-Type: RSA
   Subkey-Length: 2048
   Name-Real: MyLabel
   Name-Comment: MyComment
   Expire-Date: 0
   %no-protection
   %commit
   %echo done
   ```

   #### ECC Configuration File
   ```plaintext
   %echo Generating an ECC OpenPGP key
   Key-Type: ECDSA
   Key-Curve: secp256r1
   Subkey-Type: ECDH
   Subkey-Curve: secp256r1
   Name-Real: MyLabel
   Name-Comment: MyComment
   Expire-Date: 0
   %no-protection
   %commit
   %echo done
   ```

2. **Execute the GPG Command to Generate the Key**
   ```sh
   gpg --batch --generate-key gpg-key-gen.conf
   ```

### 11. **Bash Script to Export All GPG Private Keys**

This script exports all GPG private keys from your keyring, creating a backup of each private key in a specified directory.

Save the following script to a file, for example `export_gpg_keys.sh`, and make it executable:

```sh
#!/bin/bash

# Directory to store the exported keys
OUTPUT_DIR="./gpg_keys_backup"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Export all private keys
gpg --list-secret-keys --with-colons | grep '^sec' | cut -d':' -f5 | while read -r KEY_ID; do
    echo "Exporting private key for KEY_ID: $KEY_ID"
    gpg --output "$OUTPUT_DIR/private_key_$KEY_ID.asc" --armor --export-secret-keys "$KEY_ID"
done

echo "All private keys have been exported to $OUTPUT_DIR"
```

---

### 12. **Backup and Restore**

1. **Backup the Private Key**
2. **Export the Private Key**:
   - On the original machine, run:
     ```sh
     gpg --export-secret-keys --armor KEY_ID > private-key.asc
     ```
   - Replace `KEY_ID` with your key identifier, found using `gpg --list-secret-keys`.

3. **Import and Restore on the New Machine**
   **Install GnuPG**:
   - Ensure GnuPG is installed on the new machine. If not, install it using:
     ```sh
     brew install gnupg
     ```

   **Import the Private Key**:
   - Copy the `private-key.asc` file to the new machine.
   - Import the private key:
     ```sh
     gpg --import private-key.asc
     ```

   **Regenerate the Public Key**:
   - The public key is automatically regenerated during the private key import, but you can explicitly export it if needed:
     ```sh
     gpg --export --armor KEY_ID > public-key.asc
     ```

   **Rebuild Trust Settings**:
   - After importing the key, set the trust level:
     ```sh
     gpg --edit-key KEY_ID
     ```
   - In the GnuPG interactive prompt, set the trust level:
     ```sh
     gpg> trust
     gpg> save
     ```

4. **Script for Importing and Setting Up Keys on the New Machine**
Save the following script to a file, for example `setup_gpg.sh`, and make it executable:

```sh
#!/bin/bash

# Import the private key
gpg --import private-key.asc

# Extract the key ID from the imported private key
KEY_ID=$(gpg --list-secret-keys --with-colons | awk -F: '/^sec:/ {print $5}')

# Export the public key (optional, since GnuPG regenerates it)
gpg --export --armor $KEY_ID > public-key.asc

# Set the trust level
echo -e "5\ny\n" | gpg --command-fd 0 --edit-key $KEY_ID trust

echo "Private key imported and trust set."
```


---

### 13. **Comparison of RSA, ECC, and Ed25519**

| Feature                        | RSA                            | ECC (secp256r1)                 | Ed25519                         |
|--------------------------------|--------------------------------|--------------------------------|---------------------------------|
| **Algorithm Type**             | Asymmetric/Public Key          | Asymmetric/Public Key          | Asymmetric/Public Key           |
| **Key Size (Typical)**         | 2048, 3072, 4096 bits          | 256 bits (secp256r1)           | 256 bits                        |
| **Security Level**             | 2048-bit RSA ≈ 112-bit ECC     | 256-bit ECC ≈ 3072-bit RSA     | 128-bit security                |
| **Performance**                | Slower for key generation, encryption, and decryption       | Faster for key generation, encryption, and decryption      | Very fast for signing and verification       |
| **Signature Size**             | Large (≥256 bytes for 2048-bit)| Smaller (64 bytes)             | Small (64 bytes)                |
| **Encryption Speed**           | Slower                         | Faster                         | Not used for encryption         |
| **Decryption Speed**           | Slower                         | Faster                         | Not used for decryption         |
| **Key Generation Speed**       | Slower                         | Faster                         | Very fast                       |
| **Standardization**            | Widely standardized and used   | Standardized and widely used   | Standardized (RFC 8032)         |
| **Use Cases**                  | General-purpose encryption, digital signatures, TLS     | General-purpose encryption, digital signatures, TLS    | Digital signatures, SSH, TLS    |
| **Complexity**                 | Easier to understand and use   | More complex mathematics       | Easier to implement and use     |
| **Compatibility**              | Very high compatibility        | High compatibility             | Increasing compatibility        |
| **Quantum Resistance**         | Vulnerable                     | Vulnerable                     | Vulnerable                      |
| **Patent Concerns**            | No patent issues               | Some historical patents        | No known patent issues          |
| **Key Size Efficiency**        | Less efficient (large keys)    | More efficient (smaller keys)  | Highly efficient (small keys)   |
| **Curve Name**                 | N/A                            | secp256r1 (P-256)              | ed25519                         |

---

### 14. **Use ECC for OpenSSL**
OpenSSL supports ECC since version 0.9.8, offering various ECC algorithms for key generation, digital signatures, and encryption.

1. **Generating an ECC Private Key**
```
openssl ecparam -name prime256v1 -genkey -noout -out ec_private_key.pem
```

2. **Generating a Corresponding Public Key**
```
openssl ec -in ec_private_key.pem -pubout -out ec_public_key.pem
```

3. **Generating an ECC Certificate Signing Request (CSR)**
```
openssl req -new -key ec_private_key.pem -out ec_csr.pem
```

4. **Creating a Self-Signed ECC Certificate**
```
openssl req -x509 -key ec_private_key.pem -in ec_csr.pem -out ec_certificate.pem -days 365
```

5. **Encrypting and Decrypting Data**
To encrypt data using an ECC public key, use a hybrid approach where the data is encrypted with a symmetric key, and the symmetric key is then encrypted with the ECC public key.

- **Generate a random symmetric key**:
  ```
  openssl rand -out symm_key.bin 32
  ```

- **Encrypt the symmetric key with the ECC public key**:
  ```
  openssl pkeyutl -encrypt -inkey ec_public_key.pem -pubin -in symm_key.bin -out enc_symm_key.bin
  ```

- **Encrypt the data with the symmetric key**:
  ```
  openssl enc -aes-256-cbc -salt -in plain_data.txt -out enc_data.bin -pass file:./symm_key.bin
  ```

- **Decrypt the symmetric key with the ECC private key**:
  ```
  openssl pkeyutl -decrypt -inkey ec_private_key.pem -in enc_symm_key.bin -out dec_symm_key.bin
  ```

- **Decrypt the data with the symmetric key**:
  ```
  openssl enc -d -aes-256-cbc -in enc_data.bin -out dec_data.txt -pass file:./dec_symm_key.bin
  ```

---

### Summary
This guide provides a comprehensive overview of using GPG for encryption, key management, and related scripting. It covers essential commands, backup and restore procedures, and a comparison of encryption algorithms (RSA, ECC, Ed25519). Additionally, it includes instructions for using ECC with OpenSSL and creating GPG keys in batch mode, making it a valuable resource for secure and efficient cryptographic practices.