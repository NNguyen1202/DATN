const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const received_updates = [];
const dotenv = require("dotenv").config();

router.use(
  require("express-x-hub")({
    algorithm: "sha1",
    secret: process.env.APP_SECRET,
  })
);

router.use(express.json());

// Khai báo thông tin tài khoản Gmail
const gmailConfig = {
  user: process.env.MAIL_ID,
  pass: process.env.MAIL_PASSWORD,
};

// Thiết lập transporter (ví dụ: sử dụng Gmail)
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: gmailConfig.user,
    pass: gmailConfig.pass,
  },
});

// router.get("/", function (req, res) {
//   console.log(req);
//   res.send("<pre>" + JSON.stringify(received_updates, null, 2) + "</pre>");
// });

router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

router.post("/", (req, res) => {
  const pageId = process.env.PAGE_ID;

  if (req.body.object === "page") {
    req.body.entry.forEach((entry) => {
      entry.changes.forEach((change) => {
        const { field, value } = change;

        // Kiểm tra nếu thay đổi liên quan đến feed
        if (field === "feed") {
          const { item, verb, message, created_time } = value;

          // Thiết lập nội dung email
          const mailOptions = {
            from: '"Facebook Page Notifier 👻" <abc@gmail.com.vn>',
            to: "nguyenhandsome1202@gmail.com",
            subject: `New Notification from Page: ${pageId}`,
            text: `There is a new change on your Facebook page's feed:\n\nItem: ${item}\nVerb: ${verb}\nMessage: ${message}\nCreated Time: ${created_time}`,
          };

          // Gửi email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }
      });
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }

  // const body = req.body;
  // console.log("Received webhook event:", body);

  // switch (body.object) {
  //   case "User":
  //     handleUserEvent(body);
  //     break;
  //   default:
  //     console.error("Unsupported object type:", body.object);
  // }

  // res.status(200).send("OK");
});

function handleUserEvent(body) {
  body.entry.forEach((entry) => {
    entry.changes.forEach((change) => {
      switch (change.field) {
        case "feed":
          handleFeedChangeEvent(change.value);
          break;
        case "conversations":
          handleConversationEvent(change.value);
          break;
        default:
          console.error("Unsupported user event field:", change.field);
      }
    });
  });
}

function handleFeedChangeEvent(change) {
  sendEmailNotification(
    "nguyenhandsome2001@gmail.com",
    "Notification from Facebook",
    "A new event occurred on Facebook!",
    `<p>A new event occurred on Facebook!</p><pre>${JSON.stringify(
      change,
      null,
      2
    )}</pre>`
  );
  received_updates.unshift(change);
}

function handleConversationEvent(change) {
  console.log("Conversation event:", change);
}

function sendEmailNotification(to, subject, text, html) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: '"Notification 👻" <abc@gmail.com.vn>',
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Failed to send email notification:", error);
    }
    console.log("Email notification sent successfully:", info.response);
  });
}

module.exports = router;
