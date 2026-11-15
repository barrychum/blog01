---
title: "GPG cheatsheet"
date: 2024-06-17
tags: 
  - "Cheatsheet/GPG"
---
# GPG quick guid


#### 1. **Create a Key Pair**
   ```bash
   gpg --full-generate-key
   ```
   - Follow the prompts to select key type.  If you want to use gpg for file encryption, use ECC or RSA.  Email and comment are option.  Real name is used for key pair identification.  If you do not want a passphrase, you need to use batch mode to create the key.

#### 2. **List Public Keys**
   ```bash
   gpg --list-keys
   ```

#### 3. **List Private Keys**
   ```bash
   gpg --list-secret-keys
   ```

#### 4. **Delete a Key Pair**
   - First, delete the public key:
     ```bash
     gpg --delete-key KEY_ID
     ```
   - Then, delete the private key:
     ```bash
     gpg --delete-secret-key KEY_ID
     ```

### Additional Commands

- **Export a Public Key**:
  ```bash
  gpg --export -a KEY_ID > public_key.asc
  ```

- **Import a Public Key**:
  ```bash
  gpg --import public_key.asc
  ```

- **Encrypting a File**:

```sh
gpg --output encrypted-file.gpg --encrypt --recipient "MyLabel" file-to-encrypt.txt
```

- **Decrypting a File**:

```sh
gpg --output decrypted-file.txt --decrypt encrypted-file.gpg
```


---

This is a script that exports all GPG private keys from your keyring. This script will create a backup of each private key in your keyring and save it to a specified directory. You can customize the output directory as needed.

### Bash Script to Export All GPG Private Keys

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

Here are the steps to backup the private key, import it to another machine, regenerate the public key, and rebuild the trust on the new machine:

## Backukp and Resotre
### Backup the Private Key

1. **Export the Private Key**:
   - On the original machine, run the following command to export the private key:
     ```sh
     gpg --export-secret-keys --armor KEY_ID > private-key.asc
     ```
   - Replace `KEY_ID` with the identifier of your key, which you can find using `gpg --list-secret-keys`.

### Import and Restore on the New Machine

1. **Install GnuPG**:
   - Ensure GnuPG is installed on the new machine. If not, install it using Homebrew:
     ```sh
     brew install gnupg
     ```

2. **Import the Private Key**:
   - Copy the `private-key.asc` file to the new machine.
   - Import the private key:
     ```sh
     gpg --import private-key.asc
     ```

3. **Regenerate the Public Key**:
   - The public key is automatically regenerated during the private key import. However, you can explicitly export it if needed:
     ```sh
     gpg --export --armor KEY_ID > public-key.asc
     ```

4. **Rebuild Trust Settings**:
   - After importing the key, set the trust level:
     ```sh
     gpg --edit-key KEY_ID
     ```
   - In the GnuPG interactive prompt, set the trust level:
     ```sh
     gpg> trust
     gpg> save
     ```

### Script for Importing and Setting Up Keys on the New Machine

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
# The trust level can be set to one of the following:
# 1 = I don't know or won't say
# 2 = I do NOT trust
# 3 = I trust marginally
# 4 = I trust fully
# 5 = I trust ultimately
echo -e "5\ny\n" | gpg --command-fd 0 --edit-key $KEY_ID trust

