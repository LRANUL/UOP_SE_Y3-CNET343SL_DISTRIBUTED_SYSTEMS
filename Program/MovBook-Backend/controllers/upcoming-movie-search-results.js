const fetch = require("node-fetch");

// Function - Search Upcoming Movie by Movie Title using route, 'BASE_URL/api/omdb/upcoming-movies/search/:movieTitle'
exports.searchUpcomingByMovieTitle = async (req, res, next) => {
  const movieTitle = req.params['movieTitle'];
  const omdbAPIURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${movieTitle}&type=movie`;
  const responseData = await fetch(omdbAPIURL);
  const responseDataJSON = await responseData.json();
  res.json(responseDataJSON);
};

// Function - Search Upcoming Movie by Movie Title and Movie Release Year using route, 'BASE_URL/api/omdb/upcoming-movies/:movieTitle/search/:movieReleaseYear'
exports.searchUpcomingByMovieTitleMovieReleaseYear = async (req, res, next) => {
  const movieTitle = req.params['movieTitle'];
  const movieReleaseYear = req.params['movieReleaseYear'];
  const omdbAPIURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${movieTitle}&y=${movieReleaseYear}&type=movie`;
  const responseData = await fetch(omdbAPIURL);
  const responseDataJSON = await responseData.json();
  res.json(responseDataJSON);
};

// Function - Retrieving detailed movie details for one movie using route, 'BASE_URL/api/omdb/upcoming-movies/details/:movieImdbId'
exports.retrieveMovieDetailsForOneMovie = async (req, res, next) => {
  const movieImdbId = req.params['movieImdbId'];
  const omdbAPIURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${movieImdbId}`;
  const responseData = await fetch(omdbAPIURL);
  const responseDataJSON = await responseData.json();
  res.json(responseDataJSON); 
};
