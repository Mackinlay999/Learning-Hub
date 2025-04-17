const mongoose = require("mongoose")


const TraningProgramScheme = new mongoose.Schema({
    name : {type : String , required :true},
    mode : {type : String , required :true},
    duration:{type : String , required :true},
    price:{type : String , required :true},
    ProgramOverview : String,
    Curriculumtitle: String,
  objective: [String],
  topics: [String],
  assessments: [String],


  Programbenefits: [String], // Array of benefit points
  placementAssistance: String,

  enrollkeytitle: String,
  enrollkeycontent: String,


})

module.exports = mongoose.model("TraningProgram" ,TraningProgramScheme );