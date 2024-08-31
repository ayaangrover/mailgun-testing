const express = require("express");
const mailgun = require("mailgun-js");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;
const mg = mailgun({
  apiKey: API_KEY,
  domain: DOMAIN,
  host: "api.mailgun.net",
});

const PRESET_EMAIL = {
  from: `<admin@${DOMAIN}>`,
  to: "ayaangrover@gmail.com",
  subject: "New User",
  text: "A new user has joined!",
  "o:tag": "test",
};

app.get("/", (req, res) => {
  res.send(
    "Welcome to the email server. Use POST /send-email to send an email.",
  );
});

app.post("/send-email", (req, res) => {
  mg.messages().send(PRESET_EMAIL, (error, body) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error in sending email");
    } else {
      console.log("Email sent:", body);
      res.status(200).send("Email sent successfully");
    }
  });
  console.log(DOMAIN);
  console.log(API_KEY);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
