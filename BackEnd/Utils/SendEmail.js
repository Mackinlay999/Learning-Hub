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



// require("dotenv").config();

// const nodemailer = require('nodemailer');

// // Create a transporter using Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL, // Ensure this is set in .env
//     pass: process.env.EMAIL_PASSWORD, // Ensure this is set in .env
//   },
// });

// // Function to send email
// module.exports = (to, subject, text) => {
//   const mailOptions = {
//     from: '"Mackinlay" <harikrishg44@gmail.com>', // sender address
//     to, // recipient address
//     subject, // subject line
//     text, // plain text body
//     // html: "<b>Hello world?</b>"  // Uncomment to send HTML emails
//   };

//   // Sending email using the transporter
//   return transporter.sendMail(mailOptions);
// };

// module.exports =transporter;


