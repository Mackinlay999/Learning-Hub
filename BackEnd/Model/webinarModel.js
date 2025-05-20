const mongoose = require("mongoose");

const webinarSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    title: { type: String, required: true },
    dateTime: { type: Date, required: true },
    description: { type: String, required: true },
    link: { type: String }, // New field for webinar link
    typeofProgram: { type: String }, 
    registrants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Webinar", webinarSchema);
