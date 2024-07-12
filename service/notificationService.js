const nodemailer = require("nodemailer");
const fetch = require("node-fetch");
const cron = require("node-cron");
const dotenv = require("dotenv").config();
const fs = require("fs");

// Khai báo thông tin tài khoản Gmail
const gmailConfig = {
  user: process.env.MAIL_ID,
  pass: process.env.MAIL_PASSWORD,
};

// Thiết lập transporter (ví dụ: sử dụng Gmail)
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: gmailConfig.user,
    pass: gmailConfig.pass,
  },
});

// Đọc danh sách ID thông báo đã gửi từ tệp tin (nếu có)
let sentNotifications = {};
if (fs.existsSync("sentNotifications.json")) {
  const data = fs.readFileSync("sentNotifications.json", "utf-8");
  sentNotifications = JSON.parse(data);
}

// Hàm lưu trữ danh sách ID thông báo đã gửi vào tệp tin
const saveSentNotifications = () => {
  fs.writeFileSync(
    "sentNotifications.json",
    JSON.stringify(sentNotifications, null, 2)
  );
};

// Hàm gửi thông báo qua email
const sendNotification = async () => {
  try {
    // Lấy dữ liệu từ API Facebook Graph
    const pageAccessToken = process.env.PAGE_ACCESS_TOKEN;
    const pageId = process.env.PAGE_ID;
    const response = await fetch(
      `https://graph.facebook.com/${pageId}/feed?fields=id,message,created_time,comments.limit(1).summary(true),likes.limit(1).summary(true),shares&access_token=${pageAccessToken}`
    );
    const data = await response.json();

    // Kiểm tra nếu có sự kiện mới
    if (data && data.data) {
      const latestPosts = data.data; // Danh sách các bài đăng mới nhất
      latestPosts.forEach((post) => {
        const { id, message, created_time, comments, likes, shares } =
          post;

        // Lấy thông tin lượt like, comment, share, view
        const totalComments = comments ? comments.summary.total_count : 0;
        const totalLikes = likes ? likes.summary.total_count : 0;
        const totalShares = shares ? shares.count : 0;

        // Kiểm tra nếu thông báo đã được gửi trước đó
        if (sentNotifications[id]) {
          // So sánh với thông tin đã lưu
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
            // Thiết lập nội dung email
            const mailOptions = {
              from: '"👻Facebook Page Notifier" <abc@gmail.com.vn>',
              to: "nguyenhandsome1202@gmail.com",
              subject: `New Notification: Change on your Facebook post`,
              text: `You have a new notification on your Facebook post:\n\nPost Message: ${message}\nCreated Time: ${created_time}\nPost ID: ${id}\n\nTotal Comments: ${totalComments}\nTotal Likes: ${totalLikes}\nTotal Shares: ${totalShares}\n\nFor more details, visit: https://www.facebook.com/${pageId}/posts/${
                id.split("_")[1]
              }`,
            };

            // Gửi email
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.error("Error sending email:", error);
              } else {
                console.log("Email sent:", info.response);
                // Cập nhật thông tin đã gửi
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
          // Nếu chưa gửi thông báo trước đó, lưu thông tin mới
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

cron.schedule("*/30 * * * *", () => {
  console.log("Running scheduled task to check for new notifications");
  sendNotification();
});

module.exports = sendNotification;
