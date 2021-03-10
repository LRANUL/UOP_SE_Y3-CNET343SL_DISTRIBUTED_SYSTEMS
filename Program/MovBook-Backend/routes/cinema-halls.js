const express = require("express");
const router = express.Router();

// Importing cinema-halls controller to retrieve the functions
const cinemaHallsController = require("../controllers/cinema-halls");

// POST - Create new cinema hall | Route: 'BASE_URL/api/cinema-halls/'
router.post("/", cinemaHallsController.createCinemaHall);

// GET - Getting list of cinema hall details | Route: 'BASE_URL/api/cinema-halls/:cinemaLocationObjectId'
router.get("/:cinemaLocationObjectId", cinemaHallsController.retrieveCinemaHalls)

// GET - Getting one cinema hall details
router.get("/hall/:cinemaLocationObjectId", cinemaHallsController.retrieveCinemaHall)

// PUT - Updating cinema hall details


// DELETE - Delete cinema hall details


module.exports = router;