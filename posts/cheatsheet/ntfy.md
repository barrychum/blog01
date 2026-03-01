---
title: "ntfy commands"
date: 2026-02-21
tags: 
  - "Cheatsheet/ntfy"
---
{% raw %}
To get the absolute best battery life on iOS while self-hosting, you need to configure your server to use `ntfy.sh` as an **upstream** relay.

Below is the `docker-compose.yml` file and the corresponding `server.yml` configuration. I have set this up to use **environment variables** for the most critical settings, which is often cleaner than managing multiple files.

### 1. The `docker-compose.yml` File

This setup creates a persistent volume so your message history and configuration aren't lost when the container restarts.

```yaml
version: "3"

services:
  ntfy:
    image: binwiederhier/ntfy:latest
    container_name: ntfy
    command:
      - serve
    environment:
      - TZ=UTC # Change to your timezone (e.g., Europe/London)
      - NTFY_BASE_URL=https://ntfy.yourdomain.com # REPLACE with your actual domain
      - NTFY_UPSTREAM_BASE_URL=https://ntfy.sh     # ESSENTIAL for iOS battery
      - NTFY_BEHIND_PROXY=true                    # Set to true if using Nginx/Caddy
      - NTFY_CACHE_FILE=/var/cache/ntfy/cache.db
      - NTFY_ATTACHMENT_CACHE_DIR=/var/cache/ntfy/attachments
    volumes:
      - ./cache:/var/cache/ntfy
      - ./config:/etc/ntfy
    ports:
      - 8080:80
    restart: unless-stopped

```

---

### 2. The Configuration Workflow

Even though we used environment variables above, `ntfy` works best when you have a `server.yml` file for advanced settings like access control.

1. **Create the directories:**
```bash
mkdir -p ntfy/config ntfy/cache

```


2. **Create the `server.yml` file** inside the `ntfy/config` folder:
```yaml
# ntfy server config
base-url: "https://ntfy.yourdomain.com"
upstream-base-url: "https://ntfy.sh"

# Enables the web UI
enable-signup: false
enable-login: true

# Security: Default to no access for anyone not logged in
auth-default-access: "deny-all"
auth-file: "/var/lib/ntfy/user.db"

```



### 3. Why this is the "Battery Saver" setup

In this configuration, your server follows this "low-power" path:

* **Your Server** receives a message from your script.
* **Your Server** sends a "Poll Request" (a tiny ID) to `https://ntfy.sh`.
* **ntfy.sh** sends a push notification through Apple's official servers.
* **Your iPhone** wakes up, receives the push, and then "phones home" to **your domain** (`ntfy.yourdomain.com`) to fetch the actual text.

### 4. Final Steps

Once your container is running (`docker-compose up -d`), you must tell the iOS app to use your server:

1. Open the **ntfy** app on your iPhone.
2. Go to **Settings** > **General**.
3. Set **Default Server** to `https://ntfy.yourdomain.com`.
4. Ensure **Instant Delivery** is **OFF** (this ensures it uses the battery-friendly push method instead of keeping a connection open).

---

The output confirms the issue: your user `my_script_bot` exists, but it has **"no topic-specific permissions."** Because your server is set to `deny-all`, the user is being blocked.

To give `my_script_bot` permission to send messages to `test_123`, run the following command:

### The Command

```bash
docker exec -it ntfy ntfy access my_script_bot test_123 write-only

```

### Explanation of the Options:

* **`write-only`**: This is the most secure option for a script. It allows the bot to **send** messages but prevents it from **reading** the message history.
* **`read-write`**: Use this if the bot needs to both send and receive/view messages.
* **`read-only`**: Use this if the bot is only meant to monitor the topic.

---

### How to Verify it Worked

After running the command, check the access list again:

```bash
docker exec -it ntfy ntfy access

```

**You should now see:**

```text
user my_script_bot (role: user, tier: none)
- topic test_123 (write-only)

```

### Testing with your Token

Now, try your HTTP POST again. Since the permission is now linked to the user, and the token belongs to that user, it will work:

```bash
curl -H "Authorization: Bearer tk_..." -d "Permission fixed!" https://ntfy.britbuzz.uk/test_123

```


---

**Action Buttons** and **UnifiedPush** are the two features that turn ntfy from a simple "message receiver" into a powerful interactive platform.

---

## 1. Action Buttons

