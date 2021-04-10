const express = require("express");
const router = express.Router();

// Importing showing-experiences controller to retrieve the functions
const showingExperiencesController = require("../controllers/showing-experiences");

// POST - Create new showing experience | Route: 'BASE_URL/api/showing-experiences'
router.post("", showingExperiencesController.createShowingExperience);

// GET - Getting list of showing experience details | Route: 'BASE_URL/api/showing-experiences/'
router.get("/", showingExperiencesController.retrieveListOfShowingExperiences);

// PUT - Updating showing experience details | Route: 'BASE_URL/api/showing-experiences/update'
router.put("/update", showingExperiencesController.updateShowingExperience);

// DELETE - Delete showing experience details | Route: 'BASE_URL/api/showing-experiences/delete/:showingExperienceId'
router.delete("/delete/:showingExperienceId", showingExperiencesController.deleteShowingExperience);

module.exports = router;
