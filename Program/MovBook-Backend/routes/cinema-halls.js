const express = require("express");
const router = express.Router();

// Importing cinema-hall controller to retrieve the functions
const cinemaHallController = require("../controllers/cinema-halls");

// POST - Create new cinema hall | Route: 'BASE_URL/api/cinema-hall/'
router.post("/", cinemaHallController.createCinemaHall);

// GET - Getting cinema hall details


// PUT - Updating cinema hall details


// DELETE - Delete cinema hall details


module.exports = router;