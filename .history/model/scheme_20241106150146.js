// models/scheme.js
const mongoose = require("mongoose");

const SchemeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ["Single Payment", "Monthly"], required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number },
  image: { type: String, required: true }, // Make sure only 'image' is required
  category: { type: String, enum: ["diamond", "gold"], required: true },  // New field
  duration: {
    type: String,  // Ensure this is defined as a string or another appropriate type
    required: true,
  },
  duedate:{
    type:String,
    required:true

  },
  termsAndConditions: String, // New field for terms and conditions

});

module.exports = mongoose.model("Scheme", SchemeSchema);
