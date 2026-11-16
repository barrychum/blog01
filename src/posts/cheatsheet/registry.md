---
title: "Docker registry deployment"
date: 2024-08-04
tags: 
  - "Cheatsheet/docker"
---
Deploying a Docker Registry with basic authentication using a token is a common setup. Here's a brief overview of how you can do this:

1. First, you'll need to set up a password file for basic authentication. You can use the `htpasswd` utility to create this file:

```
htpasswd -Bc registry.password username
```

Replace "username" with your desired username. You'll be prompted to enter a password.

2. Next, you'll need to create a configuration file for the registry. Let's call it `config.yml`:

```yaml
version: 0.1
auth:
  htpasswd:
    realm: basic-realm
    path: /auth/registry.password
```

3. Now you can run the registry container with basic auth enabled:

```
docker run -d \
  -p 5000:5000 \
  --name registry \
  -v $(pwd)/config.yml:/etc/docker/registry/config.yml \
  -v $(pwd)/registry.password:/auth/registry.password \
  registry:2
```

This command:
- Maps port 5000 on the host to port 5000 in the container
- Names the container "registry"
- Mounts the config file and password file into the container

4. To use the registry, you'll need to log in first:

```
docker login localhost:5000
```

You'll be prompted for the username and password you set up earlier.

5. After logging in, Docker will store a token in your local config, which it will use for subsequent interactions with the registry.

