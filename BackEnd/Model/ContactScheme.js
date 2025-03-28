


const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true }, 
  phone: { type: String, required: true }, 
  learningDomain: { type: String, required: true }, 
});

const Contact = mongoose.model("Contact", ContactSchema);
module.exports = Contact;
