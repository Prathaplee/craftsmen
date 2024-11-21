const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String }, // Store the file path for the profile image
  subscribeTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "SavingsSchemeSubscriber" }],
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
