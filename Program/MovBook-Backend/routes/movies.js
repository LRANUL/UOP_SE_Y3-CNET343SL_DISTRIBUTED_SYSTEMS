const express = require("express");
const router = express.Router();

// Importing cinema-halls controller to retrieve the functions
const movieController = require("../controllers/movies");

// POST - Create new cinema hall | Route: 'BASE_URL/api/movies/'
router.post("/", movieController.createNewMovie);

// GET - Retrieve movie | Route: 'BASE_URL/api/movies/:movieImdbId'
router.get("/:movieImdbDd", movieController.retrieveMovie);


module.exports = router;