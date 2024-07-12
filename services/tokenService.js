// services/tokenService.js
const cron = require('node-cron');
const dotenv = require('dotenv').config();

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

const refreshToken = async () => {
  const shortLivedToken = process.env.SHORT_LIVED_USER_TOKEN; // Store and retrieve securely
  const longLivedUserAccessToken = await getLongLivedUserAccessToken(shortLivedToken);
  pageAccessToken = await getPageAccessToken(longLivedUserAccessToken);
  console.log('New Page Access Token:', pageAccessToken);
};

// Schedule refresh before every notification scan (e.g., 1 minute before the scan)
cron.schedule('29,59 * * * *', () => {
    console.log('Refreshing Page Access Token');
    refreshToken();
  });

module.exports = {
  refreshToken,
  getPageAccessToken,
  pageAccessToken: () => pageAccessToken,
};
