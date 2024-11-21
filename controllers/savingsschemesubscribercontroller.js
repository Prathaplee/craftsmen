
const SavingsSchemeSubscriber = require("../model/savingsschemesubscriber"); // Import model
const Address = require("../model/address");
const User = require("../model/user.js");
// Create Savings Scheme Subscriber

exports.createSavingsSchemeSubscriber = async (req, res) => {
  const { aadharNo, panNo, amount, aadharImageUrl, panImageUrl, schemeId, } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user is ", user);
    const address = user.address;
    console.log("Address check", address);
    console.log("Scheme id", schemeId);

    // const existingSubscriber = await SavingsSchemeSubscriber.findOne({ user: userId, scheme: schemeId });
    // if (existingSubscriber) {
    //   return res.status(400).json({ message: "Already subscribed to this scheme" });
    // }
    console.log("scheme id check", schemeId);
    const savingsschemesubscriber = await SavingsSchemeSubscriber.create({
      user: user._id, // Save user ID as reference
      address,
      aadharNo,
      panNo,
      aadharImageUrl,
      panImageUrl,
      amount,
      scheme: schemeId,
      subscribedDate: new Date(),  // Set the subscribedDate to the current date

    });
    console.log("Fetching subscribers for scheme ID:", savingsschemesubscriber._id);
    user.subscribeTo.push(savingsschemesubscriber._id);
    await user.save();
    console.log(" user is checking", user);



    res.status(200).json({
      message: "Scheme subscribed successfully",
      userId: savingsschemesubscriber.user,
      subscriberId: savingsschemesubscriber._id,
      savingsschemesubscriber
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    res.status(500).json({ message: "Failed to create Savings Scheme Subscriber", error: error.message });
  }
};




exports.getSchemeDetails = async (req, res) => {
  const { userId: id } = req.params;

  try {
    console.log("Fetching subscribers for user ID:", id);

    // Fetch all subscribers for the user
    const subscriber = await SavingsSchemeSubscriber.findById(id)
    .populate("user", "name email")
    .populate("address")
    .populate("scheme", "name duration status");
  
  if (!subscriber) {
    return res.status(404).json({ message: "Subscriber not found" });
  }
  
  // Process `subscriber` as an object, not an array
  const schemeDetails = {
    subscriberId: subscriber._id,
    user: subscriber.user,
    address: subscriber.address,
    schemeDetails: {
      schemeName: subscriber.scheme ? subscriber.scheme.name : "N/A",
      duration: subscriber.scheme ? subscriber.scheme.duration : "N/A",
      status: subscriber.scheme ? subscriber.scheme?.status : "N/A",      
      amount: subscriber.amount,
      subscribedDate: formatDate(subscriber.subscribedDate),
      nextDueDate: formatDate(calculateNextDueDate(subscriber.subscribedDate)),
    },
  };

    res.status(200).json({
      message: "Subscribers fetched successfully",
      subscribers: schemeDetails,
    });
  } catch (error) {
    console.error("Error fetching scheme details:", error);
    res.status(500).json({
      message: "Failed to fetch scheme details",
      error: error.message,
    });
  }
};

// In your savingsSchemeController.js
exports.getPendingKyc = async (req, res) => {
  try {
    const pendingKycs = await SavingsSchemeSubscriber.find({ status: "pending" })
      .populate("user", "name email") // populate user data
      .populate("scheme", "name"); // populate scheme details

    res.status(200).json({
      message: "Fetched pending KYC submissions",
      pendingKycs,
    });
  } catch (error) {
    console.error("Error fetching pending KYC", error);
    res.status(500).json({ message: "Failed to fetch pending KYC", error: error.message });
  }
};



const calculateNextDueDate = (subscribedDate) => {
  const date = new Date(subscribedDate);
  date.setMonth(date.getMonth() + 1); // Add one month
  return date;
};

// controllers/savingsSchemeController.js

// Update Approval Status
exports.updateApprovalStatus = async (req, res) => {
  const { subscriberId } = req.params; 
  const { status } = req.body; 

  console.log('Subscriber ID:', subscriberId);
  console.log('Status:', status);

  try {
    const subscriber = await SavingsSchemeSubscriber.findById(subscriberId); 
    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    subscriber.status = status;
    await subscriber.save();

    res.status(200).json({ message: `Status updated to ${status}`, subscriber });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};



// Helper function to format date to yyyy-mm-dd
const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
  const day = String(d.getDate()).padStart(2, '0'); // Add leading zero if necessary
  return `${year}-${month}-${day}`;
};