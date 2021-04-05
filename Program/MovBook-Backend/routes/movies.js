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

// POST - Add new movie under 'WaitListed' | Route: 'BASE_URL/api/movies/add-movie-as-wait-listed'
router.post("/add-movie-as-wait-listed", movieController.addMovieAsWaitListed);

// POST - Add new movie under 'WaitListed' | Route: 'BASE_URL/api/movies/add-movie-as-upcoming'
router.post("/add-movie-as-upcoming", movieController.addMovieAsUpcoming);

// GET - Retrieve movie | Route: 'BASE_URL/api/movies/movie-id/:movieImdbId'
router.get("/movie-id/:movieImdbId", movieController.retrieveMovieObjectId);

// GET - Retrieve movie | Route: 'BASE_URL/api/movies/movie-details/:movieImdbId'
router.get("/movie-details/:movieImdbId", movieController.retrieveMovie);

// PUT - Update movie status | Route: 'BASE_URL/api/movies/update-movie-status/:movieImdbId'
router.put("/update-movie-status/:movieImdbId", movieController.updateMovieStatus);

module.exports = router;
