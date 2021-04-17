// Importing model to query from the mongoDB database
const movieWaitLists = require("../models/movie-wait-lists");
const movieModel = require("../models/movies");

// Function - Add new movie in the relevant movie status, 'BASE_URL/api/movies/add-movie/:movieStatus'
exports.addMovie = async (req, res, next) => {

  // Retrieving the movie status
  let passedMovieStatus = req.params.movieStatus;

  // Using mongoose save() functionality to create a new movie document (object)
  await new movieModel({
    movieStatus: passedMovieStatus,
    movieTitle: req.body.Title,
    rated: req.body.Rated,
    releasedYear: req.body.Year,
    releasedDate: req.body.Released,
    movieRuntime: req.body.Runtime,
    genre: req.body.Genre,
    director: req.body.Director,
    writer: req.body.Writer,
    actors: req.body.Actors,
    plot: req.body.Plot,
    language: req.body.Language,
    country: req.body.Country,
    awards: req.body.Awards,
    posterLink: req.body.Poster,
    ratings: [
      {
        source: req.body.Ratings.Source,
        value: req.body.Ratings.Value
      }
    ],
    imdb: {
      imdbId: req.body.imdbID,
      imdbVotes: req.body.imdbVotes,
      imdbRating: req.body.imdbRating
    },
    boxOffice: req.body.BoxOffice,
    production: req.body.Production,
    website: req.body.Website
  }).save((error, returnedData) => {

    if (error) {
      res.status(500).json({
        message:
          `Error - Unable to add movie as ${passedMovieStatus}`, error
      });
    }
    else {
      res.status(200).json({
        message:
          `Movie Added As ${passedMovieStatus}`,
        returnedData
      });
    }

  })

};

// Function - Retrieving movieObjectId (_id) using rout 'BASE_URL/api/movies/movie-id/:movieImdbId'
exports.retrieveMovieObjectId = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the url
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoose find() functionality to get the movieObjectId (_id) for the passed movieImdbId
  await movieModel.find({ 'imdb.imdbId': passedMovieImdbId }, "_id", (error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve movie object ID (_id)",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "Movie not available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Movie object ID (_id) retrieved",
          returnedData
        });
      }
    }

  })

};

// Function - Retrieving movie using route, 'BASE_URL/api/movies/movie-details/:movieImdbId'
exports.retrieveMovie = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the URL
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoose findOne() functionality to retrieve one movie document object for the passed movieImdbId
  await movieModel.findOne({ 'imdb.imdbId': passedMovieImdbId }, (error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve movie",
      });
    }
    else {
      // If condition - checking whether returned data is null (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData == null) {
        res.status(200).json({
          message:
            "Movie not available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Movie retrieved",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieve all movie under a particular movie status using route, 'BASE_URL/api/movies/movie-status/:movieStatus'
exports.retrieveAllMoviesAsStatus = async (req, res, next) => {

  // Getting passed 'movieStatus' from the url
  let passedMovieStatus = req.params.movieStatus;

  // Using mongoose find() functionality to get the movies for the passed movie status
  await movieModel.find({ movieStatus: passedMovieStatus }, (error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve movies",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No movies available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Movies retrieved",
          returnedData
        });
      }
    }

  })

};

// Function - Retrieve five latest movies using route, 'BASE_URL/api/movies/latest-movies/top-five'
exports.retrieveLatestMovies = async (req, res, next) => {
  // Using mongoose find() functionality to get the latest five movies
  await movieModel.find({}).sort({releasedDate: "descending"}).limit(5).exec((error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve latest movies",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No movies available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Latest movies retrieved",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieving the count of movies for a particular movie status using route,
// 'BASE_URL/api/movies/count/:movieStatus'
exports.retrieveMoviesCountByStatus = async (req, res, next) => {

  // Getting passed movie status
  let passedMovieStatus = req.params.movieStatus;

  // Using mongoose find() and count() functionalities to get the count of movies under a movie status
  await movieModel.find({ "movieStatus": passedMovieStatus }).count().exec((error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve count of movies",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No movies available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Count of movies retrieved",
          returnedData
        });
      }
    }
  })
};

// Function - Update movie status using route, 'BASE_URL/api/movies/update-movie-status'
exports.updateMovieStatus = async (req, res, next) => {

  // Getting passed movie status
  let passedNewMovieStatus = req.body.newMovieStatus;

  // Getting passed movie imdb id
  let passedMovieImdbId = req.body.movieImdbId;

  // Using mongoose findOneAndUpdate() functionality to update movie status
  await movieModel.findOneAndUpdate(
    {
      'imdb.imdbId': passedMovieImdbId
    },
    {
      movieStatus: passedNewMovieStatus
    }, (error, returnedData) => {

      // If condition - checking whether an error occurred during the query execution
      if (error) {
        res.status(500).json({
          message:
            "Unable to update movie status",
        });
      }
      else {
        res.status(200).json({
          message:
            "Movie status updated",
          returnedData
        });
      }
    })
    
};

// Function - Delete movie | Route: 'BASE_URL/api/movies/remove-movie/:movieImdbId'
exports.removeMovie = async (req, res, next) => {

  // Getting passed movieImdbId
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoose findByIdAndDelete() functionality to remove the movie according to the passed movieImdbId
  await movieModel.deleteOne({ 'imdb.imdbId': passedMovieImdbId }, (error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to remove movie",
      });
    }
    else {
      res.status(200).json({
        message:
          "Movie removed",
        returnedData
      });
    }

  })

};
