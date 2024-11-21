const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["PAN", "Aadhaar"], required: true },
  filePath: { type: String, required: true },
});

module.exports = mongoose.model("Document", DocumentSchema);
