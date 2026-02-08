---
title: "Jenkins docker step-by-step"
date: 2024-06-08
tags: 
  - "Cheatsheet/Jenkins"
---
Yes, it is possible to host a Jenkins service locally using Docker. Here’s a step-by-step guide to set up Jenkins using Docker:

### Step-by-Step Guide

#### 1. Install Docker

If you haven’t already installed Docker, follow the instructions on the [Docker website](https://docs.docker.com/get-docker/) to download and install Docker for your operating system.

#### 2. Pull the Jenkins Docker Image

Open a terminal and pull the official Jenkins Docker image:

```sh
docker pull jenkins/jenkins:lts
```

#### 3. Create a Docker Network (Optional but recommended)

Creating a Docker network allows you to connect multiple containers together. This step is optional but recommended if you plan to use other services like Docker agents.

```sh
docker network create jenkins
```

#### 4. Run the Jenkins Container

Run the Jenkins container with the following command:

```sh
docker run -d --name jenkins \
  --network jenkins \
  -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  jenkins/jenkins:lts
```

Here’s what each option means:
- `-d`: Run the container in detached mode.
- `--name jenkins`: Name the container "jenkins".
- `--network jenkins`: Connect the container to the "jenkins" network.
- `-p 8080:8080`: Map port 8080 of the host to port 8080 of the container (Jenkins UI).
- `-p 50000:50000`: Map port 50000 of the host to port 50000 of the container (Jenkins agents).
- `-v jenkins_home:/var/jenkins_home`: Persist Jenkins data in a Docker volume named `jenkins_home`.

#### 5. Access Jenkins

After running the container, Jenkins will start up. To access the Jenkins UI:
1. Open a web browser and go to `http://localhost:8080`.
2. You will be prompted to unlock Jenkins using an initial admin password.

#### 6. Retrieve the Initial Admin Password

To get the initial admin password, run the following command in your terminal:

```sh
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

Copy the password and paste it into the Jenkins setup page to continue with the setup.

#### 7. Complete the Jenkins Setup

1. Follow the on-screen instructions to complete the setup.
2. Install the recommended plugins or select specific plugins as needed.
3. Create your first admin user account.

### Additional Tips

- **Persistent Storage**: The `-v jenkins_home:/var/jenkins_home` option ensures that Jenkins data is stored persistently across container restarts.
- **Docker Compose**: You can also use Docker Compose to manage your Jenkins setup. Create a `docker-compose.yml` file with the following content:

```yaml
version: '3'
services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
    networks:
      - jenkins

networks:
  jenkins:

volumes:
  jenkins_home:
```

Run the following command to start Jenkins with Docker Compose:

```sh
docker-compose up -d
```

- **Jenkins Plugins**: After setting up Jenkins, you might want to install additional plugins required for your CI/CD pipelines.

By following these steps, you can host a Jenkins service locally using Docker. This setup allows you to benefit from the flexibility and isolation provided by Docker containers while leveraging Jenkins for your CI/CD needs.