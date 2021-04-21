const express = require("express");
const router = express.Router();

// Importing cinema-halls controller to retrieve the functions
const cinemaHallsController = require("../controllers/cinema-halls");

// POST - Create new cinema hall | Route: 'BASE_URL/api/cinema-halls/'
router.post("/", cinemaHallsController.createCinemaHall);

// GET - Getting list of cinema hall details | Route: 'BASE_URL/api/cinema-halls/:cinemaLocationObjectId'
router.get("/:cinemaLocationObjectId", cinemaHallsController.retrieveCinemaHalls)

// GET - Getting one cinema hall details | Route: 'BASE_URL/api/cinema-halls/halls/:id'
router.get("/hall/:id", cinemaHallsController.retrieveCinemaHall)

// GET - Retrieve the count of cinema halls | Route: 'BASE_URL/api/cinema-halls/count/cinema-halls'
router.get("/count/cinema-halls", cinemaHallsController.retrieveCinemaHallsCount);

// PUT - Updating cinema hall details | Route: 'BASE_URL/api/cinema-halls/update-cinema-hall'
router.put("/update-cinema-hall", cinemaHallsController.updateCinemaHallDetails);

// DELETE - Delete cinema hall details | Route: 'BASE_URL/api/cinema-halls/remove-hall/:cinemaHallObjectId'
router.delete("/remove-hall/:cinemaHallObjectId", cinemaHallsController.removeCinemaHall);

module.exports = router;
