// models/scheme.js
const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String, enum: ["Single Payment", "Monthly"], required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number },
  status: { type: String, default: "Approved" }, // New field for status
  image: { type: String, required: true }, // Make sure only 'image' is required
  category: { type: String, enum: ["diamond", "gold", "savings"], required: true },  // New field
  duration: {
    type: String,  // Ensure this is defined as a string or another appropriate type
    required: true,
  },
  duedate: {
    type: String,
    required: true

  },
  termsAndConditions: String, // New field for terms and conditions
  diamondPricePerCarat: { type: Number, default: 84000 },
  goldPricePerKg: { type: Number, default: 6000 }

});

module.exports = mongoose.model("Scheme", SchemeSchema);
