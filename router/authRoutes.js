const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authcontroller");

const router = express.Router();

router.post("/register", [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("phone").isMobilePhone().withMessage("Please enter a valid phone number"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
], authController.registerUser);


router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
