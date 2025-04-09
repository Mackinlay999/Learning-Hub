// controllers/AlumniController.js
const Alumni = require("../Model/AlumniScheme")

const alumnicontroller = {
createAlumni : async (req, res) => {
    console.log("cretae alumni");
    
  try {

    const {name, graduationYear,industry, testimonial} =req.body


    if(!name || !graduationYear || !industry ||  !testimonial){
        return res.status(400).json({err  :"pleace fill the form"})
    }
    const alumni = new Alumni({name, graduationYear,industry, testimonial});
    await alumni.save();
    res.status(201).json(alumni);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

getAllAlumni : async (req, res) => {
    console.log("get all alumni");
  try {
    const alumniList = await Alumni.find();
    res.status(200).json(alumniList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

updateAlumni : async (req, res) => {
    console.log("update alumni");
  try {
    const updated = await Alumni.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
},

deleteAlumni : async (req, res) => {
    console.log("delete alumni");
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Alumni deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

}
module.exports =alumnicontroller ;
