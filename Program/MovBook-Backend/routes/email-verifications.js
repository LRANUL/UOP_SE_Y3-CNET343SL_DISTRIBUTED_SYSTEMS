const express = require("express");
const router = express.Router();

// Importing email-verifications controller to retrieve the functions
const emailVerificationsController = require("../controllers/email-verifications");

// POST - Add new email verification | Route: 'BASE_URL/api/email-verifications/create'
router.post("/create", emailVerificationsController.createNewEmailVerification);

// GET - Verifying authentication pin code | 
// Route: 'BASE_URL/api/email-verifications/verify?:emailVerificationObjectId&:enteredVerificationPinCode'
router.get("/verify/:emailVerificationObjectId/:enteredVerificationPinCode", emailVerificationsController.verifyEmailAddress);


module.exports = router;
