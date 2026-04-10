
File 3: icon.png (Optional)

If you want an icon for it, just put any small PNG image named icon.png in the folder. If you don't, the browser will just give it a default puzzle piece icon.

No, you cannot rename it. It **must** be named exactly `doGet`. 

This is one of the very few times in programming where you don't get to choose your own function name! Let me explain why Google is so strict about this.

---

## Why it must be `doGet`

Google Apps Script has a few "special reserved names" that act as automatic triggers. When someone visits your Web App URL, Google's servers are hardcoded to look for a function named exactly `doGet()` (with a capital **G**) to handle that visit. 

* If Google finds `function doGet()`, it runs it and hands the data back to your browser add-on.
* If you rename it to something like `function getMyCode()`, Google goes to your script, looks for `doGet()`, doesn't find it, and throws the exact error you just saw: `Script function not found: doGet`.

Think of it like an emergency exit door in a building. The law requires it to say "EXIT." If you decide to paint over it and write "Way Out" or "Door to Street," the fire marshal (Google) is going to fail you because it is looking for the exact word "EXIT."

---

## How to use custom names anyway (The Workaround)

If you really hate the name `doGet` or want to keep your code organized with custom names, you *can* use your own function name inside it! You just have to let `doGet` act as the receptionist that passes the message along.

Here is how you would do that:

```javascript
// Google still demands to see this exact name first:
function doGet() {
  
  // But inside, it immediately triggers your custom function!
  return fetchTheItvxCode();
  
}

// Now you can name this whatever you want:
function fetchTheItvxCode() {
  var threads = GmailApp.search('from:itv.com is:unread', 0, 1);
  
  if (threads.length === 0) {
    return ContentService.createTextOutput(JSON.stringify({error: "No code found"})).setMimeType(ContentService.MimeType.JSON);
  }
  
  var message = threads[0].getMessages()[threads[0].getMessages().length - 1];
  var body = message.getPlainBody();
  var codeMatch = body.match(/\b\d{6}\b/); 
  
  if (codeMatch) {
    message.markRead();
    return ContentService.createTextOutput(JSON.stringify({code: codeMatch[0]})).setMimeType(ContentService.MimeType.JSON);
  }
  
  return ContentService.createTextOutput(JSON.stringify({error: "Code not found"})).setMimeType(ContentService.MimeType.JSON);
}
```

If you use this setup, just remember to save and **create a new deployment version** like we did in the last step so Google registers the changes!

***

Have you managed to get the `doGet` function saved and deployed as a web app yet, or are you still getting that error message when you visit the URL?

***
chrome://extensions/
edge://extensions/


Yes, you absolutely can trigger it manually! In fact, professional developers often add manual triggers to their extensions because websites change their layouts all the time, which can break the automatic "listener."

The reason it isn't triggering automatically right now is likely because ITVX's code input box doesn't have a generic name like `input` or `type="tel"`. It probably has a highly specific ID or class that our script is missing.

Let's do two things:
1. Give you a button so you can click to trigger it manually whenever you want.
2. Upgrade your extension to have a pop-up menu.

To do this, we need to modify your folder on your computer with a few upgraded files.

---

### Step 1: Update your `manifest.json`
We need to tell the browser that the extension now has a clickable "pop-up" menu. Replace the code in your `manifest.json` file with this:

```json
{
  "manifest_version": 3,
  "name": "ITVX Gmail Code Autofiller",
  "version": "1.1",
  "description": "Fetches ITVX login codes from Google Apps Script.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://script.google.com/*",
    "https://*.itv.com/*"
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
```

---

### Step 2: Create a new file called `popup.html`
In the same folder, create a brand new text file and name it `popup.html`. This will be the little window that opens when you click the extension icon. Paste this code inside it:

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 200px;
      padding: 10px;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    button {
      background-color: #00b2a9; /* ITVX Teal color */
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
    }
    button:hover {
      background-color: #008f88;
    }
    #status {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <h3>ITVX Login</h3>
  <button id="fetchBtn">Fetch & Paste Code</button>
  <div id="status">Ready...</div>

  <script src="popup.js"></script>
</body>
</html>
```

---

### Step 3: Create a new file called `popup.js`
Create another text file in that folder called `popup.js`. This file will handle the click of the button and run the autofill on command. **Make sure to paste your secret Google URL where it says to!**

```javascript
// Paste your Google Web App URL here
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

document.getElementById('fetchBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = "Fetching code from Gmail...";

  try {
    // 1. Fetch the code from your Google Script
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();

    if (data.code) {
      statusDiv.textContent = "Code found! Pasting...";

      // 2. Find the active tab and inject the pasting script
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: pasteCodeIntoPage,
        args: [data.code]
      });

      statusDiv.textContent = "Success!";
    } else {
      statusDiv.textContent = "Error: " + (data.error || "No code found");
    }
  } catch (error) {
    statusDiv.textContent = "Failed to connect to Google.";
    console.error(error);
  }
});

