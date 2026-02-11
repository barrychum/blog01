---
title: "Restic commands"
date: 2026-02-11
tags: 
  - "Cheatsheet/restic"
---
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic init

docker run --rm -v /mnt/omv/backup/dockerhost:/repo -e RESTIC_REPOSITORY=/repo -e RESTIC_PASSWORD=mypass -v /mnt/disk2/docker/authelia:/data:ro restic/restic backup /data


Since you’ve successfully initialized your repository, you’re ready to manage your backups like a pro. Because you are using Docker, remember that almost every command will need the `-v /your/path:/repo` and `-e RESTIC_PASSWORD` flags.

Here are the commands you’ll use 90% of the time:

To make these commands work with your specific setup, you need to include the volume flags every time. Using the `/mnt/omv/backup/dockerhost` as your repository and `/mnt/disk2/docker/` as your source, here are the commands you will use most often.

### 1. View All Backups (Snapshots)

Use this to see your history, the IDs of your backups, and which tags you’ve used.

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic snapshots

```

---

### 2. Backing Up with Tags

Adding a `--tag` is essential when you have multiple containers (Immich, Authelia, 11ty) going into the same repository. It makes restoring much easier.

**For Authelia:**

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -v /mnt/disk2/docker/authelia:/data:ro \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic backup /data --tag authelia

```

**For Immich (Photos/Library):**

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -v /mnt/disk2/immich/library:/data:ro \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic backup /data --tag immich-photos

```

---

### 3. Checking Storage Stats

If you want to know how much physical space your backups are taking up after deduplication:

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic stats

```

---

### 4. Restoring a Specific Backup

To restore, you need the **Snapshot ID** (a 8-character code like `90f06811`) from the `snapshots` command.

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -v /mnt/omv/restore/dockerhost:/restore \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic restore [SNAPSHOT_ID] --target /restore

```

---

### 5. Cleaning Up (Retention Policy)

This command "forgets" old backups based on your rules and then "prunes" (deletes) the actual data chunks from your OMV drive to free up space.

**Keep the last 7 daily and 4 weekly backups:**

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic forget --keep-daily 7 --keep-weekly 4 --prune

```

---

### 6. Comparing Two Backups

If you want to see exactly which files changed between two points in time:

```bash
docker run --rm \
  -v /mnt/omv/backup/dockerhost:/repo \
  -e RESTIC_REPOSITORY=/repo \
  -e RESTIC_PASSWORD=mypass \
  restic/restic diff [OLD_ID] [NEW_ID]

```

---

### Pro-Tip: Avoid Typing This Every Time

Since these commands are very long, you should create an **alias** in your `.bashrc` or `.zshrc` file:

```bash
alias myrestic='docker run --rm -v /mnt/omv/backup/dockerhost:/repo -e RESTIC_REPOSITORY=/repo -e RESTIC_PASSWORD=mypass restic/restic'

```

After saving that, you could simply run:
`myrestic snapshots` or `myrestic backup /mnt/disk2/docker/authelia:/data:ro`

**Would you like me to create a "Master Backup Script" that loops through all your folders and runs these commands automatically?**