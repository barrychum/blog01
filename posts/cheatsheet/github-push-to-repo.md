---
title: "Github action push to repo"
date: 2024-07-05
tags: 
  - "Cheatsheet/Github"
---
You can certainly push the Scout summary to a Hugo static site hosted on GitHub Pages and trigger a rebuild. Here's how you could set this up:

1. Push Scout summary to Hugo repo:
   You can use Git commands in your GitHub Actions workflow to push the Scout summary to your Hugo repository.

2. Trigger Hugo rebuild:
   GitHub Pages automatically rebuilds when new commits are pushed to the repository, so pushing the Scout summary will trigger a rebuild.

Here's an example workflow that accomplishes this:

```yaml
name: Scout Scan and Update Hugo Site

on:
  push:
    branches: [ "main" ]

jobs:
  scan-and-update:
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
          output: json

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: 'latest'

      - name: Checkout Hugo site repository
        uses: actions/checkout@v3
        with:
          repository: your-username/your-hugo-repo
          path: hugo-site
          token: ${{ secrets.PAT_TOKEN }}

      - name: Update Scout summary in Hugo site
        run: |
          mkdir -p hugo-site/content/scout-summary
          cp scout-report.json hugo-site/content/scout-summary/
          cd hugo-site
          hugo new content/scout-summary/latest-scan.md
          echo '---' >> content/scout-summary/latest-scan.md
          echo 'title: "Latest Scout Scan"' >> content/scout-summary/latest-scan.md
          echo 'date: '$(date -Iseconds) >> content/scout-summary/latest-scan.md
          echo '---' >> content/scout-summary/latest-scan.md
          echo '{{< rawhtml >}}' >> content/scout-summary/latest-scan.md
          echo '<pre>' >> content/scout-summary/latest-scan.md
          cat scout-report.json >> content/scout-summary/latest-scan.md
          echo '</pre>' >> content/scout-summary/latest-scan.md
          echo '{{< /rawhtml >}}' >> content/scout-summary/latest-scan.md

      - name: Commit and push changes
        run: |
          cd hugo-site
          git config user.name github-actions
          git config user.email github-actions@github.com
          git add .
          git commit -m "Update Scout summary"
          git push

```

This workflow does the following:

1. Runs Docker Scout and generates a JSON report.
2. Sets up Hugo.
3. Checks out your Hugo site repository.
4. Creates a new Markdown file in the Hugo site with the Scout summary embedded as raw HTML.
5. Commits and pushes the changes to your Hugo site repository.

You'll need to replace:
- `your-username/your-hugo-repo` with the actual repository for your Hugo site.
- `PAT_TOKEN` with a Personal Access Token that has permission to push to your Hugo repository.

Also, ensure your Hugo site is set up to render raw HTML (you might need to add `unsafe = true` under `[markup.goldmark.renderer]` in your Hugo configuration).

This approach will trigger a rebuild of your GitHub Pages site automatically. The Scout summary will be available as a new page on your Hugo site.



