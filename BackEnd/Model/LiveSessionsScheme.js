const mongoose = require("mongoose")

const LiveSessionsScheme = new mongoose.Schema({
    title: { type: String, required: true },
    platform: { type: String, default: 'Zoom' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    attendees: { type: Number, default: 0 }
})
module.exports = mongoose.model("LiveSession", LiveSessionsScheme )