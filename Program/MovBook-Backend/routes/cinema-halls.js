const express = require("express");
const router = express.Router();

// Importing cinema-halls controller to retrieve the functions
const cinemaHallsController = require("../controllers/cinema-halls");

// POST - Create new cinema hall | Route: 'BASE_URL/api/cinema-hall/'
router.post("/", cinemaHallsController.createCinemaHall);

// GET - Getting cinema hall details


// PUT - Updating cinema hall details


// DELETE - Delete cinema hall details


module.exports = router;