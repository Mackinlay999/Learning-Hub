

const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your App Password (not email password)
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email Transporter Error:", error);
  } else {
  //   console.log("Email transporter is ready to send messages");
  }
});

module.exports = transporter;

