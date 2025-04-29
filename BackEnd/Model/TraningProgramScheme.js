const mongoose = require("mongoose")


const TraningProgramScheme = new mongoose.Schema({
    name : {type : String , required :true},
    mode : {type : String , required :true},
    duration:{type : String , required :true},
    price:{type : String , required :true},
    Certification : String,
    ProgramOverview : String,
  

 

  

  modules: [
    {
      ModuleTitle: String,
      Objective: String,
      Topics: String,
      Assessments: String,
    }
  ],


  Programbenefits: [String], // Array of benefit points
  PlacementAssistance: String,

  Enrollkeytitle: String,
  Enrollkeycontent: String,


})

module.exports = mongoose.model("TraningProgram" ,TraningProgramScheme );