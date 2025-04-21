const Lead = require("../Model/leadScheme");

const LeadController = {

    createLead : async (req, res) => {
        try {
           console.log("create lead");
           
            const {name,email,status,program,Joiningtime,number } = req.body
            if(!name ||!email ||!status || !program ||!number || !Joiningtime ){
                return res.status(400).json({err:"fill the form"})
            }
          const newLead = new Lead({name,email,status,program,Joiningtime,number });
          await newLead.save();
          res.status(201).json(newLead);
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      },

getLeads : async (req, res) => {
    console.log("get lead");
  try {
    const filter = req.query.status;
    const leads = filter ? await Lead.find({ status: filter }) : await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

// Get single lead
getLeadById : async (req, res) => {
    console.log("getbyid lead");
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},




// Update lead
updateLead : async (req, res) => {
    console.log("update lead");
  try {
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

// Delete lead
deleteLead : async (req, res) => {
    console.log("delete lead");
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
}
module.exports = LeadController;
