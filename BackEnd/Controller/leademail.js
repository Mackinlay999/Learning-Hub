const LeadEmail = require('../Model/LeadEmail');


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
} 
}
module.exports =leademailcontroller ;