const cron =  require("node-cron")
const  { sendEmail }  = require("../Utils/emailService")

// Schedule emails at the specified time
export const scheduleEmail = (email, delayTime) => {
  cron.schedule(`*/${delayTime} * * * *`, () => {
    sendEmail(email.to, email.from, email.content);
  });
};
