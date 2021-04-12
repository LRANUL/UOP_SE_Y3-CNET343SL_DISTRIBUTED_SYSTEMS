const express = require("express");
const router = express.Router();

// Importing showing-cinema-halls controller to retrieve the functions
const showingCinemaHallsController = require("../controllers/showing-cinema-halls");

// POST - Assigning showing cinema hall(s) for the showing movie | Route: 'BASE_URL/api/showing-cinema-halls/assign-showing-cinema-hall'
router.post("/assign-showing-cinema-hall", showingCinemaHallsController.assignShowingCinemaHall);

/** DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS */
// PUT - Update showing cinema hall(s) | Route: 'BASE_URL/api/showing-cinema-halls/update-showing-cinema-hall'
router.put("/update-showing-cinema-hall", showingCinemaHallsController.updateShowingCinemaHall);


module.exports = router;
