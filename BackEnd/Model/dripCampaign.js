const  mongoose  = require("mongoose");

const dripStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  delayDays: { type: Number, required: true },
  content: { type: String, required: true },
 
  fromEmail: { type: String, required: true  }
});

module.exports = mongoose.model('DripCompains', dripStepSchema);

