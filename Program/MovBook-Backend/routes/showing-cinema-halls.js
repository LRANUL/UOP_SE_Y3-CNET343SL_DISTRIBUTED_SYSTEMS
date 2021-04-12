const express = require("express");
const router = express.Router();

// Importing showing-cinema-halls controller to retrieve the functions
const showingCinemaHallsController = require("../controllers/showing-cinema-halls");

// POST - Assigning showing cinema hall(s) for the showing movie | Route: 'BASE_URL/api/showing-cinema-halls/assign-showing-cinema-hall'
router.post("/assign-showing-cinema-hall", showingCinemaHallsController.assignShowingCinemaHall);



module.exports = router;
