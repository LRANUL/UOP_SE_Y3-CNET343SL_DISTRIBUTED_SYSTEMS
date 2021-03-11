const express = require("express");
const router = express.Router();

// Importing upcoming-movie-search-results controller to retrieve the functions
const upcomingMovieSearchResultsController = require("../controllers/upcoming-movie-search-results");

// GET - Get upcoming movie search results according to movie title
// | Route: 'BASE_URL/api/omdb/upcoming-movies/:movieTitle'
router.get('/search/:movieTitle/', upcomingMovieSearchResultsController.searchUpcomingByMovieTitle);

// GET - Get upcoming movie search results according to the movie title and movie release year
// | Route: 'BASE_URL/api/omdb/upcoming-movies/:movieTitle/:movieReleaseYear'
router.get('/search/:movieTitle/:movieReleaseYear', upcomingMovieSearchResultsController.searchUpcomingByMovieTitleMovieReleaseYear);

// GET - Get detailed movie details by passing the movie imdbId
// | Route: 'BASE_URL/api/omdb/upcoming-movies/:movieImdbId'
router.get('/details/:movieImdbId', upcomingMovieSearchResultsController.retrieveMovieDetailsForOneMovie);

module.exports = router;