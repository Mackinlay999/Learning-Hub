const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema({
  webinarTitle: { type: String, required: true },
  webinarDateTime: { type: Date, required: true },
  webinarDescription: { type: String, required: true },
  webinarLink: { type: String, required: true },
  typeOfProgram: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Webinar", webinarSchema);
