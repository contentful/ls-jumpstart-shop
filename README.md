# Jumpstart shop demo

# Requirements

 - Node.js
 - Contentful API keys

# Step 1

Create an empty space in Contentful and note the API keys (delivery, preview and management).
From the Contentful web app go to  SPACE SETTINGS --> API keys....

# Step 2
After downloading/cloning this repo, open the project's location on your computer and run "npm install" from your terminal window to install the dependencies.

# Step 3
After installing the dependencies run the "npm run setup" command to configure the app.
type in the keys at the prompt. The script will connect to the provided space, please use a demo space as the script will DELETE all entries and content types. I repeat the script will WIPE! the space clean before importing new content.

# Step 4
Run the app with "npm run dev".