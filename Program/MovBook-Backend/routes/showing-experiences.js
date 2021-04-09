const express = require("express");
const router = express.Router();

// Importing showing-experiences controller to retrieve the functions
const cinemaLocationsController = require("../controllers/showing-experiences");

// POST - Create new showing experience | Route: 'BASE_URL/api/showing-experiences'
router.post("", cinemaLocationsController.createShowingExperience);

// GET - Getting list of showing experience details | Route: 'BASE_URL/api/showing-experiences/'
router.get("/", cinemaLocationsController.retrieveListOfShowingExperiences);

// PUT - Updating showing experience details | Route: 'BASE_URL/api/showing-experiences/update'
router.put("/update", cinemaLocationsController.updateShowingExperience);

// DELETE - Delete showing experience details


module.exports = router;
