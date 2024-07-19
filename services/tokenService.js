// services/tokenService.js
const cron = require('node-cron');
const dotenv = require('dotenv').config();
const fs = require('fs');

let pageAccessToken = process.env.PAGE_ACCESS_TOKEN; // Initial token from env or other secure storage

const getLongLivedUserAccessToken = async (shortLivedToken) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&fb_exchange_token=${shortLivedToken}`);
    const data = await response.json();
    if (data.access_token) {
      return data.access_token;
    } else {
      throw new Error('Error fetching long-lived user access token');
    }
  } catch (error) {
    console.error('Error fetching long-lived user access token:', error);
  }
};

const getPageAccessToken = async (longLivedUserAccessToken) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/me/accounts?access_token=${longLivedUserAccessToken}`);
    const data = await response.json();
    const page = data.data.find(page => page.id === process.env.PAGE_ID);
    if (page && page.access_token) {
      return page.access_token;
    } else {
      throw new Error('Error fetching page access token');
    }
  } catch (error) {
    console.error('Error fetching page access token:', error);
  }
};

const saveTokenToEnvFile = (newToken) => {
  const envFilePath = '.env';
  let envContent = fs.readFileSync(envFilePath, 'utf-8');
  
  // Update the PAGE_ACCESS_TOKEN
  envContent = envContent.replace(/PAGE_ACCESS_TOKEN=.*/g, `PAGE_ACCESS_TOKEN=${newToken}`);
  
  // Write the new content back to the file
  fs.writeFileSync(envFilePath, envContent, 'utf-8');
};

const refreshToken = async () => {
  const shortLivedToken = process.env.SHORT_LIVED_USER_TOKEN; // Store and retrieve securely
  const longLivedUserAccessToken = await getLongLivedUserAccessToken(shortLivedToken);
  pageAccessToken = await getPageAccessToken(longLivedUserAccessToken);
  if (pageAccessToken) {
    console.log('New Page Access Token:', pageAccessToken);
    saveTokenToEnvFile(pageAccessToken);
  }
};

const getTokenRefreshCounter = async () => {
  if (!fs.existsSync(filePath)) {
    await updateTokenRefreshCounter(1);
    return 1;
  }
  const data = fs.readFileSync(filePath);
  const { counter } = JSON.parse(data);
  return counter;
};

const updateTokenRefreshCounter = async (counter) => {
  const data = { counter };
  fs.writeFileSync(filePath, JSON.stringify(data));
};

// Schedule refreshToken to run every day and maintain a counter to refresh every 50 days
cron.schedule('0 0 * * *', async () => {
  const counter = await getTokenRefreshCounter();
  if (counter >= 50) {
    console.log('Refreshing Page Access Token');
    await refreshToken();
    await updateTokenRefreshCounter(1); // Reset the counter to 1
  } else {
    await updateTokenRefreshCounter(counter + 1); // Increment the counter
  }
});

module.exports = {
  refreshToken,
  getPageAccessToken,
  pageAccessToken: () => pageAccessToken,
  getTokenRefreshCounter,
  updateTokenRefreshCounter,
};
