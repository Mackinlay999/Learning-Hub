// controllers/emailController.js
const EmailTemplate = require('../Model/EmailTemplate');

const EmailTemplateController = {
createEmail : async (req, res) => {
  try {
    const email = await EmailTemplate.create(req.body);
    res.status(201).json(email);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

// Read all
getEmails : async (req, res) => {
  try {
    const emails = await EmailTemplate.find();
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

// Update
updateEmail :async (req, res) => {
  try {
    const email = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(email);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

// Delete
deleteEmail : async (req, res) => {
  try {
    await EmailTemplate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Email template deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} }
module.exports = EmailTemplateController;