echo "Private key imported and trust set."
```

### Steps to Use the Script

1. **Save the Script**:
   Save the script to a file, for example `setup_gpg.sh`.

2. **Make the Script Executable**:
   ```sh
   chmod +x setup_gpg.sh
   ```

3. **Run the Script**:
   Ensure the `private-key.asc` file is in the same directory as the script, then run the script:
   ```sh
   ./setup_gpg.sh
   ```

---

### Comparison of RSA, ECC and Ed25519 :

| Feature                        | RSA                            | ECC (secp256r1)                 | Ed25519                         |
|--------------------------------|--------------------------------|--------------------------------|---------------------------------|
| **Algorithm Type**             | Asymmetric/Public Key          | Asymmetric/Public Key          | Asymmetric/Public Key           |
| **Key Size (Typical)**         | 2048, 3072, 4096 bits          | 256 bits (secp256r1)           | 256 bits                        |
| **Security Level**             | 2048-bit RSA ≈ 112-bit ECC     | 256-bit ECC ≈ 3072-bit RSA     | 128-bit security                |
| **Performance**                | Slower for key generation,<br> encryption, and decryption       | Faster for key generation,<br> encryption, and decryption      | Very fast for signing and<br>verification       |
| **Signature Size**             | Large (≥256 bytes for 2048-bit)| Smaller (64 bytes)             | Small (64 bytes)                |
| **Encryption Speed**           | Slower                         | Faster                         | Not used for encryption         |
| **Decryption Speed**           | Slower                         | Faster                         | Not used for decryption         |
| **Key Generation Speed**       | Slower                         | Faster                         | Very fast                       |
| **Standardization**            | Widely standardized and used   | Standardized and widely used   | Standardized (RFC 8032)         |
| **Use Cases**                  | General-purpose encryption,<br> digital signatures, TLS     | General-purpose encryption,<br> digital signatures, TLS    | Digital signatures, SSH, TLS    |
| **Complexity**                 | Easier to understand and use   | More complex mathematics       | Easier to implement and use     |
| **Compatibility**              | Very high compatibility        | High compatibility             | Increasing compatibility        |
| **Quantum Resistance**         | Vulnerable                     | Vulnerable                     | Vulnerable                      |
| **Patent Concerns**            | No patent issues               | Some historical patents        | No known patent issues          |
| **Key Size Efficiency**        | Less efficient (large keys)    | More efficient (smaller keys)  | Highly efficient (small keys)   |
| **Curve Name**                 | N/A                            | secp256r1 (P-256)              | ed25519                         |

### Key Points

- **RSA**: 
  - RSA is a well-established cryptographic algorithm known for its versatility in encryption and digital signatures. However, it requires significantly larger key sizes to achieve comparable security levels to ECC and Ed25519.
  - RSA operations, especially with larger keys, are slower compared to ECC and Ed25519.

- **ECC (Elliptic Curve Cryptography)**:
  - ECC offers strong security with smaller key sizes, resulting in faster computations and reduced storage requirements. 
  - secp256r1 (also known as P-256) is a commonly used curve in ECC, providing robust security with a 256-bit key.
  - ECC is preferred for its efficiency and strong security but can be more complex to implement correctly.

- **Ed25519**:
  - Ed25519 is a specific implementation of ECC designed for high performance and strong security with a focus on digital signatures.
  - It is known for its speed and efficiency, with very fast key generation and signature operations.
  - Ed25519 provides a high level of security with smaller key sizes and is increasingly supported in modern cryptographic applications.

---

### Use ECC for OpenSSL
OpenSSL has included support for ECC since version 0.9.8, and it provides various ECC algorithms for key generation, digital signatures, and encryption.

### Using ECC with OpenSSL

Here are some common tasks you can perform with ECC using OpenSSL:

#### 1. Generating an ECC Private Key

To generate an ECC private key, you need to specify the curve you want to use. Here’s an example using the `prime256v1` curve (also known as `secp256r1`):

```sh
openssl ecparam -name prime256v1 -genkey -noout -out ec_private_key.pem
```

#### 2. Generating a Corresponding Public Key

To extract the public key from the private key:

```sh
openssl ec -in ec_private_key.pem -pubout -out ec_public_key.pem
```

#### 3. Generating an ECC Certificate Signing Request (CSR)

To generate a CSR using the ECC private key:

```sh
openssl req -new -key ec_private_key.pem -out ec_csr.pem
```

You will be prompted to enter information for the CSR, such as country, state, organization, etc.

#### 4. Creating a Self-Signed ECC Certificate

To create a self-signed certificate using the ECC private key:

```sh
openssl req -x509 -key ec_private_key.pem -in ec_csr.pem -out ec_certificate.pem -days 365
```

This command creates a self-signed certificate valid for 365 days.

#### 5. Encrypting and Decrypting Data

To encrypt data using an ECC public key, you typically use a hybrid approach where the data is encrypted with a symmetric key (e.g., AES), and the symmetric key is then encrypted with the ECC public key. Here’s a simplified example:

- **Generate a random symmetric key**:
  ```sh
  openssl rand -out symm_key.bin 32
  ```

- **Encrypt the symmetric key with the ECC public key**:
  ```sh
  openssl pkeyutl -encrypt -inkey ec_public_key.pem -pubin -in symm_key.bin -out enc_symm_key.bin
  ```

- **Encrypt the data with the symmetric key**:
  ```sh
  openssl enc -aes-256-cbc -salt -in plain_data.txt -out enc_data.bin -pass file:./symm_key.bin
  ```

- **Decrypt the symmetric key with the ECC private key**:
  ```sh
  openssl pkeyutl -decrypt -inkey ec_private_key.pem -in enc_symm_key.bin -out dec_symm_key.bin
  ```

- **Decrypt the data with the symmetric key**:
  ```sh
  openssl enc -d -aes-256-cbc -in enc_data.bin -out dec_data.txt -pass file:./dec_symm_key.bin
  ```

ECC provides stronger security with smaller key sizes compared to RSA, making it an efficient and secure option for cryptographic operations.


### Generate GPG Keys in batch mode
You can create a GnuPG key pair for file encryption without a password (passphrase). This can be useful in automated scripts where manual entry of the passphrase is impractical. 
Create a configuration file for GnuPG that specifies the key parameters and includes the `%no-protection` option to indicate that the key should not be protected by a passphrase.


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

   - **Key-Type**: Type of key to generate (e.g., RSA).
   - **Key-Length**: Length of the primary key.
   - **Subkey-Type**: Type of subkey (optional).
   - **Subkey-Length**: Length of the subkey (optional).
   - **Name-Real**: Real name or label for the key.
   - **Name-Comment**: Optional comment or label.
   - **Expire-Date**: Expiration date (0 for no expiration).
   - **%no-protection**: Skip passphrase protection (optional for scripting).
   - **%commit**: Finalize the key generation.
   - **%echo**: Print messages to the console.


2. **Execute gpg command to generate the key**

   ```sh
   # Generate the GPG key
   gpg --batch --generate-key gpg-key-gen.conf
   ```


