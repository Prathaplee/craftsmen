const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { validationResult } = require("express-validator");
const sendEmail = require("../utils/sendEmail");
const SavingsSchemeSubscriber = require("../model/savingsschemesubscriber");


exports.registerUser = async (req, res) => {
  const { phone, name, email, password } = req.body;  // Include password

  try {
    // Check if the phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

    // Create a new user with the hashed password
    const user = new User({ phone, name, email, password: hashedPassword });  // Add password here
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });

    const latestSubscriber = await SavingsSchemeSubscriber.findOne({ user: user._id })
      .sort({ subscribedDate: -1 }) // Sort by date to get the latest subscription
      .select("_id"); // Only retrieve the ID


    // res.cookie().json({ token }); // Respond with the token?
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id, // Include user ID here
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
      latestSubscriberId: latestSubscriber ? latestSubscriber._id : null, // Return subscriber ID or null if none exists

    });
  } catch (error) {
    // Handle any other errors
    console.error("Login error:", error); // Log the error for debugging
    res.status(500).json({ message: "Login failed", error: error.message }); // Use 'error' instead of 'err'
  }
};


// exports.login = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ token }); // Send the token back to the client
//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         name: user.name,
//         phone: user.phone,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.RESET_PASSWORD_SECRET, { expiresIn: "15m" });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendEmail(email, "Password Reset Request", `Reset your password: ${resetUrl}`);

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.RESET_PASSWORD_SECRET);
    const user = await User.findOne({ _id: decoded.id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
