const LeadEmail = require('../Model/LeadEmail');
const mongoose = require('mongoose');


const leademailcontroller ={

    createLeademail : async (req, res) => {
    try {
        const { name, email } = req.body;
    
        if (!name || !email) {
          return res.status(400).json({ err: 'fill the form' });
        }
    
        const newLead = new LeadEmail({ name, email });
        await newLead.save();
        res.status(201).json(newLead);
      } catch (error) {
        console.error('❌ Error creating lead:', error);
        res.status(500).json({ error: 'Server error' });
      }},

getLeademail : async (req, res) => {
  try {
    const leads = await LeadEmail.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error('❌ Error fetching leads:', error);
    res.status(500).json({ error: 'Server error' });
  }
},
updateLeademail: async (req, res) => {
  console.log("update lead email")
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ err: 'Name and email are required to update' });
  }

  try {
    const updatedLead = await LeadEmail.findByIdAndUpdate(id, { name, email }, { new: true });
    
    if (!updatedLead) {
      return res.status(404).json({ err: 'Lead not found' });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    console.error('❌ Error updating lead:', error);
    res.status(500).json({ error: 'Server error' });
  }
},

// Delete a lead email by ID
deleteLeademail: async (req, res) => {
  const { leadId } = req.params;

  // Log the leadId to verify it's being passed correctly
  console.log('Received leadId:', leadId);

  // Validate the leadId before querying
  if (!mongoose.Types.ObjectId.isValid(leadId)) {
    return res.status(400).send({ error: 'Invalid lead ID' });
  }

  try {
    const deletedLead = await LeadEmail.findByIdAndDelete(leadId);
    if (!deletedLead) {
      return res.status(404).send({ error: 'Lead not found' });
    }
    res.status(200).send({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).send({ error: 'Failed to delete lead' });
  }


}
}
module.exports =leademailcontroller ;