Action buttons allow you to react to a notification directly from your lock screen without opening an app. You can have up to **3 buttons** per notification.

### Types of Actions

* **`view`**: Opens a URL (e.g., a dashboard or a camera feed).
* **`http`**: Sends a background request (e.g., "Mute Alarm" or "Restart Service").
* **`broadcast`**: (Android only) Sends an intent to another app.

### Example: HTTP Action Button

Imagine you want a notification when your server's backup finishes, with a button to view the logs.

```bash
curl \
  -H "Title: Backup Complete" \
  -H "Actions: view, View Logs, https://stats.britbuzz.uk/logs, clear=true" \
  -d "Daily backup of /mnt/disk2 finished in 4 minutes." \
  https://ntfy.britbuzz.uk/backups

```

### Syntax for `http` Actions (Interactive)

If you want a button that actually *does* something (like turning off a light via an API), the syntax is:
`http, Label, URL, method=POST, body='{"status": "off"}', headers='{"Auth": "..."}'`

**Curl Example:**

```bash
curl \
  -H "Actions: http, Restart Server, https://api.britbuzz.uk/restart, method=POST, clear=true" \
  -d "High CPU detected. Want to restart?" \
  https://ntfy.britbuzz.uk/test_123

```

*Note: `clear=true` removes the notification after you click the button.*

---

## 2. What is UnifiedPush?

**UnifiedPush** is an open-source standard that allows Android apps to receive push notifications **without** relying on Google (Firebase).

### The Problem it Solves

Normally, every app on your phone (Element, Mastodon, etc.) has to maintain its own connection to its own server to get notifications, which drains your battery. Google solves this by forcing everyone through Firebase, but that's bad for privacy.

### How it Works with ntfy

Ntfy can act as a **Distributor**.

1. You install the ntfy app on Android.
2. In an app like **Element (Matrix)**, you choose "UnifiedPush" as the notification method.
3. Element gives a special "Secret URL" to its server.
4. When someone messages you on Matrix, the Matrix server sends a POST to your **ntfy** server.
5. Your ntfy server pushes it to your phone, and the ntfy app "hands" the message to the Element app.

### Why you should care

* **Battery Life:** One single background connection (ntfy) handles notifications for 10+ different apps.
* **De-Googling:** If you use a phone without Google Play Services (GrapheneOS, LineageOS), UnifiedPush via ntfy is the *only* way to get instant notifications for many apps.
* **Privacy:** Your notification metadata doesn't pass through Google's servers.

> **Important Note:** UnifiedPush is currently **Android-only**. On iOS, Apple strictly forbids this "app-to-app" communication, so you must use the standard ntfy push method we set up earlier.

---

Since your server is now configured with `auth-default-access: "deny-all"`, a **403 Forbidden** error means that your authentication was successful (the token was recognized), but the user owning that token **does not have permission** to write to that specific topic.

Even if you are an "admin," ntfy requires explicit Access Control List (ACL) entries for topics when the default policy is "deny-all."

### How to fix the 403 Forbidden Error

You need to grant your user permission to access the topic via the command line. Run these commands on your server:

#### 1. Check current permissions

First, see what permissions your user actually has:

```bash
docker exec -it ntfy ntfy access

```

If the list is empty or doesn't show your user for that topic, that is why you are getting a 403.

#### 2. Grant Write Access

To allow your user (the one who owns the token) to send messages to `test_123`, run:

```bash
docker exec -it ntfy ntfy access <USERNAME> test_123 write-only

```

*(Replace `<USERNAME>` with the name of the user you created earlier.)*

#### 3. Grant Full Access (Alternative)

If you want this user to be able to see the history (Read) and send messages (Write) to **every** topic on your server, run:

```bash
docker exec -it ntfy ntfy access <USERNAME> "*" read-write

```

---

### Why this happens (Logic Flow)

