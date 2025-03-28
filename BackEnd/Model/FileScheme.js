const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
    program: { type: String, required: true },
    experience: { type: String, required: true },
    filename: { type: String, required: true }, // File name
    path: { type: String,  }, // File storage path
    mimetype: { type: String,  }, // File type (e.g., image/png, application/pdf)
    size: { type: Number}, // File size in bytes
    uploadedAt: { type: Date, default: Date.now } // Timestamp
});

module.exports = mongoose.model("File", FileSchema);
