const Address = require("../model/address");

exports.addAddressDetails = async (req, res) => {
  const { landmark, pincode, city, state, country } = req.body;
  const userId = req.user.id; // Assuming you have user authentication set up

  console.log("Adding address for user ID:", userId);

  

  try {
    const address = new Address({
      user: userId,
      landmark,
      pincode,
      city,
      state,
      country
    });
    console.log("Address object:", address);

    await address.save();
    await User.findByIdAndUpdate(userId, { address: address._id });

    res.status(201).json({ message: "Address details added successfully", data: address });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({
      message: "Failed to add address details",
      error: error.message || error
    });
  }
};


exports.getAddress = async (req, res, next) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedAddress);
  } catch (error) {
    next(error);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.json({ message: "Address deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.checkCustomerAddress = async (req, res, next) => {
  try {
    console.log('user id ', req.user.id);
    const existingAddress = await Address.findOne({ user: req.user.id });
    console.log('user address ', existingAddress);
    
    if (!existingAddress) {
      // console.log('sucess');

      return res.status(200).json({ message: "Address not found", Address: false });
    } else {
      return res.status(200).json({ message: "Address found" ,Address: true});

    }



    // // Count addresses associated with the authenticated user
    // const addressCount = await Address.countDocuments({ user: req.user.id });
    // // adddress find one


    // if (addressCount === 0) {
    //   res.json({ isNewUser: true, message: "No address found. Please add a full address.", addressCount });
    // } else {
    //   res.json({ isNewUser: false, message: "Address found. You are an existing user.", addressCount });
    // }
  } catch (error) {
    next(error);
  }
};


