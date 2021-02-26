const express = require("express");
const router = express.Router();

// Importing cinema-locations controller to retrieve the functions
const cinemaLocationsController = require("../controllers/cinema-locations");

// POST - Create new cinema location | Route: 'BASE_URL/api/cinema-locations/'
router.post("/", cinemaLocationsController.createCinemaLocation);

// GET - Getting list of cinema hall details | Route: 'BASE_URL/api/cinema-locations'
router.get("", cinemaLocationsController.retrieveListCinemaLocations)

// GET - Getting one cinema hall details


// PUT - Updating cinema hall details


// DELETE - Delete cinema hall details


module.exports = router;