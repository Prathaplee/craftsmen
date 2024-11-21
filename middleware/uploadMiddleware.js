const multer = require('multer');
const path = require('path');
const mime = require('mime-types');


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads/profiles' exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const mimeType = mime.extension(file.mimetype);
    const extName = allowedFileTypes.test(file.originalname.toLowerCase());

    console.log('Extension Valid:', extName);
    console.log('MIME Type:', mimeType);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error(`Invalid file type: ${file.originalname}`));
    }
};


// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 8 * 1024 * 1024 }, // Limit to 8MB
});

module.exports = upload;
