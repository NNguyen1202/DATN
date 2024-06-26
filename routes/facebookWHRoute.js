const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const received_updates = [];

router.use(
  require("express-x-hub")({
    algorithm: "sha1",
    secret: process.env.APP_SECRET,
  })
);

router.use(express.json());

// router.get("/", function (req, res) {
//   console.log(req);
//   res.send("<pre>" + JSON.stringify(received_updates, null, 2) + "</pre>");
// });

router.get("/", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log("Received webhook event:", body);

  switch (body.object) {
    case "User":
      handleUserEvent(body);
      break;
    default:
      console.error("Unsupported object type:", body.object);
  }

  res.status(200).send("OK");
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
