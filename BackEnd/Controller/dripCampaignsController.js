const user = require('../Model/UserloginScheme.js');
const { sendEmail } = require('../Utils/emailService.js');
const DripCompains = require("../Model/dripCampaign.js")

const DripCompainscontroller = {
  getRecentUsers: async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    return await user.find({ createAt: { $gte: twentyFourHoursAgo } });
    
  },

//   sendDripCampaignEmails: async (req, res) => {
// console.log(" send dripcampains")
//     const dripSteps = req.body;

//     try {
//       const recentUsers = await DripCompainscontroller.getRecentUsers(); 

//       if (!Array.isArray(dripSteps) || dripSteps.length === 0) {
//         return res.status(400).json({ message: 'No steps provided.' });
//       }

//       recentUsers.forEach((user) => {
//         dripSteps.forEach((step) => {
//           const delayInMs = step.delayDays * 1000;

//           setTimeout(async () => {
//             await sendEmail(user.email, step.step, step.content);
//             console.log(`Email sent to ${user.email} for ${step.step}`);
//           }, delayInMs);
//         });
//       });

//       res.status(200).json({ message: 'Drip campaign emails are being sent.' });
//     } catch (error) {
//       console.error('Error sending emails:', error);
//       res.status(500).json({ message: 'Error sending emails' });
//     }
//   },


sendDripCampaignEmails: async (req, res) => {
  console.log("Sending Drip Campaigns");

  try {
    const recentUsers = await DripCompainscontroller.getRecentUsers(); // New users (last 24 hrs)
    const dripSteps = await DripCompains.find().sort({ delayDays: 1 }); // All saved drip steps

    if (!dripSteps.length) {
      return res.status(400).json({ message: 'No drip steps found in DB.' });
    }

    if (!recentUsers.length) {
      return res.status(200).json({ message: 'Drip steps available, but no new users to send emails to.' });
    }

    recentUsers.forEach((user) => {
      dripSteps.forEach((step) => {
        const delayInMs = step.delayDays * 24 * 60 * 60 * 1000;

        setTimeout(async () => {
          try {
            await sendEmail(user.email, step.step, step.content);
            console.log(`✅ Email sent to ${user.email} for Step: ${step.step}`);
          } catch (error) {
            console.error(`❌ Failed to send email to ${user.email} for Step: ${step.step}`, error);
          }
        }, delayInMs);
      });
    });

    res.status(200).json({ message: 'Drip campaign scheduling initiated.' });
  } catch (error) {
    console.error("Drip Campaign Error:", error);
    res.status(500).json({ message: "Something went wrong in drip campaign.", error });
  }
},

createdrip  : async (req,res) =>{
  console.log(
"create dripcampaigns"
  )
  try {
    const { step, delayDays, content } = req.body;

    // Save new drip step
    const newStep = new DripCompains({ step, delayDays, content });
    await newStep.save();

    return res.status(200).json ({message : "dripcampains created successfully"})
    
  } catch (error) {
    return res.status(401).json({err})
  }
},

  getAllDripSteps : async (req, res) => {
    try {
      const steps = await DripCompains.find().sort({ delayDays: 1 });
      return res.status(200).json(steps);
    } catch (error) {
      return res.status(500).json({ message: 'Error fetching drip steps.', error });
    }
},
 updateDripStep : async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStep = await DripCompains.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedStep) {
      return res.status(404).json({ message: 'Step not found.' });
    }

    return res.status(200).json({ message: 'Drip step updated successfully.', updatedStep });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating drip step.', error });
  }
},
deleteDripStep : async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStep = await DripCompains.findByIdAndDelete(id);

    if (!deletedStep) {
      return res.status(404).json({ message: 'Step not found.' });
    }

    return res.status(200).json({ message: 'Drip step deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting drip step.', error });
  }
}
}
module.exports = DripCompainscontroller;
