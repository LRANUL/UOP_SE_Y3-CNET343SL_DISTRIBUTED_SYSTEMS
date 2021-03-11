// Importing model to query from the mongoDB database
const movieWaitLists = require("../models/movie-wait-lists");
const movieModel = require("../models/movies");

// Function - Creating a new movie using route, 'BASE_URL/api/movie/'
exports.createNewMovie = async (req, res, next) => {

  // Using mongoDB's save() functionality to create a new movie document (object)
  await new movieModel({
    title: req.body.Title,
    year: req.body.Year,
    rated: req.body.Rated,
    released: req.body.Released,
    runtime: req.body.Runtime,
    genre: req.body.Genre,
    director: req.body.Director,
    writer: req.body.Writer,
    actors: req.body.Actors,
    plot: req.body.Plot,
    language: req.body.Language,
    country: req.body.Country,
    awards: req.body.Awards,
    poster: req.body.Poster,
    ratings: req.body.Ratings,
    metascore: req.body.Metascore,
    imdbRating: req.body.imdbRating,
    imdbVotes: req.body.imdbVotes,
    imdbId: req.body.imdbID,
    type: req.body.Type,
    dvd: req.body.DVD,
    boxOffice: req.body.BoxOffice,
    production: req.body.Production,
    website: req.body.Website
  }).save((error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to create new movie"
      });
    }
    else{

      res.status(200).json({
        message:
          "Created new movie",
        returnedData
      });
    }
  
  })

};

// Function - Retrieving movieObjectId (_id) using rout 'BASE_URL/api/movie/id/:movieImdbId'
exports.retrieveMovieObjectId = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the url
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoDB's find() functionality to get the movieObjectId (_id) for the passed movieImdbId
  await movieModel.find({ imdbId: passedMovieImdbId }, "_id", (error, returnedData) => {

    // If condition - checking whether as error occurred during the query execution
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve movie object ID (_id)",
      });
    }
    else{
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if(returnedData.length == 0){
        res.status(200).json({
          message:
            "Movie not available"
        });
      }
      else{
        res.status(200).json({
          message:
            "Movie object ID (_id) retrieved",
          returnedData
        });
      }
    }

  })

};

// Function - Retrieving movie using route, 'BASE_URL/api/movie/:movieImdbId'
exports.retrieveMovie = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the URL
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoDB's findOne() functionality to retrieve one movie document object for the passed movieImdbId
  await movieModel.findOne({ imdbId: passedMovieImdbId }, (error, returnedData) => {

    // If condition - checking whether as error occurred during the query execution
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve movie",
      });
    }
    else{
      // If condition - checking whether returned data is null (no data is returned)
      // and the relevant message passed to the client-side
      if(returnedData == null){
        res.status(200).json({
          message:
            "Movie not available"
        });
      }
      else{
        res.status(200).json({
          message:
            "Movie retrieved",
          returnedData
        });
      }
    }
  })
}
