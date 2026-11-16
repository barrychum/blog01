---
title: "Genearte Google JSON credential"
date: 2024-07-12
tags: 
  - "Cheatsheet/google"
---
Here are the step-by-step instructions to generate the required JSON file containing your service account credentials for the Google Text-to-Speech API:

**1. Go to the Google Cloud Console:**

- Open your web browser and navigate to the Google Cloud Console: [https://console.cloud.google.com/](https://console.cloud.google.com/).
- Make sure you're signed in to your Google account with the appropriate permissions for your project.

**2. Select or Create a Project:**

- If you already have a Google Cloud project for your Text-to-Speech application, select it from the project dropdown menu at the top.
- If you don't have a project yet, you'll need to create one. Click on "Create project" and follow the on-screen instructions.

**3. Go to the IAM & Admin Section:**

- Once you're in your project, navigate to the IAM & Admin section. You can usually find it in the navigation bar on the left side of the console.

**4. Open Service Accounts:**

- In the IAM & Admin section, look for the "Service Accounts" option. It might be under a subheading like "IAM & Organization Administration" depending on the console layout. Click on it to open the Service Accounts page.

**5. Create a Service Account (Optional):**

- If you don't already have a service account specifically for your Text-to-Speech application, you can create one here. Click the "Create service account" button and give it a descriptive name (e.g., "text-to-speech-app").

**6. Select the Service Account:**

- If you created a new service account in the previous step, select it now. If you have an existing one, click on its name to open the details page.

**7. Generate Keys:**

- In the service account details page, locate the "Keys" tab. Click on it to manage your service account keys.

**8. Add Key:**

- Click on the "Add key" button and choose "Create new key".

**9. Select JSON as Key Type:**

- A pop-up window will appear asking for the key type. Select "JSON" as the key type.

**10. Create Key:**

- Click on the "Create" button. This will generate a new service account key for you.

**11. Download the JSON File:**

- A JSON file containing your service account credentials will be downloaded to your local machine. Make sure you save it in a secure location. This file typically gets named something like "tts_secret.json" (you can rename it if needed).

**Important Security Note:**

- **Never share your service account credentials file publicly.** It contains sensitive information that can be used to access your Google Cloud resources.

**Additional Tips:**

- Consider storing the path to the JSON file in an environment variable instead of hardcoding it in your script. This improves security by keeping the file path out of your code.
- Refer to the Google Cloud documentation for more information on managing service accounts and API keys: [https://cloud.google.com/iam/docs/service-account-overview](https://cloud.google.com/iam/docs/service-account-overview)

By following these steps, you'll have a valid JSON file containing your service account credentials that you can use to authenticate with the Google Text-to-Speech API in your Python script.



I see. Since gcloud is not installed, we'll need to use a different approach to authenticate your application. Here are the steps you can follow:

1. Create a service account and download the key file:

   a. Go to the Google Cloud Console (https://console.cloud.google.com/).
   b. Navigate to "IAM & Admin" > "Service Accounts".
   c. Click "Create Service Account".
   d. Give it a name and grant it the necessary roles (at least "Cloud Text-to-Speech API User").
   e. Create a key for this service account and download it as a JSON file.

2. Once you have the JSON key file, you can use it in your Python script:

   a. Move the JSON file to a secure location on your computer.
   b. Update your Python script to use this file:

   ```python
   from google.oauth2 import service_account
   from google.cloud import texttospeech

   # Path to your service account key file
   key_path = "/path/to/your-service-account-key.json"

   # Create credentials
   credentials = service_account.Credentials.from_service_account_file(key_path)

   # Create client
   client = texttospeech.TextToSpeechClient(credentials=credentials)

   # Rest of your code here...
   ```

   Replace "/path/to/your-service-account-key.json" with the actual path to your downloaded JSON key file.

3. Make sure you have the latest version of the Google Cloud Text-to-Speech library:

   ```
   pip install --upgrade google-cloud-texttospeech
   ```

4. Run your script. It should now be able to authenticate using the service account key.

Important security note: Keep your service account key secure and never commit it to version control systems.

If you're still having issues after trying this, please provide:

1. The updated code you're using (with any sensitive information redacted).
2. Any new error messages you're seeing.

Also, ensure that:
- The Text-to-Speech API is enabled for your project in the Google Cloud Console.
- Your service account has the necessary permissions.
- You're using the correct project ID.

Would you like me to explain any part of this process in more detail?
