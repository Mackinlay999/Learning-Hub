const  mongoose  = require("mongoose");

const dripStepSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  step: { type: String, required: true },
  delayDays: { type: Number, required: true },
  content: { type: String, required: true },
 
  fromEmail: { type: String, required: true  },
 scheduledAt: { type: Date,  },
  sent: { type: Boolean, default: false },
}, { timestamps: true });



module.exports = mongoose.model('DripCompains', dripStepSchema);

