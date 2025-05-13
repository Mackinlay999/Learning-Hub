const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider's service, e.g., 'gmail', 'smtp.mailtrap.io', etc.
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // Your email password or app password
  },
});

// Email sending function
const sendEmail = async (to, subject, text, fromEmail) => {
  const mailOptions = {
    from: fromEmail, // Sender address
    to, // List of recipients
    subject, // Subject line
    text, // Plain text body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

module.exports = sendEmail;
