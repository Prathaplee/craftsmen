
const SavingsSchemeSubscriber = require("../model/savingsschemesubscriber"); // Import model
const Address = require("../model/address");
const User = require("../model/user.js");
// Create Savings Scheme Subscriber
  
exports.createSavingsSchemeSubscriber = async (req, res) => {
  const { aadharNo, panNo, amount, aadharImageUrl, panImageUrl, schemeId } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user is ", user);
    const address = user.address;
    console.log("Address check", address);

    const savingsschemesubscriber = await SavingsSchemeSubscriber.create({
      user, address, aadharNo, panNo, aadharImageUrl, panImageUrl, amount ,schemeId
    })

    const subscriber = await SavingsSchemeSubscriber.findById(savingsschemesubscriber._id)
    // if (!address) {
    //   // Log to verify that no address exists
    //   console.log("No address found for user, checking for provided addressDetails...");

    //   // If no address exists and addressDetails are provided, create a new address
    //   if (addressDetails) {
    //     console.log("Address details found in request, creating new address...");
        
    //     address = await Address.create({
    //       user: userId,
    //       landmark: addressDetails.landmark,
    //       pincode: addressDetails.pincode,
    //       city: addressDetails.city,
    //       state: addressDetails.state,
    //       country: addressDetails.country
    //     });

    //     // Link the new address to the user profile
    //     user.address = address._id;
    //     await user.save();

    //     console.log("New address created and linked to user:", address);
    //   } else {
    //     // If no address and no addressDetails, return an error
    //     return res.status(400).json({
    //       message: "No existing address found and no address details provided."
    //     });
    //   }
    // } else {
    //   console.log("Using existing address linked to user:", address);
    // }

    // // Create the Savings Scheme Subscriber using the existing or new address
    // const savingsSchemeSubscriber = await SavingsSchemeSubscriber.create({
    //   user: userId,
    //   address: address._id,
    //   aadharNo,
    //   panNo,
    //   aadharImageUrl,
    //   panImageUrl,
    //   amount,
    //   scheme: schemeId,
    // });

    res.status(200).json({
      message: "Scheme subscribed successfully",
      subscriberId: subscriber._id,
    });
  } catch (error) {
    console.error("Error creating subscriber:", error);
    res.status(500).json({ message: "Failed to create Savings Scheme Subscriber", error: error.message });
  }
};




exports.getSchemeDetails = async (req, res) => {
  const { subscriberId } = req.params;

  try {
    console.log("Subscriber ID:", subscriberId); // Log the subscriber ID

    const subscriber = await SavingsSchemeSubscriber.findById(subscriberId)
      .populate('user', 'name email')
      .populate('address')
      .populate('scheme', 'name duration duedate');  // Populating the correct fields
      console.log(subscriber);

    if (!subscriber) {
      console.log("Subscriber not found");
      return res.status(404).json({ message: "Subscriber not found" });
    }

  

    res.status(200).json({
      subscriberId: subscriber._id,
      user: subscriber.user,
      address: subscriber.address,    
      schemeDetails: {
        schemeName: subscriber.schemeName, // Access scheme name
        amount: subscriber.amount,
        subscribedDate: subscriber.subscribedDate,
        nextDueDate: subscriber.nextDueDate, // Use 'duedate' as the field name from Scheme
        duration: subscriber.duration, // Use 'duration' as the field name from Scheme
        status: subscriber.status,
      },
    });
  } catch (error) {
    console.error("Error fetching scheme details:", error);
    res.status(500).json({ message: "Failed to fetch scheme details", error: error.message });
  }
};

// controllers/savingsSchemeController.js

// Update Approval Status
exports.updateApprovalStatus = async (req, res) => {
  const { subscriberId } = req.params;
  const { status } = req.body; // e.g., "approved"

  try {
    const subscriber = await SavingsSchemeSubscriber.findById(subscriberId);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    // Update status
    subscriber.status = status;
    await subscriber.save();

    res.status(200).json({ message: `Status updated to ${status}`, subscriber });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};
