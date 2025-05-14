// // controllers/userController.js
// const EmailTemplate = require('../Model/EmailTemplate');
// const EmailSchedule = require('../Model/EmailSchedule');
// const  user = require('../Model/UserloginScheme');

// const ScheduleEmail ={
// registerUser : async (req, res) => {
//   const users = await user.create(req.body);

//   const templates = await EmailTemplate.find(); // all email steps
//   const now = new Date();

//   const schedules = templates.map(t => ({
//     userId: user._id,
//     email: user.email,
//     subject: t.subject,
//     content: t.content,
//     sendAt: new Date(now.getTime() + t.delayInMinutes * 60 * 1000),
//   }));

//   await EmailSchedule.insertMany(schedules);

//   res.status(201).json({ message: 'User registered and emails scheduled' });
// } }
// module.exports = ScheduleEmail ;

// controllers/userController.js
const EmailTemplate = require('../Model/EmailTemplate');
const EmailSchedule = require('../Model/EmailSchedule');
const user = require('../Model/UserloginScheme');

const ScheduleEmail = {
  registerUser: async (req, res) => {
  
    const users = await user.create(req.body);

    const templates = await EmailTemplate.find(); 

   
    const now = new Date();


    const schedules = templates.map(t => ({
      userId: users._id,  // Corrected here from `user._id` to `users._id`
      email: users.email,  // Corrected here from `user.email` to `users.email`
      subject: t.subject,
      content: t.content,
      sendAt: new Date(now.getTime() + t.delayInMinutes * 60 * 1000),  // Scheduling based on delay
    }));

    // Insert the email schedules into the database
    await EmailSchedule.insertMany(schedules);

    // Respond with success
    res.status(201).json({ message: 'User registered and emails scheduled' });
  }
};

module.exports = ScheduleEmail;

