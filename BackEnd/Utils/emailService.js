const nodemailer = require('nodemailer');

// Create a reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send email
const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: 'rjerald6803@gmail.com',
      to,
      subject,
      text,
    });

    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Export it properly for CommonJS
module.exports = { sendEmail };
