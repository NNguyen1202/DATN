// controllers/webhookController.js
const VERIFY_TOKEN = "ThisIsMyToken";
const nodemailer = require("nodemailer");

// Hàm gửi email thông báo
const sendEmailNotification = (to, subject, text, html) => {
  // Tạo một transporter sử dụng SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, //true for 465, false for other ports
    auth: {
      user: "vopvipbmt@gmail.com", // Địa chỉ email của bạn
      pass: "wagh pork jevu wjaw", // Mật khẩu email của bạn
    },
  });

  // Cấu hình email
  let mailOptions = {
    from: '"Hey 👻" <abc@gmail.com.vn>', // Địa chỉ email người gửi
    to: to, // Địa chỉ email người nhận
    subject: subject, // Chủ đề email
    text: text, // Nội dung email
    html: html,
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Failed to send email notification:", error);
    }
    console.log("Email notification sent successfully:", info.response);
  });
};

// // Tạo transporter
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "vopvipbmt@gmail.com", // Địa chỉ email của bạn
//     pass: "wagh pork jevu wjaw", // Mật khẩu của email
//   },
// });

const verifyWebhook = (req, res) => {
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

const handleWebhook = (req, res) => {
  const body = req.body;

  if (body.object === "User") {
    body.entry.forEach(function (entry) {
      entry.changes.forEach(function (change) {
        console.log(change);

        switch (change.field) {
          case "feed":
            handleFeedChange(change);
            break;
          case "comments":
            handleCommentsChange(change);
            break;
          case "reactions":
            handleReactionsChange(change);
            break;
          default:
            console.log("Unhandled field:", change.field);
        }
      });
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

const handleFeedChange = (change) => {
  let feedData = change.value;
  console.log("Feed event received:", feedData);
  sendEmailNotification(
    "nguyenhandsome1202@gmail.com",
    "Notification from Facebook",
    "A new event occurred on Facebook!",
    feedData
  );
  // Add your logic to handle feed changes
};

const handleCommentsChange = (change) => {
  let commentData = change.value;
  console.log("Comment event received:", commentData);
  sendEmailNotification(
    "nguyenhandsome1202@gmail.com",
    "Notification from Facebook",
    "A new event occurred on Facebook!",
    commentData
  );
  // Add your logic to handle comment changes
};

const handleReactionsChange = (change) => {
  let reactionData = change.value;
  console.log("Reaction event received:", reactionData);
  sendEmailNotification(
    "nguyenhandsome1202@gmail.com",
    "Notification from Facebook",
    "A new event occurred on Facebook!",
    reactionData
  );
  // Add your logic to handle reaction changes
};

// const sendEmail = (message) => {
//   let mailOptions = {
//     from: '"Hey 👻" <abc@gmail.com.vn>', // Địa chỉ email của bạn
//     to: "vopvipbmt@gmail.com", // Địa chỉ email của người nhận
//     subject: "Webhook Event Notification",
//     text: message,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });
// };

module.exports = {
  verifyWebhook,
  handleWebhook,
};
