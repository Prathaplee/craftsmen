const User = require("../model/user"); // Import the User model
const Upload = require("../model/upload"); // Import the Upload model

// Upload Profile Image
exports.uploadProfileImage = (req, res) => {
  upload.single('profileImage')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      // Get the file path from the uploaded file
      const filePath = req.file.path;

      // Update the user's profile with the image file path
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.profileImage = filePath; // Store the image path in the user document
      await user.save();

      // Optionally, save the upload details in the Upload collection
      const newUpload = new Upload({ filePath: filePath });
      await newUpload.save();

      res.status(200).json({
        message: 'Profile image uploaded successfully',
        filePath: filePath, // Send back the file path
      });
    } catch (error) {
      console.error('Error uploading profile image:', error);
      res.status(500).json({ message: 'Failed to upload profile image', error: error.message });
    }
  });
};
