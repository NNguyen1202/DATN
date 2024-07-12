// services/notificationService.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const { pageAccessToken } = require('./tokenService');
const cron = require('node-cron');
const dotenv = require("dotenv").config();

const gmailConfig = {
  user: process.env.MAIL_ID,
  pass: process.env.MAIL_PASSWORD,
};

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gmailConfig.user,
    pass: gmailConfig.pass,
  },
});

let sentNotifications = {};
if (fs.existsSync("sentNotifications.json")) {
  const data = fs.readFileSync("sentNotifications.json", "utf-8");
  sentNotifications = JSON.parse(data);
}

const saveSentNotifications = () => {
  fs.writeFileSync(
    "sentNotifications.json",
    JSON.stringify(sentNotifications, null, 2)
  );
};

const sendNotification = async () => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/${process.env.PAGE_ID}/feed?fields=id,message,created_time,comments.limit(1).summary(true),likes.limit(1).summary(true),shares&access_token=${pageAccessToken()}`
    );
    const data = await response.json();

    if (data && data.data) {
      const latestPosts = data.data;
      latestPosts.forEach((post) => {
        const { id, message, created_time, comments, likes, shares } = post;

        const totalComments = comments ? comments.summary.total_count : 0;
        const totalLikes = likes ? likes.summary.total_count : 0;
        const totalShares = shares ? shares.count : 0;

        if (sentNotifications[id]) {
          const {
            previousTotalComments,
            previousTotalLikes,
            previousTotalShares,
          } = sentNotifications[id];

          if (
            totalComments !== previousTotalComments ||
            totalLikes !== previousTotalLikes ||
            totalShares !== previousTotalShares
          ) {
            const mailOptions = {
              from: '"👻Facebook Page Notifier" <abc@gmail.com.vn>',
              to: process.env.RECEIVER_EMAIL,
              subject: `New Notification: Change on your Facebook post`,
              text: `You have a new notification on your Facebook post:\n\nPost Message: ${message}\nCreated Time: ${created_time}\nPost ID: ${id}\n\nTotal Comments: ${totalComments}\nTotal Likes: ${totalLikes}\nTotal Shares: ${totalShares}\n\nFor more details, visit: https://www.facebook.com/${process.env.PAGE_ID}/posts/${id.split("_")[1]}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Error sending email:", error);
              } else {
                console.log("Email sent:", info.response);
                sentNotifications[id] = {
                  previousTotalComments: totalComments,
                  previousTotalLikes: totalLikes,
                  previousTotalShares: totalShares,
                };
                saveSentNotifications();
              }
            });
          } else {
            console.log("No change detected for post:", id);
          }
        } else {
          sentNotifications[id] = {
            previousTotalComments: totalComments,
            previousTotalLikes: totalLikes,
            previousTotalShares: totalShares,
          };
          saveSentNotifications();
        }
      });
    } else {
      console.log("No new changes.");
    }
  } catch (error) {
    console.error("Error fetching Facebook data:", error);
  }
};

cron.schedule("0,30 * * * *", () => {
  console.log('Running scheduled task to check for new notifications');
  sendNotification();
});

module.exports = sendNotification;
