const express = require("express");
const multer = require("multer"); // Import multer
const schemeController = require("../controllers/schemecontroller");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the folder to save the uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Use a unique name for the file
    }
});

const upload = multer({ storage: storage }); // Create the upload middleware

router.get("/diamond", schemeController.listDiamondSchemes);  // Endpoint for diamond schemes
router.get("/gold", schemeController.listGoldSchemes);        // Endpoint for gold schemes
// router.get("/list", schemeController.listSchemes);
router.get("/:id", schemeController.getSchemeById);
router.post("/subscribe", schemeController.subscribeScheme);
router.get("/subscriptions/:userId", schemeController.getUserSubscriptions);
// In your routes file
router.get('/schemes/:type', schemeController.getSchemeByType);

router.post("/upload", upload.single('image'), schemeController.uploadSchemeImage); // Change 'image' to the expected field name


module.exports = router;
