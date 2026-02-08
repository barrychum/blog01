---
title: "Traefik cheatsheet"
date: 2024-07-27
tags: 
  - "Cheatsheet/traefik"
---
are you familiar with docker, traefik reverse proxy?  can you give me step by step instruction to setup a demo to run a nginx container, and start a traefik reverse proxy for the nginx?  I do not want to create a separate network and I don't want to use docker compose.  I want to run using docker run commands

Yes, I'm familiar with Docker and Traefik reverse proxy. I can provide you with step-by-step instructions to set up a demo using Docker run commands for an Nginx container and a Traefik reverse proxy. Here's how you can do it without creating a separate network or using Docker Compose:

1. First, let's start the Traefik container:

```bash
docker run -d \
  --name traefik \
  --publish 80:80 \
  --publish 8080:8080 \
  --volume /var/run/docker.sock:/var/run/docker.sock \
  traefik:v2.9 \
  --api.insecure=true \
  --providers.docker \
  --entrypoints.web.address=:80
```

2. Now, let's start the Nginx container:

```bash
docker run -d \
  --name nginx \
  --label "traefik.enable=true" \
  --label "traefik.http.routers.nginx.rule=Host(\`nginx.localhost\`)" \
  --label "traefik.http.services.nginx.loadbalancer.server.port=80" \
  nginx:latest
```

These commands will:

1. Start Traefik:
   - Publish ports 80 (for HTTP traffic) and 8080 (for the Traefik dashboard)
   - Mount the Docker socket to allow Traefik to interact with Docker
   - Enable the API (insecurely, for demo purposes)
   - Use Docker as a provider for configuration
   - Set up an entrypoint named "web" on port 80

2. Start Nginx:
   - Enable Traefik routing for this container
   - Set up a rule to route traffic with the host "nginx.localhost" to this container
   - Inform Traefik that the container listens on port 80

After running these commands, you should be able to access:

- The Nginx container at http://nginx.localhost
- The Traefik dashboard at http://localhost:8080

Note: For the nginx.localhost to work, you may need to add an entry to your hosts file (/etc/hosts on Linux/Mac, C:\Windows\System32\drivers\etc\hosts on Windows):

```
127.0.0.1 nginx.localhost
```

This setup uses the default bridge network in Docker, so there's no need to create a separate network. Remember that this configuration is for demonstration purposes and isn't suitable for production use without further security measures.

