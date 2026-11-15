---
title: "Git commands"
date: 2024-06-22
tags: 
  - "Cheatsheet/git"
---
To create a fork of an original repository and push it to your own repository (my-repo), follow these steps:

1. **Fork the Original Repository:**
   - Go to the original repository on GitHub.
   - Click the "Fork" button at the top right of the page.

2. **Clone Your Forked Repository:**
   ```sh
   git clone https://github.com/your-username/original-repo
   cd original-repo
   ```

3. **Create a New Repository on GitHub:**
   - Go to your GitHub account.
   - Click on the "New" button to create a new repository.
   - Name it `my-repo` and complete the setup.

4. **Set the New Repository as a Remote:**
   ```sh
   git remote rename origin old-origin
   git remote add origin https://github.com/your-username/my-repo.git
   ```

5. **Push to Your New Repository:**
   ```sh
   git push -u origin master
   ```

Replace `your-username` with your GitHub username and adjust branch names if necessary.

In step 4, `old-origin` is a placeholder name used to rename the current remote reference (`origin`) for the forked repository. This step is optional but helps avoid confusion by renaming the original remote before adding your new repository as a remote named `origin`.

Here’s a more detailed explanation:

- **`git remote rename origin old-origin`**: This renames the existing remote (which points to the forked repository) to `old-origin`. This way, you can add a new remote with the name `origin` that points to your new repository.

If you don't need to keep a reference to the original forked repository, you can skip the renaming step and directly set the new repository as `origin`:

```sh
git remote set-url origin https://github.com/your-username/my-repo.git
```

This command directly changes the URL of the existing `origin` remote to point to your new repository.