1. **POST with Token:** Your server checks if the token is valid. (It is, so you don't get a 401).
2. **Check ACL:** Your server looks at the `user.db` to see if `<USERNAME>` is allowed to talk to `test_123`.
3. **Deny All:** Because your config says `auth-default-access: "deny-all"`, the server assumes "No" unless it finds a specific "Allow" rule.
4. **403 Error:** The server tells you: "I know who you are, but you aren't on the list for this topic."

### Helpful Debugging Command

If you aren't sure which user owns your token, you can check the token list:

```bash
docker exec -it ntfy ntfy token list

```

This will show you the token IDs and the **usernames** they belong to. Make sure you are granting permissions to the correct username.

**Once you run the `ntfy access` command, try your `curl` again. It should return a `200 OK` immediately.**


---


To use **HTTP POST** with a token (also known as a **Bearer Token**), you need to include an `Authorization` header in your request. This is the standard way to prove your identity to the server without sending your username and password every time.

Here are the most common ways to implement this, depending on your preferred tool or language:

### 1. Using `curl` (Command Line)

This is the quickest way to test. Use the `-H` flag to pass the header.

```bash
curl \
  -H "Authorization: Bearer tk_your_token_here" \
  -H "Title: Security Alert" \
  -d "The backup was completed successfully." \
  https://ntfy.britbuzz.uk/test_123

```

---

### 2. Using Python (`requests` library)

If you are writing a script, Python makes it very clean.

```python
import requests

token = "tk_your_token_here"
topic_url = "https://ntfy.britbuzz.uk/test_123"

headers = {
    "Authorization": f"Bearer {token}",
    "Title": "Script Notification",
    "Tags": "rocket,white_check_mark"
}

response = requests.post(
    topic_url, 
    data="Process finished!", 
    headers=headers
)

print(f"Status Code: {response.status_code}")

```

---

### 3. Using JavaScript (Node.js or Browser `fetch`)

Great for web-based automations or backend services.

```javascript
const token = 'tk_your_token_here';

fetch('https://ntfy.britbuzz.uk/test_123', {
    method: 'POST',
    body: 'Hello from JavaScript!',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Title': 'Web Alert'
    }
})
.then(res => console.log('Message sent!'))
.catch(err => console.error(err));

```

---

### 4. Using PHP

Common for server-side website alerts.

```php
<?php
$token = "tk_your_token_here";
$ch = curl_init("https://ntfy.britbuzz.uk/test_123");

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "PHP Alert: Task Done");
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Authorization: Bearer $token",
    "Title: Server Report"
]);

curl_exec($ch);
curl_close($ch);
?>

```

---

### Common Issues to Watch For:

* **The "tk_" Prefix:** Ntfy tokens always start with `tk_`. Make sure you include the full string.
* **Permissions:** Ensure the user who "owns" the token has **write** access to the topic you are posting to.
* *Check via:* `docker exec -it ntfy ntfy access <username>`


* **HTTPS Requirement:** Since you are sending a token (which is sensitive), ntfy and Traefik should ideally enforce HTTPS. If you send a token over plain HTTP, anyone on your network could steal it.

### Pro-Tip: Testing the Token

If you want to verify your token is valid without sending a message, you can try to fetch the server configuration using the token:

```bash
curl -H "Authorization: Bearer tk_your_token_here" https://ntfy.britbuzz.uk/v1/config

```

If it returns JSON, your token is working perfectly.

**Would you like me to show you how to set up a "Write-Only" permission so that your token can send messages but cannot read the history?**

---
In your current configuration, **yes**, your server is wide open. Because you haven't enabled Access Control, anyone who knows (or guesses) the URL `https://ntfy.britbuzz.uk/test_123` can both send messages to you and read the messages you send.

Think of it like a public radio frequency: if you know the channel number, you can listen in.

---

### How to Lock It Down

To make your server private, you need to move from an "Open" policy to a "Closed" policy. This involves three steps:

#### 1. Update your `server.yml`

You need to tell the server to deny everyone by default and point to a database file where user permissions will be stored.

```yaml
# server.yml
auth-file: "/var/cache/ntfy/user.db"
auth-default-access: "deny-all"

```

#### 2. Create your Admin User

Since you've denied everyone, you now need to create "keys" for yourself. Run this command in your server's terminal:

```bash
docker exec -it ntfy ntfy user add --role=admin your_name

```

*(It will prompt you to create a password.)*

#### 3. Grant Permissions

Even as an admin, you need to tell the system which topics you (or others) can access.

* **To give yourself full access to everything:**
```bash
docker exec -it ntfy ntfy access your_name "*" read-write

```


* **To give a specific script "write-only" access (so it can't read your history):**
```bash
docker exec -it ntfy ntfy user add script_user
docker exec -it ntfy ntfy access script_user "my_alerts" write-only

```



---

### How sending messages changes

Once you turn on Authorization, a simple `curl` will fail with a `401 Unauthorized` error. You must now "log in" when you send a message:

**Using Username/Password:**

```bash
curl -u your_name:your_password -d "Locked message" https://ntfy.britbuzz.uk/test_123

```

**Using an Access Token (Recommended for scripts):**
You can generate a long-term token so you don't have to put your password in scripts:

1. Generate token: `docker exec -it ntfy ntfy token add your_name`
2. Use it:
```bash
curl -H "Authorization: Bearer tk_..." -d "Secure Alert" https://ntfy.britbuzz.uk/test_123

```



---

### How the iOS App changes

After locking the server, your iPhone app will stop receiving messages until you log in:

1. Open the **ntfy** app.
2. Go to **Settings** > **Users**.
3. Add a user for `https://ntfy.britbuzz.uk` with the credentials you just created.

### Should you lock it?

If you use a very long, random topic name like `secret_772_alert_99x`, it is statistically impossible for someone to guess it. However, if you are sending sensitive data (passwords, IPs, or personal info), **enabling Authentication is highly recommended.**

Would you like me to help you generate the commands to create a specific "low-privilege" user just for your scripts?

---

Yes, absolutely. Using **HTTP POST** is the primary way to send messages to ntfy.

Since you are self-hosting at `ntfy.britbuzz.uk`, you can use several methods to send the request. Here are the most common ways:

### 1. Simple Text Post (via `curl`)

The simplest way is to send the message as the "body" of the request.

```bash
curl -d "Hello from my script" https://ntfy.britbuzz.uk/test_123

```

### 2. JSON Post (The "Modern" Way)

If you are building an app or using a service that expects JSON, ntfy supports this as well. Just make sure to set the `Content-Type`.

```bash
curl -H "Content-Type: application/json" \
     -d '{"topic": "test_123", "message": "High disk usage detected", "title": "Server Alert", "priority": 4}' \
     https://ntfy.britbuzz.uk

```

### 3. Using Headers for Extra Metadata

You can send a simple text body but use **HTTP Headers** to add things like tags (emojis), titles, or priority levels.

```bash
curl \
  -H "Title: Unauthorized Access" \
  -H "Priority: urgent" \
  -H "Tags: warning,skull" \
  -d "Someone logged into the root account!" \
  https://ntfy.britbuzz.uk/test_123

```

---

### Key Parameters Table

When using POST, you can pass these parameters via **Headers** or inside a **JSON body**:

| Parameter | Header Name | JSON Key | Description |
| --- | --- | --- | --- |
| **Topic** | (In the URL) | `"topic"` | The topic name (e.g., `test_123`) |
| **Title** | `Title` | `"title"` | Bold text at the top |
| **Priority** | `Priority` | `"priority"` | 1 (min) to 5 (max) |
| **Tags** | `Tags` | `"tags"` | List of emojis or tags |
| **Click** | `Click` | `"click"` | URL to open when notification is clicked |

### A Note on Authentication

If you have enabled **Access Control** on your server, you will need to add your credentials to the POST request:

* **Basic Auth:** Add `-u username:password` to your curl command.
* **Token Auth:** Add `-H "Authorization: Bearer <your_token>"` to your headers.

Would you like me to write a specific script (Python, JavaScript, or PHP) to automate these POST requests for you?

---

Actually, looking at your logs, your server **is** working perfectly! You fixed the main issue.

Look at this specific line from your log:

> `DEBUG Publishing poll request to https://ntfy.sh/4d331e34...`

This confirms that your server **is** successfully sending the "wake-up" signal to the `ntfy.sh` relay. If your iPhone still isn't buzzing, the problem has moved from the **Server** to the **iPhone/Network** side.

Here is the checklist to find the final "missing link":

### 1. The "Default Server" setting in the iOS App

This is the most common mistake. Even if you are subscribed to `test_123`, the app needs to know it belongs to *your* server.

* Open the ntfy app.
* Tap **Settings** (gear icon) -> **General**.
* Is the **Default server** set exactly to `https://ntfy.britbuzz.uk`?
* **Important:** If you changed this *after* subscribing to the topic, **delete the topic and re-subscribe**.

### 2. Check iOS System Permissions

Apple is very strict about background notifications.

* Go to iPhone **Settings** -> **Notifications** -> **ntfy**.
* Ensure **Allow Notifications** is ON.
* Ensure **Critical Alerts** (if available) and **Sounds/Badges** are ON.
* Check if **Scheduled Summary** is enabled. If it is, ntfy alerts might be "hidden" until your scheduled time.

### 3. Disable "Instant Delivery"

In the ntfy app settings:

* Ensure **Instant delivery** is **OFF**.
* When it is OFF, the app relies on the "Poll Request" (the line we saw in your log). If it is ON, the app tries to use a WebSocket, which iOS will often kill, preventing the notification from appearing.

### 4. Test on Cellular Data (LTE/5G)

Sometimes, if your phone is on the same Wi-Fi as your server, local "hairpinning" issues in your router can prevent the phone from talking back to `ntfy.britbuzz.uk` once it wakes up.

* Turn off Wi-Fi on your iPhone.
* Send the `curl` command again.
* If it works on LTE but not Wi-Fi, the issue is your home router's DNS or loopback settings.

### 5. Check "Do Not Disturb" / Focus Modes

If you have a **Focus Mode** (Work, Sleep, Do Not Disturb) active, the notification will be silenced and won't wake the screen, even though it arrived.

---

### Final "Force" Test

To verify if the `ntfy.sh` relay is actually reaching your phone, try sending a message with **Urgent** priority. This uses a different delivery path that is harder for the system to ignore:

```bash
curl -H "Priority: urgent" -d "Emergency Test" https://ntfy.britbuzz.uk/test_123

```

**If you see "Publishing poll request" in the logs but the phone stays silent on LTE/5G with all permissions on:**
Try deleting the ntfy app entirely and reinstalling it. This clears the "Push Token" and forces a brand-new handshake with your server.

**Did the "Urgent" priority message make a difference?**

---
## ntfy `curl` Cheatsheet

Since you've moved to a closed system with `deny-all`, these examples include the necessary authentication.

---

### 1. Authentication Methods

You must use **either** a token or a password. Tokens are better for scripts because they can be revoked.

**Using a Token (Recommended):**

```bash
curl -H "Authorization: Bearer tk_12345..." -d "Message" https://ntfy.britbuzz.uk/test_123

```

**Using Username/Password:**

```bash
curl -u "my_user:my_password" -d "Message" https://ntfy.britbuzz.uk/test_123

```

---

### 2. Priority Levels

You can use the name or the number ( to ).

| Priority | Header Value | Behavior |
| --- | --- | --- |
| **Urgent** | `5` or `max` | Loud sound, bypasses silent switch (if Critical Alerts is on). |
| **High** | `4` or `high` | Standard sound/vibration. |
| **Default** | `3` or `default` | Standard sound/vibration. |
| **Low** | `2` or `low` | No sound, just a notification in the tray. |
| **Min** | `1` or `min` | Completely silent, hidden in tray. |

**Example (Urgent):**

```bash
curl -H "Authorization: Bearer tk_..." -H "Priority: 5" -d "Server Down!" https://ntfy.britbuzz.uk/alerts

```

---

### 3. Adding Metadata (Emojis & Titles)

Make your notifications look professional with titles and tags.

```bash
curl -H "Authorization: Bearer tk_..." \
     -H "Title: Disk Space Warning" \
     -H "Tags: warning,floppy_disk" \
     -H "Priority: high" \
     -d "Disk /mnt/disk2 is 95% full." \
     https://ntfy.britbuzz.uk/test_123

```

---

### 4. Interactive Action Buttons

Add a button to your notification that opens a link or triggers another API.

```bash
curl -H "Authorization: Bearer tk_..." \
     -H "Actions: view, Open Dashboard, https://stats.britbuzz.uk" \
     -d "New stats are available." \
     https://ntfy.britbuzz.uk/test_123

```

---

### 5. Sending via JSON (Alternative)

If you prefer JSON format (useful for complex payloads):

```bash
curl -H "Authorization: Bearer tk_..." \
     -H "Content-Type: application/json" \
     -d '{
       "topic": "test_123",
       "message": "Security alert",
       "title": "Unauthorized Login",
       "priority": 4,
       "tags": ["skull"]
     }' \
     https://ntfy.britbuzz.uk

```

**Would you like me to create a "Write-Only" user for your specific backup or monitoring scripts?**

{% endraw %}
