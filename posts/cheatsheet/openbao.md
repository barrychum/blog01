---
title: "openbao cheatsheet"
date: 2026-04-28
tags: 
  - "Cheatsheet/openbao"
---
{% raw %}

Setting up **OpenBao** behind **Traefik** is a powerful combination for a home lab or production environment. OpenBao handles your secrets, while Traefik manages the SSL/TLS termination and routing.

### Architecture Overview
In this setup, Traefik acts as the entry point ($80$/$443$). It will handle Let's Encrypt certificates and proxy traffic to the OpenBao container on port $8200$.



---

### Step 1: Prepare the OpenBao Config (`config.hcl`)
Create a folder named `openbao` and place this `config.hcl` inside a `config/` subfolder. This tells OpenBao to use file storage and trust the proxy.

```hcl
storage "file" {
  path = "/openbao/data"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = "true" # Traefik will handle TLS instead
}

# Important for Traefik to pass the real client IP
proxy_protocol_behavior = "use_always"
ui = true
```

---

### Step 2: The `docker-compose.yml`
This file connects OpenBao to your Traefik network and defines the routing labels.

```yaml
version: '3.8'

services:
  openbao:
    image: openbao/openbao:latest
    container_name: openbao
    restart: always
    cap_add:
      - IPC_LOCK
    volumes:
      - ./config:/openbao/config
      - ./data:/openbao/data
    environment:
      - BAO_ADDR=http://127.0.0.1:8200
    command: server -config=/openbao/config/config.hcl
    networks:
      - traefik_network
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.openbao.rule=Host(`bao.example.com`)" # Change to your domain
      - "traefik.http.routers.openbao.entrypoints=websecure"
      - "traefik.http.routers.openbao.tls.certresolver=myresolver"
      - "traefik.http.services.openbao.loadbalancer.server.port=8200"

networks:
  traefik_network:
    external: true
```

---

### Step 3: Initialization (The "One-Time" Setup)
Once you run `docker-compose up -d`, OpenBao will start but it will be **Sealed** (encrypted and inaccessible). You must initialize it.

1.  **Initialize the Vault:**
    ```bash
    docker exec -it openbao bao operator init
    ```
    **CRITICAL:** This will spit out 5 "Unseal Keys" and 1 "Initial Root Token". Save these in a physical notebook or a different password manager immediately. If you lose these, your data is gone forever.

2.  **Unseal the Vault:**
    OpenBao requires 3 of the 5 keys to "unseal" every time the container restarts.
    ```bash
    docker exec -it openbao bao operator unseal <Key 1>
    docker exec -it openbao bao operator unseal <Key 2>
    docker exec -it openbao bao operator unseal <Key 3>
    ```

---

### Step 4: Access the UI
Now, navigate to `https://bao.example.com` in your browser. You should see the OpenBao login screen. Use your **Initial Root Token** to log in.

### 💡 Pro-Tips for 2026
* **Auto-Unseal:** In production, manually entering keys is annoying. Look into "Transit Auto-unseal" if you have a second OpenBao instance, or use a KMS (Key Management Service) if you are on a cloud provider.
* **Hardening:** Ensure your `data` volume is backed up regularly. Since it's encrypted, the backup is safe, but without those Unseal Keys, the backup is useless.
* **Binary Name:** Remember that the command is `bao`, not `vault`. If you are following old tutorials, just swap the names.

Does your Traefik setup already have a `certresolver` configured for Let's Encrypt, or do we need to add that to the compose file?

---

Works the same — you just hit **Traefik’s URL instead of localhost**. A few extra things matter though.

---

## 🔑 Basic curl via Traefik

Assume:

* Bao exposed at `https://bao.example.com`
* Traefik terminates TLS

### 1) Login

```bash
curl -s \
  --request POST \
  --data '{"password":"YOUR_PASSWORD"}' \
  https://bao.example.com/v1/auth/userpass/login/YOUR_USERNAME
```

---

### 2) Read secret

```bash
curl -s \
  -H "X-Vault-Token: YOUR_TOKEN" \
  https://bao.example.com/v1/secret/data/db/config
```

---

## ⚠️ Important gotchas (this is where people get stuck)

### 1) `api_addr` must match public URL

In OpenBao config:

```hcl
api_addr = "https://bao.example.com"
```

If wrong → redirects / auth issues

---

### 2) Traefik headers (critical)

Make sure Traefik forwards:

* `Host`
* `X-Forwarded-Proto`
* `X-Forwarded-For`

Otherwise Bao may think it’s HTTP and break redirects

---

### 3) TLS / self-signed certs

If using self-signed:

```bash
curl -k ...
```

or better:

```bash
curl --cacert ca.pem ...
```

---

### 4) Path prefixes (if using them)

If Traefik exposes:

```
https://example.com/bao/
```

Then your API becomes:

```
https://example.com/bao/v1/secret/data/...
```

👉 Bao itself **does NOT understand prefixes**, so avoid this unless you rewrite paths in Traefik.

---

### 5) CORS (only if browser)

For curl → ignore
For frontend apps → enable in Bao config

---

## 👍 Minimal working mental model

* Replace `http://127.0.0.1:8200` → your Traefik URL
* Ensure `api_addr` matches
* Ensure headers are forwarded

---

If you want, paste your:

* Traefik labels / config
* Bao config

I’ll spot misconfig quickly (this setup is easy to subtly break).


{% endraw %}
