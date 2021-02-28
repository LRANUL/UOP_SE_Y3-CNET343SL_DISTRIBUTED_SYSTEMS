// Importing model to query from the mongoDB database
const movieWaitLists = require("../models/movie-wait-lists");
const movieModel = require("../models/movies");

// Function - Creating a new movie using route, 'BASE_URL/api/movie/'
exports.createNewMovie = async (req, res, next) => {console.log(req.body);
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


// Function - Retrieving movie using route, 'BASE_URL/api/movie/:movieImdbId'
exports.retrieveMovie = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the URL
  let passedMovieImdbDb = req.params.movieImdbId;

  await movieModel.find({ imdbID: passedMovieImdbDb }, (error, returnedData) => {

    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve movie",
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
            "Movie retrieved",
          returnedData
        });
      }
    }

  })

};
