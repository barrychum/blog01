---
title: "Self-sign-cert"
date: 2024-06-11
tags: 
  - "Learn/Cert"
---
To include multiple names (e.g., `127.0.0.1` and `localhost`) in the certificate, you need to use the Subject Alternative Name (SAN) extension. The Common Name (CN) field can only contain one name, but SAN can hold multiple names.

Here's how to do it:

1. **Create a configuration file** for OpenSSL to specify the SAN. Create a file called `openssl.cnf` (or any name you prefer) and include the following content:

    ```ini
    [ req ]
    default_bits       = 2048
    distinguished_name = req_distinguished_name
    req_extensions     = req_ext
    x509_extensions    = v3_ca # The extentions to add to the self signed cert

    [ req_distinguished_name ]
    countryName                 = Country Name (2 letter code)
    countryName_default         = US
    stateOrProvinceName         = State or Province Name (full name)
    stateOrProvinceName_default = California
    localityName                = Locality Name (eg, city)
    localityName_default        = San Francisco
    organizationName            = Organization Name (eg, company)
    organizationName_default    = My Company
    commonName                  = Common Name (eg, YOUR name)
    commonName_default          = localhost

    [ req_ext ]
    subjectAltName = @alt_names

    [ v3_ca ]
    subjectAltName = @alt_names

    [ alt_names ]
    DNS.1   = localhost
    IP.1    = 127.0.0.1
    ```

2. **Generate the private key**:

    ```bash
    openssl genpkey -algorithm RSA -out key.pem -aes256 -pass pass:yourpassword
    ```

3. **Create the certificate signing request (CSR)**:

    ```bash
    openssl req -new -key key.pem -out cert.csr -config openssl.cnf
    ```

4. **Remove the passphrase from the key** (optional but recommended for server use):

    ```bash
    openssl rsa -in key.pem -out key.pem
    ```

5. **Generate the self-signed certificate (`cert.pem`)** with SAN:

    ```bash
    openssl x509 -req -days 365 -in cert.csr -signkey key.pem -out cert.pem -extensions req_ext -extfile openssl.cnf
    ```

By following these steps, you will create a self-signed certificate with multiple names in the SAN field. You can then use `cert.pem` and `key.pem` in your Vaultwarden configuration.