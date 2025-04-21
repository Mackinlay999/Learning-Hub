const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
   
    number : {type : Number},
    program: { type: String, required: true },
    Joiningtime : {type : String},
    status: {
      type: String,
     
    },


  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
