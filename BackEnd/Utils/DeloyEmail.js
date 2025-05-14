const cron = require("node-cron");
const EmailSchedule = require("../Model/dripCampaign");
const user = require("../Model/UserloginScheme");
const sendEmail = require("../Utils/emailService");

function startEmailScheduler() {
  // Schedule to run every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const pendingEmails = await EmailSchedule.find({
        scheduledAt: { $lte: now },
        sent: false,
      });

      for (const email of pendingEmails) {
        try {
          // Send the email
          await sendEmail(email.to, email.step, email.content, email.fromEmail);
          console.log(`📨 Email sent to ${email.to} - Step: ${email.step}`);

          // Mark email as sent in the database
          email.sent = true;
          await email.save();

          // Update the user with the sent step
          await user.findByIdAndUpdate(email.userId, {
            $push: {
              dripStepsSent: {
                step: email.step,
                sentAt: new Date(),
              },
            },
          });
        } catch (err) {
          console.error(`❌ Failed to send email to ${email.to} - Step: ${email.step}`, err.message);
          // Optionally add a retry mechanism here if needed
        }
      }
    } catch (err) {
      console.error("Error while fetching pending emails:", err.message);
    }
  });
}

// Start the scheduler
startEmailScheduler();

// Export the scheduler function
module.exports = startEmailScheduler;
