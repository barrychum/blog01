---
title: "Docker multi arch"
date: 2024-06-11
tags: 
  - "Cheatsheet/docker"
---
To push both `amd64` and `arm64` images to Docker Hub and tag them under the same image tag, you can use Docker's buildx tool to create a multi-architecture manifest. Here's a step-by-step guide:

1. **Install and setup buildx** (if you haven't already):

   ```bash
   docker buildx create --use
   docker buildx inspect --bootstrap
   ```

2. **Log in to Docker Hub**:

   ```bash
   docker login
   ```

3. **Load your existing images into buildx**:

   If you already have the images built locally, you can load them into the buildx builder. Suppose your images are `amd64_image.tar` and `arm64_image.tar`, and you want to push them under `yourusername/yourimage:tag`.

   ```bash
   docker load --input amd64_image.tar
   docker load --input arm64_image.tar
   ```

4. **Tag your images**:

   Tag your images properly before pushing them.

   ```bash
   docker tag <amd64_image_id> yourusername/yourimage:tag-amd64
   docker tag <arm64_image_id> yourusername/yourimage:tag-arm64
   ```

5. **Push the individual architecture images**:

   Push each architecture-specific image to Docker Hub.

   ```bash
   docker push yourusername/yourimage:tag-amd64
   docker push yourusername/yourimage:tag-arm64
   ```

6. **Create and push a multi-architecture manifest**:

   Create a manifest list that includes both architectures and push it to Docker Hub under the same tag.

   ```bash
   docker buildx imagetools create \
       --tag yourusername/yourimage:tag \
       yourusername/yourimage:tag-amd64 \
       yourusername/yourimage:tag-arm64
   ```

   This command creates a manifest list that includes the images for both `amd64` and `arm64` architectures and tags it as `yourusername/yourimage:tag`.

Now, when you pull `yourusername/yourimage:tag`, Docker will automatically select the appropriate image for your architecture.