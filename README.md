# Jumpstart shop demo

# Requirements

 - Node.js
 - Contentful API access tokens
 - Empty Contentful Space
 - Contentful CLI tools

# Step 1

Create an empty space in Contentful if you haven't already. 
Create your first API key and note the API access tokens (delivery and preview).
From the Contentful web app go to  SPACE SETTINGS --> API keys....

# Step 2
After downloading/cloning this repo, navigate to the project's directory on your computer and run "npm install" from your terminal window to install the dependencies.

# Step 3
After installing the dependencies run the "npm run setup" command to configure the app.
Type in the API tokens from step 1 at the prompt. The script will connect to the provided space, please use a demo space as the script will DELETE all entries and content types. I repeat the script will WIPE! the space clean before importing new content.

# Step 4
Run the app with "npm run dev". The app will now be running locally on port 9019, you may also change the port in the package.json file.