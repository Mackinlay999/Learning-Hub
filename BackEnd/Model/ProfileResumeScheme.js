const mongoose = require("mongoose")

const ProfileResumeScheme =new  mongoose.Schema({
    filename: { type: String, required: true }, // File name
    path: { type: String,  }, // File storage path
    mimetype: { type: String,  }, // File type (e.g., image/png, application/pdf)
    size: { type: Number}, // File size in bytes
    uploadedAt: { type: Date, default: Date.now } // Timestamp
})
// module.exports = ProfileResumeScheme;

module.exports = mongoose.model("Resume", ProfileResumeScheme );
