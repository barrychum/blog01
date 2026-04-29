---
title: "openbao cheatsheet"
date: 2026-04-28
tags: 
  - "Cheatsheet/openbao"
---
{% raw %}

Here's the corrected stack:

```yaml
services:
  openbao:
    image: openbao/openbao:latest
    container_name: openbao
    restart: unless-stopped
    cap_add:
      - IPC_LOCK
    volumes:
      - /mnt/disk2/docker/bao/config:/openbao/config
      - /mnt/disk2/docker/bao/data:/openbao/data
    environment:
      - BAO_ADDR=http://0.0.0.0:8200
    command: server -config=/openbao/config/config.hcl
    networks:
      - proxy
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.openbao.rule=Host(`bao.britbuzz.uk`)"
      - "traefik.http.routers.openbao.entrypoints=websecure"
      - "traefik.http.routers.openbao.tls.certresolver=myresolver"
      - "traefik.http.services.openbao.loadbalancer.server.port=8200"

networks:
  proxy:
    external: true
```

---

**Your `config.hcl`** at `/mnt/disk2/docker/bao/config/config.hcl` needs to exist before you deploy. Minimum working config:

```hcl
storage "file" {
  path = "/openbao/data"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = true
}

ui = true
```

`tls_disable = true` is correct here — Traefik handles TLS externally, so the internal listener doesn't need it.

---

**After deploying**, since this is production mode (not dev), you'll need to initialise and unseal once:

```bash
# Init — run once, save the output somewhere safe
curl -s --request POST \
  --data '{"secret_shares":5,"secret_threshold":3}' \
  https://bao.britbuzz.uk/v1/sys/init

# Unseal — repeat 3 times with 3 different keys from the init output
curl -s --request POST \
  --data '{"key":"<unseal_key_N>"}' \
  https://bao.britbuzz.uk/v1/sys/unseal
```

The init response gives you 5 unseal keys and a root token — store these securely, they cannot be recovered if lost.

---

When fully unsealed the response will show `"sealed": false`. You can also check status anytime:

```bash
curl -s https://bao.britbuzz.uk/v1/sys/seal-status | jq .
```

---

## 5 — Enable the KV secrets engine

```bash
curl -s --request POST \
  --header "X-Vault-Token: <root_token>" \
  --data '{"type":"kv","options":{"version":"2"}}' \
  https://bao.britbuzz.uk/v1/sys/mounts/secret
```

---

## 6 — Write and read your first secret

**Write:**
```bash
curl -s --request POST \
  --header "X-Vault-Token: <root_token>" \
  --data '{"data":{"username":"admin","password":"supersecret"}}' \
  https://bao.britbuzz.uk/v1/secret/data/myapp/config
```

**Read:**
```bash
curl -s \
  --header "X-Vault-Token: <root_token>" \
  https://bao.britbuzz.uk/v1/secret/data/myapp/config | jq .data.data
```

---

## 7 — Access the UI

Visit `https://bao.britbuzz.uk/ui` in your browser and log in with your root token. It's a full GUI for managing secrets, policies, and auth methods.

---

## Important — after every container restart

OpenBao re-seals itself on restart. You'll need to re-run the 3 unseal curl commands (Step 4) each time. If you want to automate this, look into **auto-unseal** using a cloud KMS or a transit seal — but manual unseal is fine to start with.

---


That's a security feature — OpenBao (and Vault) prevent any auth method from issuing root-level tokens directly. You need to attach a policy instead.

---

## Step 1 — Create an admin policy

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{"policy":"path \"*\" { capabilities = [\"create\", \"read\", \"update\", \"delete\", \"list\", \"sudo\"] }"}' \
  https://bao.britbuzz.uk/v1/sys/policies/acl/admin
```

This creates a policy called `admin` that has full access to everything — effectively the same as root but allowed via userpass.

---

## Step 2 — Create the user with the admin policy

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{"password":"yourpassword","token_policies":"admin"}' \
  https://bao.britbuzz.uk/v1/auth/userpass/users/admin
```

---

## Step 3 — Test the login

```bash
curl -s --request POST \
  --data '{"password":"yourpassword"}' \
  https://bao.britbuzz.uk/v1/auth/userpass/login/admin | jq .auth.client_token
```

You should get back a client token, and the UI login with username/password should now work without errors.

---

TOTP (Time-based One Time Password) in OpenBao works as a **secrets engine** that generates TOTP codes for you — it acts like an authenticator app (Google Authenticator, Authy etc). It's not used for logging *into* OpenBao itself, but rather for generating/validating TOTP codes for your *other* services.

---

## Step 1 — Enable the TOTP secrets engine

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{"type":"totp"}' \
  https://bao.britbuzz.uk/v1/sys/mounts/totp
```

---

## Step 2 — Create a TOTP key for a service

This example creates a TOTP key for a service called `gmail`:

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{
    "generate": true,
    "issuer": "Gmail",
    "account_name": "you@gmail.com"
  }' \
  https://bao.britbuzz.uk/v1/totp/keys/gmail | jq .
```

The response will include a `barcode` (base64 PNG) and a `url` (otpauth:// string):

```json
{
  "data": {
    "barcode": "iVBORw0KGgo...",
    "url": "otpauth://totp/Gmail:you@gmail.com?secret=XXXX&issuer=Gmail"
  }
}
```

---

## Step 3 — Scan the QR code or import the URL

**Option A — decode the barcode to a PNG and scan it:**

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{"generate":true,"issuer":"Gmail","account_name":"you@gmail.com"}' \
  https://bao.britbuzz.uk/v1/totp/keys/gmail | jq -r .data.barcode | base64 -d > totp-gmail.png
```

Then open `totp-gmail.png` and scan it with your authenticator app.

**Option B — copy the `url` value** and paste it directly into an authenticator app that accepts otpauth:// URLs.

---

## Step 4 — Generate a TOTP code via curl

Once set up, you can ask OpenBao to generate the current 6-digit code:

```bash
curl -s \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  https://bao.britbuzz.uk/v1/totp/code/gmail | jq .data.code
```

Returns:

```json
"123456"
```

---

## Step 5 — Validate a TOTP code

You can also use OpenBao to *validate* a code (useful in scripts):

```bash
curl -s --request POST \
  --header "X-Vault-Token: s.grGeqDTAOuPZeY7JnTbRBDah" \
  --data '{"code":"123456"}' \
  https://bao.britbuzz.uk/v1/totp/code/gmail | jq .data.valid
```

Returns `true` or `false`.

---

## Summary of how it fits together

| What | Who holds the secret |
|---|---|
| Normal authenticator app | Your phone holds the TOTP seed |
| OpenBao TOTP engine | OpenBao holds the TOTP seed, generates codes on demand |

The advantage of storing TOTP seeds in OpenBao is that you have a centralised, backed-up, audited store of all your 2FA secrets — useful for shared team accounts or server-to-server authentication where a phone isn't practical.

---



{% endraw %}
