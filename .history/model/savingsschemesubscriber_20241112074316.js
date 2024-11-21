const mongoose = require("mongoose");
const address = require("./address");

const savingsSchemeSubscriberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  address: {type: mongoose.Schema.Types.ObjectId, ref: "Address"},
  scheme: { type: mongoose.Schema.Types.ObjectId, ref: 'Scheme' }, // Reference to Scheme model
  aadharNo: {
    type: String,
    validate: {
      validator: function (v) {
        return this.panNo || v;
      },
      message: "Aadhar number is required if PAN is not provided.",
    },
  },
  panNo: {
    type: String,
    validate: {
      validator: function (v) {
        return this.aadharNo || v;
      },
      message: "PAN number is required if Aadhar is not provided.",
    },
  },
  aadharImageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return this.panImageUrl || v;
      },
      message: "Aadhar image is required if PAN image is not provided.",
    },
  },
  panImageUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return this.aadharImageUrl || v;
      },
      message: "PAN image is required if Aadhar image is not provided.",
    },
  },
  amount: { type: Number, required: true },
  status: { type: String, default: "waiting for approval" }, // New field for status
  schemeName: { type: String, required: true },        // New field
  subscribedDate: Date,          // New field
  nextDueDate: Date,              // New field
  duration: Number,

});

module.exports = mongoose.model("SavingsSchemeSubscriber", savingsSchemeSubscriberSchema);
