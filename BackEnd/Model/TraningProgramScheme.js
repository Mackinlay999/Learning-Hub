const mongoose = require("mongoose")


const TraningProgramScheme = new mongoose.Schema({
    name : {type : String , required :true},
    instructor : {type : String , required :true},
    duration:{type : String , required :true},
    price:{type : String , required :true},

})

module.exports = mongoose.model("TraningProgram" ,TraningProgramScheme );