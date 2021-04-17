const express = require("express");
const router = express.Router();

// Importing email-verifications controller to retrieve the functions
const emailVerificationsController = require("../controllers/email-verifications");

// POST - Add new email verification | Route: 'BASE_URL/api/email-verifications/create'
router.post("/create", emailVerificationsController.createNewEmailVerification);

// GET - Retrieve email verification to verify | Route: 'BASE_URL/api/cinema-locations/verify'
//router.get("/verify", emailVerificationsController.verifyEmailAddress);


module.exports = router;
