const  mongoose  = require("mongoose");

// const dripStepSchema = new mongoose.Schema({
//    userId: mongoose.Schema.Types.ObjectId,
//   step: { type: String, required: true },
//   delayDays: { type: Number, required: true },
//   content: { type: String, required: true },
 
//   fromEmail: { type: String, required: true  }
// });


const dripStepSchema =new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  to: String,
  step: Number,
  content: String,
  fromEmail: String,
   scheduledAt: { type: Date, required: true },
  sent: { type: Boolean, default: false },
});
module.exports = mongoose.model('DripCompains', dripStepSchema);

