const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    // name: { type: String, required: true },
    // email: { type: String, required: true, unique: true },
    // phone: { type: String },
    webinarTitle: { type: String, required: true },
    webinarDateTime: { type: Date, required: true },
    webinarDescription: { type: String, required: true },
    webinarLink: { type: String,required: true  }, // New field for webinar link
    typeofProgram: { type: String,required: true  }, 
    // registrants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Webinar", webinarSchema);
