const express = require("express");
const router = express.Router();

// Importing cinema-locations controller to retrieve the functions
const cinemaLocationsController = require("../controllers/cinema-locations");

// POST - Create new cinema location | Route: 'BASE_URL/api/cinema-locations/'
router.post("/", cinemaLocationsController.createCinemaLocation);

// GET - Getting list of cinema hall details | Route: 'BASE_URL/api/cinema-locations'
router.get("", cinemaLocationsController.retrieveListCinemaLocations);

// GET - Retrieve the count of cinema locations | Route: 'BASE_URL/api/cinema-locations/count'
router.get("/count", cinemaLocationsController.retrieveCinemaLocationsCount);

// PUT - Updating cinema location details
router.put("/update", cinemaLocationsController.updateCinemaLocation);

// DELETE - Delete cinema location details


router.get("/location/:cinemaLocationObjectId", cinemaLocationsController.retrieveCinemaLocation);


router.get("/find/location/:location", cinemaLocationsController.retrieveSpecificCinemaLocation);



module.exports = router;
