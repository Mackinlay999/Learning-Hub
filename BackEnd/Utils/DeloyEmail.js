const cron = require("node-cron");
const EmailSchedule = require("../Model/dripCampaign");
const user = require("../Model/UserloginScheme");
const sendEmail = require("../Utils/emailService"); // You will define this next

function startEmailScheduler() {
  // Every minute
  cron.schedule("* * * * *", async () => {
    const now = new Date();
    const pendingEmails = await EmailSchedule.find({
      scheduledAt: { $lte: now },
      sent: false,
    });

    for (const email of pendingEmails) {
      try {
        await sendEmail(email.to, email.step, email.content, email.fromEmail);
        console.log(`📨 Email sent to ${email.to} - Step ${email.step}`);

        email.sent = true;
        await email.save();

        await user.findByIdAndUpdate(email.userId, {
          $push: {
            dripStepsSent: {
              step: email.step,
              sentAt: new Date(),
            },
          },
        });
      } catch (err) {
        console.error(`❌ Failed to send email to ${email.to}`, err.message);
      }
    }
  });
}

// ✅ Export the scheduler function
module.exports = startEmailScheduler;
