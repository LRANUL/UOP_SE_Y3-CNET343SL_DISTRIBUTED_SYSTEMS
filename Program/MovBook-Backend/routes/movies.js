const express = require("express");
const router = express.Router();

// Importing cinema-halls controller to retrieve the functions
const movieController = require("../controllers/movies");
const movieModel = require("../models/movies");

//Get - All the movies
router.get('',(req,res,next)=>{
    movieModel.find()
    .then((returnedData)=>{
    console.log(returnedData)
      if(returnedData)
    {
      res.status(200).json({
        message: "Movie details Obtained",
        returnedData
      })
    }else
    {
      res.status(404).json({
        message: "The was a issue obtaining movie details"
      })
    } 
    }).catch(err => {
     console.log(err);
    })
});

//Get - Get one movie
router.get("/:movieId",(req,res,next)=>{
    movieModel.findById(req.params.movieId)
    .then((returnedData)=>{
      if(returnedData)
    {
      res.status(200).json({
        message: "Movie details Obtained",
        returnedData
      })
    }else
    {
      res.status(404).json({
        message: "The was a issue obtaining movie details"
      })
    } 
    }).catch(err => {
     console.log(err);
    })
});

// POST - Add new movie under the relevant movie status | Route: 'BASE_URL/api/movies/add-movie/:movieStatus'
router.post("/add-movie/:movieStatus", movieController.addMovie);

// GET - Retrieve movie object ID | Route: 'BASE_URL/api/movies/movie-id/:movieImdbId'
router.get("/movie-id/:movieImdbId", movieController.retrieveMovieObjectId);

// GET - Retrieve movie details | Route: 'BASE_URL/api/movies/movie-details/:movieImdbId'
router.get("/movie-details/:movieImdbId", movieController.retrieveMovie);

// GET - Retrieve all movie according to the movie status | Route: 'BASE_URL/api/movies/movie-status/:movieStatus'
router.get("/movie-status/:movieStatus", movieController.retrieveAllMoviesAsStatus);

// GET - Retrieve five movie according to the latest date | Route: 'BASE_URL/api/movies/latest-movies/top-five'
router.get("/latest-movies/top-five", movieController.retrieveLatestMovies);

// GET - Retrieve the count of movies for a particular movie status | Route: 'BASE_URL/api/movies/movie-status/count/:movieStatus'
router.get("/movie-status/count/:movieStatus", movieController.retrieveMoviesCountByStatus);

// PUT - Update movie status | Route: 'BASE_URL/api/movies/update-movie-status'
router.put("/update-movie-status", movieController.updateMovieStatus);

// DELETE - Delete movie | Route: 'BASE_URL/api/movies/remove-movie/:movieImdbId'
router.delete("/remove-movie/:movieImdbId", movieController.removeMovie);

module.exports = router;
