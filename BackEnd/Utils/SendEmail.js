const sendEmail = require('../Utils/emailService'); // Import the email sending function

const scheduleEmail = async (emailDetails, delayInDays) => {
  // Calculate the delay in milliseconds (delay in days converted to milliseconds)
  const delayInMs = delayInDays * 24 * 60 * 60 * 1000;

  // Set a timeout to send the email after the delay
  setTimeout(async () => {
    try {
      // Send the email
      await sendEmail(emailDetails.to, emailDetails.subject, emailDetails.content, emailDetails.fromEmail);
      console.log(`Email sent to ${emailDetails.to} after ${delayInDays} day(s)`);
    } catch (err) {
      console.error(`Error sending delayed email: ${err}`);
    }
  }, delayInMs);
};

module.exports = scheduleEmail;
