const mongoose = require("mongoose");

const UploadSchema = new mongoose.Schema({
    filePath: { type: String, required: true }, // Store the file path
    uploadedAt: { type: Date, default: Date.now } // Optional: Store upload timestamp
});

module.exports = mongoose.model("Upload", UploadSchema);
