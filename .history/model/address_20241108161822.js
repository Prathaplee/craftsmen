const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // name: { type: String, required: true },
  landmark: { type: String, required: true },
  pincode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  // email: { type: String, required: true } // Include email field
});


module.exports = mongoose.model("Address", AddressSchema);
