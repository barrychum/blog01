---
title: "Git submodule"
date: 2024-06-26
tags: 
  - "Cheatsheet/Git"
---
### Adding `totp` as a submodule to `keyvault`:

1. **Navigate to `keyvault` repository:**
   ```bash
   cd path/to/keyvault
   ```

2. **Add `totp` as a submodule:**
   ```bash
   git submodule add https://github.com/username/totp.git totp
   ```

3. **Commit the submodule addition:**
   ```bash
   git commit -m "Added totp submodule"
   ```

4. **Push changes to remote repository (if needed):**
   ```bash
   git push origin main
   ```

### Updating files in `keyvault/totp`:

1. **Navigate to the submodule directory:**
   ```bash
   cd path/to/keyvault/totp
   ```

2. **Make changes as needed (add, edit, delete files).**

3. **Commit changes within the submodule:**
   ```bash
   git add .
   git commit -m "Updated files in totp submodule"
   ```

4. **Push changes to the submodule's remote repository:**
   ```bash
   git push origin main
   ```

5. **Navigate back to the main repository (`keyvault`) and commit the submodule reference update:**
   ```bash
   cd ..
   git add totp
   git commit -m "Updated totp submodule reference"
   ```

6. **Push changes to `keyvault` repository:**
   ```bash
   git push origin main
   ```

### Notes:
- **Cloning with submodules:** If you clone `keyvault` repository to a new location, use `git clone --recurse-submodules https://github.com/username/keyvault.git` to also clone `totp` submodule.
  
- **Updating `totp` submodule to latest commit:** Inside `keyvault` repository, navigate to `totp` submodule and use `git pull origin main` (assuming `main` branch) to update to the latest commit.

  
    

### To remove a submodule from a Git repository, such as `totp` from `keyvault`, you need to follow these steps:

1. **Delete the submodule entry:**
   - Open your terminal and navigate to the `keyvault` repository.
   - Remove the submodule entry from `.gitmodules` file:
     ```bash
     git submodule deinit -f path/to/submodule
     ```
     Replace `path/to/submodule` with the path to your submodule directory (`totp` in this case).

2. **Remove submodule from the index:**
   - Remove the submodule from the Git index:
     ```bash
     git rm --cached path/to/submodule
     ```
     Again, replace `path/to/submodule` with the actual path.

3. **Delete submodule files:**
   - Delete the submodule files (optional, depending on your use case):
     ```bash
     rm -rf path/to/submodule
     ```
     Ensure you don't need any of the submodule's files before doing this.

4. **Commit the changes:**
   - Commit the removal of the submodule:
     ```bash
     git commit -m "Removed submodule totp"
     ```

5. **Push changes to remote repository (if needed):**
   - Push the changes to your remote repository:
     ```bash
     git push origin main
     ```

These steps will remove the submodule `totp` from your `keyvault` repository. Be cautious when deleting submodule files (`step 3`) to avoid accidental data loss.



### To update a submodule (`totp`) in your `keyvault` repository to the latest commit of its original repository (`totp` repository), follow these steps:

1. **Navigate to the submodule directory (`keyvault/totp`):**
   ```bash
   cd path/to/keyvault/totp
   ```

2. **Fetch and merge changes from the submodule's remote repository (`totp` repository):**
   ```bash
   git pull origin main
   ```
   Replace `main` with the branch name of `totp` repository if it's different.

3. **Commit the updated submodule reference in `keyvault`:**
   ```bash
   cd ..
   git add totp
   git commit -m "Updated submodule totp to latest commit"
   ```

4. **Push changes to `keyvault` repository:**
   ```bash
   git push origin main
   ```

### Notes:
- The `git pull origin main` command inside `keyvault/totp` updates the submodule to the latest commit of `totp` repository's `main` branch (adjust branch name as needed).
- After updating the submodule in `keyvault`, you commit and push the updated submodule reference (`keyvault/totp`) to reflect the latest changes from `totp`.

This process ensures that `keyvault` is using the most recent version of `totp` submodule, aligned with the changes made in its original repository (`totp`).
