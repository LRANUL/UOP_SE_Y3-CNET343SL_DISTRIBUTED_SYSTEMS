const express = require("express");
const router = express.Router();

// Importing cinema-locations controller to retrieve the functions
const cinemaLocationsController = require("../controllers/cinema-locations");

// POST - Create new cinema location | Route: 'BASE_URL/api/cinema-location/'
router.post("/", cinemaLocationsController.createCinemaLocation);

// GET - Getting cinema hall details


// PUT - Updating cinema hall details


// DELETE - Delete cinema hall details


module.exports = router;