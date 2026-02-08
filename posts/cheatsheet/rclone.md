---
title: "rclone cheatsheet"
date: 2024-07-25
tags: 
  - "Cheatsheet/rclone"
---
# rclone cheatsheet

https://rclone.org/filtering/#regexp
```
rclone copy ~/Documents secret1:Documents \
-P --copy-links \
--exclude '**/__pycache__/**' \
--exclude '.*{/**,}' \
--exclude '**/venv/**' \
--exclude '**/cv/**' \
--exclude '**/node_modules/**'


rclone ls ~/Documents -L --include='.*' --dump filters 2>&1 | sed -n '/--- start filters ---/,/--- end filters ---/p'

rclone copy -P --copy-links --exclude '.*{.*{/**,}' ~/Desktop secret1:Desktop 
'.*{/**,}' 

/^\./

{{ }}

rclone cleanup secret1:
```

# Examine filter regex

<span style="font-size:0.8em;">

```
rclone ls ~/Documents -L --include='.*' -vv --dump filters 2>&1 | \
    sed -n '/--- start filters ---/,/--- end filters ---/p'
```
</span>




rclone keeps track of the free space and manages the file copying process through several mechanisms and configuration settings. Here's an overview of how rclone handles this:

### Checking Free Space

1. **Initial Query**: When you configure a union remote and perform operations, rclone queries each remote to determine its current state, including available free space. This is typically done using the `rclone about` command internally, which provides information about the remote's storage.

2. **On-Demand Check**: During file operations, rclone checks the free space of the relevant remotes to ensure there is enough space for the operation. For example, when copying a file, rclone will check each remote to see if it has sufficient space before attempting the copy.

### Policies and Configuration

The behavior of rclone in managing free space and choosing where to place files can be configured using different policies. Here are some key policies relevant to the union backend:

1. **action_policy**: Determines how to handle actions such as file deletion and move.
2. **create_policy**: Specifies which remote to use when creating a new file.
3. **search_policy**: Used to find files when performing read operations.

### Policy Options

- **epmfs**: Existing Path, Most Free Space. It uses the remote with the most free space that already has the directory.
- **mostfree**: Chooses the remote with the most free space available.
- **ff**: First Found. Uses the first remote in the list that can accommodate the file.
- **all**: Uses all remotes for read and write operations.

### Example Configuration

Here is an example `rclone.conf` configuration using the `mostfree` policy:

```ini
[unionremote]
type = union
remotes = remote1: remote2: remote3: remote4: remote5: remote6: remote7: remote8: remote9:
action_policy = mostfree
create_policy = mostfree
search_policy = mostfree
```

### How It Works in Practice

- **Copy Operation**: When you attempt to copy a 300MB file to `unionremote:`, rclone will:
  - Check the free space on each remote using `rclone about` or equivalent internal queries.
  - Determine that `remote1` and `remote2` do not have enough space.
  - Identify that `remote3` has sufficient space.
  - Proceed to copy the file to `remote3`.

- **Real-Time Updates**: Rclone dynamically checks the free space as operations are performed. This means it can adapt to changes in storage availability in real-time, ensuring efficient space utilization across the remotes.

### Commands to Check Free Space Manually

You can manually check the free space on a remote using the `rclone about` command:

```sh
rclone about remote1:
rclone about remote2:
rclone about remote3:
```

This provides information on the available and used space for each remote.

### Summary

- Rclone dynamically checks free space during operations.
- Policies like `mostfree` help manage where files are stored.
- You can configure these policies in the `rclone.conf` file for the union remote.
- Real-time checks ensure optimal utilization of available space across all remotes.

This setup ensures that rclone can manage multiple remotes efficiently, placing files where there is sufficient space and adjusting dynamically as needed.


#######


Making your own client_id

When you use rclone with Google drive in its default configuration you are using rclone's client_id. This is shared between all the rclone users. There is a global rate limit on the number of queries per second that each client_id can do set by Google. rclone already has a high quota and I will continue to make sure it is high enough by contacting Google.

It is strongly recommended to use your own client ID as the default rclone ID is heavily used. If you have multiple services running, it is recommended to use an API key for each service. The default Google quota is 10 transactions per second so it is recommended to stay under that number as if you use more than that, it will cause rclone to rate limit and make things slower.

Here is how to create your own Google Drive client ID for rclone:

    Log into the Google API Console with your Google account. It doesn't matter what Google account you use. (It need not be the same account as the Google Drive you want to access)

    Select a project or create a new project.

    Under "ENABLE APIS AND SERVICES" search for "Drive", and enable the "Google Drive API".

    Click "Credentials" in the left-side panel (not "Create credentials", which opens the wizard).

    If you already configured an "Oauth Consent Screen", then skip to the next step; if not, click on "CONFIGURE CONSENT SCREEN" button (near the top right corner of the right panel), then select "External" and click on "CREATE"; on the next screen, enter an "Application name" ("rclone" is OK); enter "User Support Email" (your own email is OK); enter "Developer Contact Email" (your own email is OK); then click on "Save" (all other data is optional). You will also have to add some scopes, including

    https://www.googleapis.com/auth/docs
    https://www.googleapis.com/auth/drive in order to be able to edit, create and delete files with RClone.
    https://www.googleapis.com/auth/drive.metadata.readonly which you may also want to add.
    If you want to add all at once, comma separated it would be https://www.googleapis.com/auth/docs,https://www.googleapis.com/auth/drive,https://www.googleapis.com/auth/drive.metadata.readonly.

    After adding scopes, click "Save and continue" to add test users. Be sure to add your own account to the test users. Once you've added yourself as a test user and saved the changes, click again on "Credentials" on the left panel to go back to the "Credentials" screen.

    (PS: if you are a GSuite user, you could also select "Internal" instead of "External" above, but this will restrict API use to Google Workspace users in your organisation).

    Click on the "+ CREATE CREDENTIALS" button at the top of the screen, then select "OAuth client ID".

    Choose an application type of "Desktop app" and click "Create". (the default name is fine)

    It will show you a client ID and client secret. Make a note of these.

    (If you selected "External" at Step 5 continue to Step 9. If you chose "Internal" you don't need to publish and can skip straight to Step 10 but your destination drive must be part of the same Google Workspace.)

    Go to "Oauth consent screen" and then click "PUBLISH APP" button and confirm. You will also want to add yourself as a test user.

    Provide the noted client ID and client secret to rclone.

Be aware that, due to the "enhanced security" recently introduced by Google, you are theoretically expected to "submit your app for verification" and then wait a few weeks(!) for their response; in practice, you can go right ahead and use the client ID and client secret with rclone, the only issue will be a very scary confirmation screen shown when you connect via your browser for rclone to be able to get its token-id (but as this only happens during the remote configuration, it's not such a big deal). Keeping the application in "Testing" will work as well, but the limitation is that any grants will expire after a week, which can be annoying to refresh constantly. If, for whatever reason, a short grant time is not a problem, then keeping the application in testing mode would also be sufficient.

