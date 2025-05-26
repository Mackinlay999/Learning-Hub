require("dotenv").config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: '"Mackinlay" <harikrishg44@gmail.com>',
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  transporter,
  sendEmail,
};




