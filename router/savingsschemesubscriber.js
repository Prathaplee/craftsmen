// routes/savingsSchemeSubscriber.js
const express = require("express");
const savingsSchemeSubscriberController = require("../controllers/savingsschemesubscribercontroller");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router();

// Use the authentication middleware
router.use(authMiddleware);

// Define the route for creating a savings scheme subscriber
router.post("/create", savingsSchemeSubscriberController.createSavingsSchemeSubscriber);

router.get('/scheme-details/:userId', savingsSchemeSubscriberController.getSchemeDetails);



// router.put('/api/savings-schemes/update-approval-status/:subscriberId', savingsSchemeSubscriberController.updateApprovalStatus);
router.put('/update-approval-status/:subscriberId', savingsSchemeSubscriberController.updateApprovalStatus);


module.exports = router;
