const express = require("express");
const router = express.Router();

// Importing showing-movies controller to retrieve the functions
const showingMoviesController = require("../controllers/showing-movies");

// POST - Add new showing movie document | Route: 'BASE_URL/api/showing-movies/add-new-showing-movie'
router.post("/add-new-showing-movie", showingMoviesController.addNewShowingMovie);



module.exports = router;
