const express = require('express');
const router = express.Router();
const { uploadProfileImage } = require('../controllers/usercontroller'); // Import the controller

// Route to upload profile image
router.post('/uploadProfileImage', uploadProfileImage);

module.exports = router;