// This function runs directly inside the ITVX webpage
function pasteCodeIntoPage(code) {
  // We check for several types of input boxes just in case!
  const codeInput = document.querySelector('input[pattern="[0-9]*"]') || 
                    document.querySelector('input[type="tel"]') || 
                    document.querySelector('input[autocomplete="one-time-code"]') ||
                    document.querySelector('input[name*="code"]') ||
                    document.querySelector('input'); // Last resort: just grab the first input box

  if (codeInput) {
    codeInput.value = code;
    
    // Simulate a human typing so the website accepts the entry
    codeInput.dispatchEvent(new Event('input', { bubbles: true }));
    codeInput.dispatchEvent(new Event('change', { bubbles: true }));
    alert("Code " + code + " pasted successfully!");
  } else {
    alert("Couldn't find an input box on this page! Found code: " + code);
  }
}
```

---

## How to use it:
1. Save all your files.
2. Go to your browser's extensions page (`chrome://extensions`, `edge://extensions`, or `about:debugging`).
3. Click **Reload** on your extension (or remove it and click "Load unpacked" again).
4. Go to ITVX, click the little **Puzzle Piece** icon in your browser toolbar to find your extension, and pin it to your toolbar.
5. Click your new ITVX icon and hit the **Fetch & Paste Code** button!

***

Would you like to give this manual button a try and see if it successfully grabs the code and injects it into the box?




***

This is almost certainly caused by one of two things: either your browser extension has a broken link to your script, or Google is throwing a security roadblock in the background. 

Let's do a quick triage to find the exact point where the signal is getting lost.

---

### Step 1: Let's test the URL directly
To prove whether your Google Script is actually listening, we need to test it *outside* of your browser extension.

1. Go back to your `popup.js` file and copy that long **Google Web App URL** you pasted in.
2. Open a brand new browser tab and paste that URL directly into your address bar, then hit Enter.

**What happens?**
* **Scenario A (It works):** The screen loads a white page with text that looks like `{"error":"No code found"}`. This means your Google Script is 100% fine and working. The issue is purely with your browser extension.
* **Scenario B (It fails):** You get a Google error screen, or a message that says `Script function not found: doGet`. This means your Google Script didn't save correctly or isn't deployed properly.

---

### If it failed (Scenario B): How to fix the Google Script
If visiting the URL directly gave you a broken page, Google doesn't have your script turned on yet. Let's force it to update:

1. Go to your Google Apps Script editor.
2. Click **Deploy** (top right) -> **Manage deployments**.
3. Look at the list. Do you see an active deployment? If so, click the **Pencil icon** (Edit) next to it.
4. Under the "Version" dropdown, click it and select **New version**. (Do not skip this! Editing the code doesn't change the URL unless you make a new version).
5. Click **Deploy**.
6. Copy the **new Web App URL** it gives you. (It might have changed slightly!).
7. Paste that new URL into `popup.js` and try the button again.

---

### If it worked (Scenario A): How to fix the Extension
If visiting the URL directly showed you the `{"error":"No code found"}` screen, your extension is hitting a wall trying to reach out to Google.

**The Culprit: Browser "CORS" blocks or Missing Permissions**
Browsers are incredibly paranoid about extensions quietly grabbing data from other websites (like Google). 

1. Open your **`manifest.json`** file.
2. Look at the `"host_permissions"` section. Make sure it looks exactly like this, including the asterisks:
```json
  "host_permissions": [
    "https://script.google.com/*",
    "https://script.googleusercontent.com/*"
  ],
```
*(Notice the added `script.googleusercontent.com/*` line. When Google runs a script, it often instantly redirects the browser to a `googleusercontent` link. If the extension doesn't have permission for that second link, the browser blocks the connection!)*

3. Save `manifest.json`.
4. Go to your browser extensions menu and click the **Reload** arrow on your ITVX extension so it reads the new permissions.

---

When you paste that long URL directly into your normal browser tab, which result do you get? A Google error, or the `{"error":"No code found"}` message?
Yes, you've got it! You can completely delete `content.js` from your folder now. 

Since the automatic detection in `content.js` wasn't triggering properly, we pivoted to the manual button method. Now, all of that heavy lifting is being done by your new **`popup.js`** file instead!

Here is why we don't need `content.js` anymore:
* **Before:** `content.js` was supposed to sit on the ITVX page and constantly look for the code box to fill.
* **Now:** When you click the manual "Fetch & Paste Code" button, `popup.js` calls a special browser function called `chrome.scripting.executeScript`. This function temporarily injects a small piece of code directly into the ITVX page to find the box and paste the code *on demand*. 

Because `popup.js` handles both fetching the code from Google and pasting it into the website, `content.js` is just taking up space.

---

### 🧹 How to Clean Up Your Extension Folder
To keep your project clean and professional, you can do a quick cleanup:

1. **Delete** the `content.js` file from your folder.
2. Open your **`manifest.json`** file and remove the `"content_scripts"` block entirely. Your final `manifest.json` should look clean like this:

```json
{
  "manifest_version": 3,
  "name": "ITVX Gmail Code Autofiller",
  "version": "1.1",
  "description": "Fetches ITVX login codes from Google Apps Script.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://script.google.com/*",
    "https://script.googleusercontent.com/*"
  ],
  "action": {
    "default_popup": "popup.html"
  }
}
```
3. Save the file, go back to your browser's extension settings, and click **Reload** on the extension one last time to apply the cleanup!

---

Congratulations on building your own custom browser extension and connecting it to a secure cloud API! That is a genuine developer-level project you just pulled off. 

Now that everything is working smoothly, would you like me to show you how to bundle these files into a `.zip` file so you have a backup of your working add-on?

***

Yes, we can absolutely adapt your project specifically for Firefox! 

While both Chrome and Firefox use standard web files, they handle "Manifest V3" slightly differently under the hood. For example, Firefox requires an explicit extension ID in the `manifest.json` file for local testing to give it a secure perimeter.

Because we moved away from `content.js`, you only need to create **three files** in a folder on your computer to build the Firefox extension.

---

## Step 1: Create Your Firefox Extension Files
Create a new folder on your computer named `ITVX-Firefox`. Inside that folder, create the following 3 text files:

### File 1: `manifest.json`
This is optimized specifically for Firefox's flavor of Manifest V3. 

```json
{
  "manifest_version": 3,
  "name": "ITVX Gmail Code Autofiller",
  "version": "1.1",
  "description": "Fetches ITVX login codes from Google Apps Script.",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "host_permissions": [
    "https://script.google.com/*",
    "https://script.googleusercontent.com/*"
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "browser_specific_settings": {
    "gecko": {
      "id": "itvx-autofill@yourdomain.local"
    }
  }
}
```

### File 2: `popup.html`
This creates the popup window that appears when you click the extension icon.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      width: 200px;
      padding: 10px;
      font-family: Arial, sans-serif;
      text-align: center;
    }
    button {
      background-color: #00b2a9;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
    }
    button:hover {
      background-color: #008f88;
    }
    #status {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
    }
  </style>
