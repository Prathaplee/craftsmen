const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Adjust the path based on multerConfig's location

router.post('/upload-profile', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(200).json({
    message: 'Profile image uploaded successfully',
    filePath: req.file.path,
  });
});

module.exports = router;
