const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },  // Ensure scheme names are unique
  description: { type: String },
  type: { type: String, enum: ["Single Payment", "Monthly"], required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number },
  image: { type: String, required: true }, // Make sure only 'image' is required
  category: { type: String, enum: ["diamond", "gold", "savings"], required: true },  // New field
  duration: { type: Number, required: true },  // Changed to Number for duration
  duedate: { type: Date, required: true },  // Changed to Date for duedate
  termsAndConditions: { type: String }, // Optional field for terms and conditions
  diamondPricePerCarat: { type: Number, default: 84000 },
  goldPricePerKg: { type: Number, default: 6000 }
});

module.exports = mongoose.model("Scheme", SchemeSchema);
