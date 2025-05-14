// jobs/emailJob.js
// cronJob.js
const cron = require('node-cron');
const EmailSchedule = require('../Model/EmailSchedule');
const sendEmail = require('../Utils/SendEmail');

const emailCronJob = cron.schedule('* * * * *', async () => {  // Runs every minute
  try {
    const now = new Date();

    // Find emails that are due to be sent (i.e., sendAt time is less than or equal to the current time)
    const due = await EmailSchedule.find({
      sendAt: { $lte: now },
      sent: false,  // Ensure that the email has not been sent already
    });

    if (due.length > 0) {
      console.log(`${due.length} emails found to be sent at ${now}`);
    }

    // Process each email to be sent
    for (const email of due) {
      try {
        // Send the email
        await sendEmail(email.email, email.subject, email.content);
        console.log(`Email sent to ${email.email}`);

        // Mark the email as sent
        email.sent = true;
        await email.save();
        console.log(`Email for ${email.email} marked as sent`);

      } catch (err) {
        console.error(`Error sending email to ${email.email}:`, err);
      }
    }
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});

// Exporting the cron job
module.exports = emailCronJob;

