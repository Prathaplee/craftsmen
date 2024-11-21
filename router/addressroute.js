const express = require("express");
const addressController = require("../controllers/addresscontroller");
const authMiddleware = require("../middleware/authmiddleware"); // Adjust the path as necessary


const router = express.Router();

// Define the route for adding an address

router.use(authMiddleware); // This will ensure all routes below this line require authentication


router.post("/add", addressController.addAddressDetails); // Ensure this matches your request
router.get("/", addressController.getAddress);
router.put("/:id", addressController.updateAddress);
router.delete("/:id", addressController.deleteAddress);

router.get("/checkCustomerAddress", addressController.checkCustomerAddress);

module.exports = router;