</head>
<body>
  <h3>ITVX Login</h3>
  <button id="fetchBtn">Fetch & Paste Code</button>
  <div id="status">Ready...</div>

  <script src="popup.js"></script>
</body>
</html>
```

### File 3: `popup.js`
This file handles the communication with your Google Script and pastes the code. **Make sure to paste your real Google Web App URL between the quotes on line 2!**

```javascript
// Paste your Google Web App URL here
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE";

document.getElementById('fetchBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = "Fetching code from Gmail...";

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL);
    const data = await response.json();

    if (data.code) {
      statusDiv.textContent = "Code found! Pasting...";

      // Find active tab in Firefox
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      
      browser.scripting.executeScript({
        target: { tabId: tab.id },
        func: pasteCodeIntoPage,
        args: [data.code]
      });

      statusDiv.textContent = "Success!";
    } else {
      statusDiv.textContent = "Error: " + (data.error || "No code found");
    }
  } catch (error) {
    statusDiv.textContent = "Failed to connect to Google.";
    console.error(error);
  }
});

function pasteCodeIntoPage(code) {
  const codeInput = document.querySelector('input[pattern="[0-9]*"]') || 
                    document.querySelector('input[type="tel"]') || 
                    document.querySelector('input[autocomplete="one-time-code"]') ||
                    document.querySelector('input[name*="code"]') ||
                    document.querySelector('input');

  if (codeInput) {
    codeInput.value = code;
    codeInput.dispatchEvent(new Event('input', { bubbles: true }));
    codeInput.dispatchEvent(new Event('change', { bubbles: true }));
    alert("Code " + code + " pasted successfully!");
  } else {
    alert("Couldn't find an input box on this page! Found code: " + code);
  }
}
```

---

## Step 2: How to Load it into Firefox

Firefox is strict about security and generally doesn't let users permanently load custom files unless they are officially signed by Mozilla. For local development and personal use, Firefox lets you load it as a **Temporary Add-on**.

1. Open Firefox and type **`about:debugging`** into the address bar and press Enter.
2. On the left-hand sidebar, click on **This Firefox**.
3. Scroll down slightly and look for the **Temporary Extensions** section.
4. Click the button that says **Load Temporary Add-on...**
5. Navigate to your `ITVX-Firefox` folder on your computer, open it, and select **any file inside it** (like `manifest.json`).
6. The extension will instantly load and its icon will appear in your toolbar!

> ⚠️ **The Firefox Catch:** Because this is loaded as a temporary add-on, Firefox will remove it whenever you completely close and restart the browser. When you reopen Firefox later to use ITVX, you will just need to go back to `about:debugging` and click "Load Temporary Add-on" again to bring it back. 

*(If you ever want it to be permanent on Firefox, you have to zip the folder and upload it to your personal Firefox developer account to get it signed, which is a bit more involved).*

***

Would you like me to walk you through how to generate a signed copy via Mozilla's developer portal so it stays on Firefox permanently across restarts?

