---
title: "Google JSON explained"
date: 2024-07-13
tags: 
  - "Cheatsheet/google"
---
The two JSON tokens represent different types of authentication methods for accessing Google Cloud services.

### Installed Application Token
```json
{
    "installed": {
        "client_id": "3778240xxxxxxxxxxxxx5u5bh.apps.googleusercontent.com",
        "project_id": "dummy_project_id",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "Gxxxxxxxxxxxxxxxxxxxx",
        "redirect_uris": [
            "http://localhost"
        ]
    }
}
```
#### Key Characteristics:
- **Client Type:** Installed application (e.g., desktop or mobile apps).
- **Authentication:** Uses OAuth 2.0 for user consent and authorization.
- **Client ID and Secret:** Includes a `client_id` and `client_secret` for the application.
- **Redirect URIs:** Includes `redirect_uris` which are the endpoints to which the user is redirected after authentication.

### Service Account Token
```json
{
    "type": "service_account",
    "project_id": "dummy_project_id",
    "private_key_id": "6xxxxxxxxxxxxxxxxxxxx",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMxxxxxxxxxxxxxxxkK5FKrGRt\n-----END PRIVATE KEY-----\n",
    "client_email": "tts-33@dummy_project_id.iam.gserviceaccount.com",
    "client_id": "108xxxxxxxxxxx32",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/tts-33%40dummy_project_id.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}
```
#### Key Characteristics:
- **Client Type:** Service account (automated server-to-server interactions).
- **Authentication:** Uses a private key for secure authentication.
- **Client Email:** Contains `client_email` for the service account.
- **Private Key:** Includes a `private_key` used for signing requests.
- **Service Account Specific:** Designed for service-to-service communication without user intervention.

### Summary Table

| Feature                              | Installed Application Token                                       | Service Account Token                                             |
|--------------------------------------|-------------------------------------------------------------------|-------------------------------------------------------------------|
| **Client Type**                      | Installed application (e.g., desktop or mobile apps)              | Service account (automated server-to-server interactions)         |
| **Authentication Method**            | OAuth 2.0 with user consent                                       | Private key for secure authentication                             |
| **Client ID**                        | `client_id` is present                                            | `client_id` is present                                            |
| **Client Secret**                    | `client_secret` is included                                       | No client secret                                                  |
| **Private Key**                      | Not included                                                      | `private_key` is included                                         |
| **Client Email**                     | Not included                                                      | `client_email` is included                                        |
| **Redirect URIs**                    | `redirect_uris` are included                                      | Not included                                                      |
| **Use Case**                         | User-based access, e.g., desktop/mobile apps                      | Automated server-to-server access                                 |

The main difference is that the installed application token is used for user-based OAuth 2.0 authentication, while the service account token is used for server-to-server authentication with a private key.
