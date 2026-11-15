---
title: "Github webhook / scout"
date: 2024-07-05
tags: 
  - "Cheatsheet/Github"
---
## Docker scout action example

Here's a very simple example of using docker/scout-action in a GitHub Actions workflow:

```yaml
name: Scout Scan

on:
  push:
    branches: [ "main" ]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run Docker Scout
        uses: docker/scout-action@v1
        with:
          dockerhub-user: ${{ secrets.DOCKERHUB_USERNAME }}
          dockerhub-password: ${{ secrets.DOCKERHUB_PASSWORD }}
          command: cves
          image: your-docker-image:tag
```

This workflow does the following:

1. Triggers on pushes to the main branch
2. Checks out the code
3. Runs Docker Scout to scan for CVEs (Common Vulnerabilities and Exposures) in the specified Docker image

You'll need to replace `your-docker-image:tag` with the actual image you want to scan, and set up the DockerHub credentials as secrets in your GitHub repository.


## Upload Scout summary to various targets

You can upload the Docker Scout summary to various targets on the Internet. Docker Scout supports several output formats and upload targets. Here's an overview:

Supported formats:
1. SARIF (Static Analysis Results Interchange Format)
2. JSON
3. HTML

Supported upload targets:
1. GitHub Security tab
2. GitLab Security Dashboard
3. Azure DevOps Pipelines
4. Dependency Track
5. Generic webhook

To upload the summary, you can use the `output` and `destination` parameters in the docker/scout-action. Here's an example:

```yaml
- name: Run Docker Scout and upload results
  uses: docker/scout-action@v1
  with:
    dockerhub-user: ${{ secrets.DOCKERHUB_USERNAME }}
    dockerhub-password: ${{ secrets.DOCKERHUB_PASSWORD }}
    command: cves
    image: your-docker-image:tag
    output: sarif
    destination: github-security-tab
```

For other destinations, you might need to adjust the workflow. For example, to upload to a generic webhook:

```yaml
- name: Run Docker Scout
  uses: docker/scout-action@v1
  with:
    dockerhub-user: ${{ secrets.DOCKERHUB_USERNAME }}
    dockerhub-password: ${{ secrets.DOCKERHUB_PASSWORD }}
    command: cves
    image: your-docker-image:tag
    output: json

- name: Upload to webhook
  run: |
    curl -X POST -H "Content-Type: application/json" \
    -d @scout-report.json \
    https://your-webhook-url.com
```

Remember to replace `https://your-webhook-url.com` with the actual webhook URL you want to use.


## Use Flask as a webhook

It is possible to set up a Flask application as a webhook to accept the Docker Scout summary. Here's a basic example of how you could do this:

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def webhook():
    if request.method == 'POST':
        data = request.json
        # Process the Scout summary data here
        print("Received Scout summary:", data)
        
        # You could save the data to a file
        with open('scout_summary.json', 'w') as f:
            json.dump(data, f)
        
        # Or store it in a database, send notifications, etc.
        
        return jsonify({"status": "success", "message": "Data received"}), 200
    else:
        return jsonify({"status": "error", "message": "Invalid request method"}), 405

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

This Flask application does the following:

1. Creates a route `/webhook` that accepts POST requests.
2. When it receives a POST request, it extracts the JSON data from the request.
3. It then processes the data (in this example, just printing it and saving to a file).
4. Finally, it returns a JSON response indicating success.

To use this with Docker Scout, you would need to:

1. Deploy this Flask application somewhere it's accessible from the internet (e.g., a cloud provider like Heroku, AWS, or Google Cloud).
2. Ensure your server is configured to handle HTTPS requests for security.
3. Use the URL of your deployed Flask app as the webhook URL in your Docker Scout configuration.

In your GitHub Actions workflow, you could modify the example from the previous message like this:

```yaml
- name: Run Docker Scout
  uses: docker/scout-action@v1
  with:
    dockerhub-user: ${{ secrets.DOCKERHUB_USERNAME }}
    dockerhub-password: ${{ secrets.DOCKERHUB_PASSWORD }}
    command: cves
    image: your-docker-image:tag
    output: json

- name: Upload to Flask webhook
  run: |
    curl -X POST -H "Content-Type: application/json" \
    -d @scout-report.json \
    https://your-flask-app-url.com/webhook
```

Replace `https://your-flask-app-url.com/webhook` with the actual URL of your deployed Flask application.

Remember to handle authentication and implement proper security measures in your Flask app when deploying it for production use.




