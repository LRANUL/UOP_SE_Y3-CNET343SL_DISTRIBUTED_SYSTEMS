// Importing model to query from the mongoDB database
const showingMovieModel = require("../models/showing-movies");

// Function - Add new movie in the relevant movie status, 'BASE_URL/api/showing-movies/add-new-showing-movie'
exports.addNewShowingMovie = async (req, res, next) => {

  // Using mongoose save() functionality to create a new showing movie document (object)
  await new showingMovieModel({
    movieObjectId: req.body.movieObjectId,
    cinemaHallObjectId: req.body.cinemaHallObjectId,
    cinemaLocation: {
      cinemaLocationObjectId: req.body.cinemaLocation.cinemaLocationObjectId,
      cinemaLocationName: req.body.cinemaLocation.cinemaLocationName,
      cinemaLocationAddress: {
        streetAddress: req.body.cinemaLocation.cinemaLocationAddress.streetAddress,
        city: req.body.cinemaLocation.cinemaLocationAddress.city,
        postalCode: req.body.cinemaLocation.cinemaLocationAddress.postalCode
      }
    },
    showingStartDate: req.body.showingStartDate,
    showingEndDate: req.body.showingEndDate,
    showingSlots: req.body.showingSlots
  }).save((error, returnedData) => {
  
    if (error) {
      res.status(500).json({
        message:
          "Error - Unable to add showing movie", error
      });
    }
    else {
      res.status(200).json({
        message:
          "Showing movie added",
        returnedData
      });
    }

  })

};
