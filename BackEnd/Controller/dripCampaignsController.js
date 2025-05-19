const user = require('../Model/UserloginScheme.js');
const { sendEmail } = require('../Utils/emailService.js');
const DripCompains = require("../Model/dripCampaign.js")

const DripCompainscontroller = {
getRecentUsers : async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const users = await user.find({ createdAt: { $gte: twentyFourHoursAgo } });

    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
},








createdrip : async (req, res) => {
  try {
    const drip = new DripCompains(req.body);
    const saved = await drip.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
