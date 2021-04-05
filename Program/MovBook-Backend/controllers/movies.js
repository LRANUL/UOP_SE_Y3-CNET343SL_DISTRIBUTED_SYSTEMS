// Importing model to query from the mongoDB database
const movieWaitLists = require("../models/movie-wait-lists");
const movieModel = require("../models/movies");

// Function - Add new movie under 'WaitListed', 'BASE_URL/api/movies/add-movie-as-wait-listed' 
exports.addMovieAsWaitListed = async (req, res, next) => {

  // Using mongoDB's save() functionality to create a new movie document (object)
  await new movieModel({
    movieStatus: "WaitListed",
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
          "Error - Unable to add movie as 'WaitListed'", error
      });
    }
    else {
      res.status(200).json({
        message:
          "Movie Added As WaitListed",
        returnedData
      });
    }

  })

};

// Function - Add new movie under 'Upcoming', 'BASE_URL/api/movies/add-movie-as-upcoming' 
exports.addMovieAsUpcoming = async (req, res, next) => {

  // Using mongoDB's save() functionality to create a new movie document (object)
  await new movieModel({
    movieStatus: "Upcoming",
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
          "Error - Unable to add movie as 'Upcoming'"
      });
    }
    else {
      res.status(200).json({
        message:
          "Movie Added As Upcoming",
        returnedData
      });
    }

  })

};

// Function - Retrieving movieObjectId (_id) using rout 'BASE_URL/api/movies/movie-id/:movieImdbId'
exports.retrieveMovieObjectId = async (req, res, next) => {

  // Getting passed 'movieImdbId' from the url
  let passedMovieImdbId = req.params.movieImdbId;

  // Using mongoDB's find() functionality to get the movieObjectId (_id) for the passed movieImdbId
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

  // Using mongoDB's findOne() functionality to retrieve one movie document object for the passed movieImdbId
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

// Function - Update movie status using route, 'BASE_URL/api/movies/update-movie-status/:movieImdbId'
exports.updateMovieStatus = async (req, res, next) => {

  // Getting passed movie imdb id
  let passedMovieImdbId = req.params.movieImdbId;

  // Getting passed movie status
  let passedNewMovieStatus = req.body.newMovieStatus;

  // Using mongoDB's findOneAndUpdate() functionality to update movie status
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
