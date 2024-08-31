const express = require("express");
const mailgun = require("mailgun-js");

const app = express();
const port = 3000;

const DOMAIN = "(domain).mailgun.org";
const API_KEY = "(api-key)";
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

const PRESET_EMAIL = {
  from: "Admin <admin@(domain).mailgun.org>",
  to: "(me)@gmail.com",
  subject: "Preset Email Subject",
  text: "This is a preset email sent from the Node.js server.",
};

app.get("/send-email", (req, res) => {
  mg.messages().send(PRESET_EMAIL, (error, body) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error in sending email");
    } else {
      console.log("Email sent:", body);
      res.status(200).send("Preset email sent successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
