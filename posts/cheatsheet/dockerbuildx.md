---
title: "Docker buildx"
date: 2024-06-11
tags: 
  - "Cheatsheet/Docker"
---
To build multi-architecture Docker images for both ARM and AMD64 architectures, you can use Docker's Buildx feature. Buildx allows you to build images for multiple platforms with a single command.

Here are the steps to build Docker images for ARM and AMD64 architectures:

### Step-by-Step Guide

1. **Install Docker Buildx**:
   Docker Buildx is included in Docker versions 19.03 and later. You can check your Docker version and install or update Docker if necessary.

   ```bash
   docker --version
   ```

2. **Create and Use a Buildx Builder**:
   Create a new builder instance and switch to it.

   ```bash
   docker buildx create --use
   ```

3. **Inspect the Builder**:
   Ensure that your builder supports the required platforms.

   ```bash
   docker buildx inspect --bootstrap
   ```

   You should see support for multiple platforms like `linux/amd64` and `linux/arm64`.

4. **Build the Multi-Architecture Image**:
   Use the `docker buildx build` command with the `--platform` flag to specify the target architectures. Use the `--push` flag to push the built image to a Docker registry, or use the `--load` flag to load it into your local Docker daemon (only works for single architecture builds).

   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 -t <your-username>/<image-name>:<tag> --push .
   ```

   Replace `<your-username>`, `<image-name>`, and `<tag>` with your Docker Hub username, desired image name, and tag.

### Example

Here’s an example of building a simple multi-architecture Docker image for both ARM64 and AMD64 architectures:

1. **Dockerfile**:
   Create a Dockerfile for your application. For this example, we'll use a simple Dockerfile:

   ```Dockerfile
   # syntax=docker/dockerfile:1
   FROM alpine:3.14
   COPY . /app
   WORKDIR /app
   RUN apk add --no-cache python3 py3-pip
   CMD ["python3", "app.py"]
   ```

2. **Build and Push**:
   Navigate to the directory containing your Dockerfile and run the following command:

   ```bash
   docker buildx build --platform linux/amd64,linux/arm64 -t <your-username>/<image-name>:<tag> --push .
   ```

### Notes

- Ensure you are logged in to Docker Hub (or your preferred Docker registry) before running the build command:

  ```bash
  docker login
  ```

- If you encounter any issues, make sure that QEMU is installed on your system for emulating the ARM architecture on x86 systems. Docker Buildx should handle this automatically with the `--bootstrap` flag, but you can install it manually if needed:

  ```bash
  docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
  ```

By following these steps, you can build and push multi-architecture Docker images suitable for both ARM and AMD64 platforms.