// const nodemailer = require('nodemailer');

// // Create a reusable transporter object using SMTP
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Function to send email
// const sendEmail = async (to, subject, text ,from = process.env.EMAIL) => {
//   try {
//     const info = await transporter.sendMail({
//       from,
//       to,
//       subject,
//       text,
//     });

//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// // Export it properly for CommonJS
// module.exports = { sendEmail };

// utils/sendEmail.js

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, content, from) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from,
    to,
    subject,
    text: content,
  });
};

module.exports = sendEmail;



