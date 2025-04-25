
const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String, required: true },
  LinkedinUrl : {type:String ,required: true},
  photo: { type: String , required:true}, // store path or URL

}, { timestamps: true });

module.exports = mongoose.model("SuccessStory", successStorySchema);