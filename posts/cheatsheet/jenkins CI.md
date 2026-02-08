---
title: "Jenkins Cheatsheet"
date: 2024-06-08
tags: 
  - "Cheatsheet/Jenkins"
---
Sure! Jenkins is a popular open-source automation server that can be used to set up CI/CD pipelines. Here’s a quick guide on how to use Jenkins to monitor your GitHub repository for changes to a Dockerfile, build the Docker image, and push it to Docker Hub.

### Prerequisites

1. **Jenkins Installed**: Ensure Jenkins is installed and running. You can download it from [here](https://www.jenkins.io/download/).
2. **Docker Installed**: Ensure Docker is installed on the Jenkins server.
3. **Jenkins Plugins**: Install the following Jenkins plugins:
   - Git Plugin
   - Docker Pipeline Plugin
   - GitHub Integration Plugin

### Step-by-Step Guide

#### 1. Set Up Jenkins Credentials

1. **Docker Hub Credentials**:
   - In Jenkins, go to **Manage Jenkins** > **Manage Credentials**.
   - Add a new set of credentials:
     - **Kind**: Username with password
     - **Username**: Your Docker Hub username
     - **Password**: Your Docker Hub password
     - **ID**: `docker-hub-credentials`

2. **GitHub Personal Access Token** (if needed for private repositories):
   - Create a GitHub Personal Access Token with appropriate permissions.
   - Add it to Jenkins under **Manage Credentials**:
     - **Kind**: Secret text
     - **Secret**: Your GitHub Personal Access Token
     - **ID**: `github-token`

#### 2. Create a Jenkins Pipeline Job

1. **Create a New Item**:
   - Go to the Jenkins dashboard and click on **New Item**.
   - Enter a name for your job, select **Pipeline**, and click **OK**.

2. **Configure the Pipeline**:
   - In the job configuration, scroll down to the **Pipeline** section.
   - Select **Pipeline script** from the **Definition** dropdown.

3. **Add Pipeline Script**:
   - Enter the following script in the Pipeline section:

```groovy
pipeline {
    agent any

    environment {
        DOCKER_CREDENTIALS_ID = 'docker-hub-credentials'
        DOCKER_IMAGE = 'username/repository:tag'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/username/repository.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}", ".")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_IMAGE}").push()
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
```

   - Replace `username/repository:tag` with your Docker Hub repository and tag.
   - Replace `https://github.com/username/repository.git` with your GitHub repository URL.

#### 3. Configure GitHub Webhook

1. **Set Up GitHub Webhook**:
   - Go to your GitHub repository settings.
   - Navigate to **Webhooks** > **Add webhook**.
   - Enter your Jenkins server URL followed by `/github-webhook/` (e.g., `http://your-jenkins-url/github-webhook/`) in the **Payload URL** field.
   - Set **Content type** to `application/json`.
   - Select the events you want to trigger the webhook, typically `Just the push event`.

2. **Save Webhook**:
   - Click **Add webhook**.

#### 4. Build the Job

- Go back to Jenkins and trigger the job manually for the first time to ensure it works correctly.
- After the initial manual run, the job should automatically trigger whenever changes are pushed to the repository.

### Conclusion

This guide sets up a Jenkins pipeline to monitor your GitHub repository for changes to the Dockerfile, build a Docker image, and push it to Docker Hub. Jenkins will handle the automation, allowing you to focus on developing and maintaining your Dockerfiles and applications.