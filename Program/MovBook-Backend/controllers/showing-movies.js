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

// Function - Check availability of movie showing using route, 'BASE_URL/api/showing-movies/check-showing-movie-availability'
exports.checkShowingMovieAvailability = async (req, res, next) => {
  await showingMovieModel.find({
    $and: [
      {
        "cinemaLocation.cinemaLocationObjectId": req.body.cinemaLocationObjectId
      },
      {
        "cinemaHallObjectId": req.body.cinemaHallObjectId
      },
      {
        "movieObjectId": req.body.movieObjectId
      },
      {
        "showingStartDate": req.body.showingStartDate
      },
      {
        "showingEndDate": req.body.showingEndDate
      }
    ]
  }).exec((error, returnedData) => {
    if (error) {
      res.status(500).json({
        message:
          "Unable to check availability of showing movies"
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No showing movie available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Showing movie available",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieving movie wait list using route, 'BASE_URL/api/showing-movies/by-movie-object-id/:movieObjectId'
exports.getShowingMovieByMovieObjectId = async (req, res, next) => {
  // Getting passed 'movieObjectId' from the URL
  let movieObjectId = req.params.movieObjectId;

  // Using mongoose find() functionality to retrieve showing movie for movieObjectId
  await showingMovieModel.find({ 'movieObjectId': movieObjectId }, (error, returnedData) => {
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve showing movie",
      });
    }
    else{
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if(returnedData.length == 0){
        res.status(404).json({
          message:
            "No showing movie available"
        });
      }
      else{
        res.status(200).json({
          message:
            "Showing movie retrieved",
          returnedData
        });
      }
    }
  })
};

exports.getShowingMovieByMovieId = async (req, res, next) => {
  await showingMovieModel.find({movieObjectId: req.params.id})
      .then((data)=>{
        if(data)
      {
        res.status(200).json({
          message: "It works",
          tickets: data
        })
      }else
      {
        res.status(404).json({
          message: "The user does not exist"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
};

exports.getShowingMovieByShowingId = async (req, res, next) => {
  await showingMovieModel.findById(req.params.showingId)
      .then((data)=>{
        if(data)
      {
        res.status(200).json({
          message: "It works",
          tickets: data
        })
      }else
      {
        res.status(404).json({
          message: "The user does not exist"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
};
