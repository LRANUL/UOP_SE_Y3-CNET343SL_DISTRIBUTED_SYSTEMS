const express = require("express");
const router = express.Router();

// Importing showing-movies controller to retrieve the functions
const showingMoviesController = require("../controllers/showing-movies");

// POST - Add new showing movie document | Route: 'BASE_URL/api/showing-movies/add-new-showing-movie'
router.post("/add-new-showing-movie", showingMoviesController.addNewShowingMovie);

// GET - Check availability of existing data | Route: 'BASE_URL/api/showing-movies/check-showing-movie-availability'
router.post("/check-showing-movie-availability", showingMoviesController.checkShowingMovieAvailability);

router.get("/:id", showingMoviesController.getShowingMovieByMovieId); 

router.get("/id/:showingId", showingMoviesController.getShowingMovieByShowingId);

module.exports = router;
