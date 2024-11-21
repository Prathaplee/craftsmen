// controllers/schemeController.js
const Scheme = require("../model/scheme");
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const Upload = require("../model/upload"); // Import the Upload model

exports.listDiamondSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find({ category: "diamond" });
    const schemesWithSavingsId = schemes.map(scheme => ({
      ...scheme.toObject(),
      savings_scheme_id: `${scheme._id}`,
      pricePerCarat: scheme.diamondPricePerCarat,  // Adding the price per carat for diamonds

    }));

    res.json(schemesWithSavingsId);
    res.json(schemes);
  } catch (error) {
    next(error);
  }
};
// In schemecontroller.js
exports.getSchemeById = async (req, res) => {
  try {
    const scheme = await Scheme.findById(req.params.id);
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving scheme" });
  }
};

exports.listGoldSchemes = async (req, res, next) => {
  try {
    const schemes = await Scheme.find({ category: "gold" });
    const schemesWithSavingsId = schemes.map(scheme => ({
      ...scheme.toObject(),
      savings_scheme_id: `${scheme._id}`
    }));

    res.json(schemesWithSavingsId);
    }
     catch (error) {
    next(error);
  }
};

// In schemecontroller.js
exports.getSchemeByType = async (req, res) => {
  try {
    const schemeType = req.params.type; // e.g., 'savings', 'diamond'
    const schemes = await Scheme.find({ type: schemeType }); // Adjust this line if your field is named differently
    res.json(schemes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listSavingsSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find({ category: 'savings' }).select('name image duration dueDate');
      // Add savings_scheme_id for each scheme
      const schemesWithIds = schemes.map(scheme => ({
        ...scheme.toObject(),
        savings_scheme_id: `SAV-${scheme._id}` // Or any custom format
      }));
    res.status(200).json(schemesWithIds);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving savings schemes" });
  }
};
exports.subscribeScheme = async (req, res) => {
  const { userId, schemeId, amount } = req.body;
  try {
    const subscription = new Subscription({ userId, schemeId, amount });
    await subscription.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Subscription failed" });
  }
};

exports.uploadSchemeImage = async (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send("No file uploaded.");
    }

    // Create a new Upload document with only the file path
    const newUpload = new Upload({
        filePath: file.path  // Store the file path in the Upload collection
    });

    try {
        await newUpload.save(); // Save only the file info to MongoDB
        res.status(200).send("File uploaded and file path saved to MongoDB.");
    } catch (error) {
        res.status(500).send("Error saving to database.");
    }
};




exports.addAddress = async (req, res) => {
  const { userId, addressLine, city, postalCode, country } = req.body;
  try {
    const address = new Address({ userId, addressLine, city, postalCode, country });
    await address.save();
    res.status(201).json({ message: "Address added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add address" });
  }
};
exports.getUserSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ userId: req.params.userId });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscriptions" });
  }
};

