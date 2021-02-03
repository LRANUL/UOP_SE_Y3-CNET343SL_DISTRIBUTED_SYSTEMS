const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

// GET - Get upcoming movie search results according to movie title
router.get('/:movieTitle/', async (req,res,next)=>{
  const movieTitle = req.params['movieTitle'];
  const omdbAPIURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${movieTitle}&type=movie`;
  const responseData = await fetch(omdbAPIURL);
  const responseDataJSON = await responseData.json();
  res.json(responseDataJSON);
});

// GET - Get upcoming movie search results according to the movie title and movie release year
router.get('/:movieTitle/:movieReleaseYear', async (req,res,next)=>{
  const movieTitle = req.params['movieTitle'];
  const movieReleaseYear = req.params['movieReleaseYear'];
  const omdbAPIURL = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${movieTitle}&y=${movieReleaseYear}&type=movie`;
  const responseData = await fetch(omdbAPIURL);
  const responseDataJSON = await responseData.json();
  res.json(responseDataJSON);
});

module.exports = router;