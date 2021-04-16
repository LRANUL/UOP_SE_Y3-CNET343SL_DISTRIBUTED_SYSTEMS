// Importing model to query from the mongoDB database
const cinemaHallModel = require("../models/cinema-halls");


// Function - Inserting new cinema hall using route, 'BASE_URL/api/cinema-hall/'
exports.createCinemaHall = async (req, res, next) => {

  // Using mongoose save functionality to store the cinema hall details
  await new cinemaHallModel({
    cinemaLocationObjectId: req.body.cinemaLocationObjectId,
    cinemaHallName: req.body.hallName,
    seatingGridNoOfRows: req.body.noOfRows,
    seatingGridNoOfColumns: req.body.noOfColumns,
    seatingDetails: req.body.seatingDetails
  }).save((error, returnedData) => {

    // If condition - Response will be sent accordingly if an error occurs
    if (error) {
      res.status(500).json({
        message:
          "Error - Unable to add cinema hall"
      });
    }
    else {
      res.status(200).json({
        message:
          "Cinema hall created",
        returnedData
      });
    }

  })
};


// Function - Getting cinema halls for one cinema location using, 'BASE_URL/api/cinema-halls/:cinemaLocationObjectId'
exports.retrieveCinemaHalls = async (req, res, next) => {

  // Getting passed 'cinemaLocationObjectId' from the URL
  let cinemaLocationId = req.params.cinemaLocationObjectId;

  // Using mongoose find() functionality to retrieve cinema halls for the cinema location
  await cinemaHallModel.find({ cinemaLocationObjectId: cinemaLocationId }, (error, returnedData) => {

    // If condition - checking whether an error has occurred and the relevant message is passed to the client-side
    if (error) {
      res.status(500).json({
        message:
          "Error - Unable to retrieve cinema halls"
      });
    }
    else {

      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No cinema halls available for cinema location"
        });
      }
      else {
        res.status(200).json({
          message:
            "Cinema halls Retrieved",
          returnedData
        });
      }

    }

  })
};


// Function - Retrieve one cinema hall by cinemaHallObjectId using route, 
// 'BASE_URL/api/cinema-halls/hall/:id'
exports.retrieveCinemaHall = async (req, res, next) => {

  // Extracting cinemaHallObjectId from the URL
  let cinemaHallObjectId = req.params.id;

  await cinemaHallModel.findById(cinemaHallObjectId)
    .then((returnedData) => {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No cinema halls available for cinema location"
        });
      }
      else {
        res.status(200).json({
          message:
            "Cinema hall retrieved",
          returnedData
        });
      }
    }).catch(err => {
      res.status(500).json({
        message:
          "Error - Unable to retrieve cinema hall: ", err
      });
    })
};


// Function - Update showing experience using route, 'BASE_URL/api/cinema-halls/update-cinema-hall'
exports.updateCinemaHallDetails = async (req, res, next) => {

  // Extracting the 'cinemaHallObjectId' from the sent request body
  let cinemaHallObjectId = req.body._id;

  // Using mongoose findOneAndUpdate() functionality to update cinema hall
  await cinemaHallModel.findOneAndUpdate(
    {
      _id: cinemaHallObjectId
    },
    {
      cinemaHallName: req.body.cinemaHallName,
      seatingDetails: req.body.seatingDetails
    }, (error, returnedData) => {

      // If condition - checking whether an error occurred during the query execution
      if (error) {
        res.status(500).json({
          message:
            "Unable to update cinema hall",
        });
      }
      else {
        res.status(200).json({
          message:
            "Cinema hall updated",
          returnedData
        });
      }

    })

};

// Function - Remove cinema hall details from the database
exports.removeCinemaHall = async (req, res, next) => {

  // Extracting passed cinemaHallObjectId from the URL
  let passedCinemaHallObjectId = req.params.cinemaHallObjectId;

  // Using mongoose findByIdAndDelete() functionality to remove the cinema hall according to the passed cinemaHallObjectId
  await cinemaHallModel.deleteOne({ '_id': passedCinemaHallObjectId }, (error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to remove cinema hall",
      });
    }
    else {
      res.status(200).json({
        message:
          "Cinema hall removed",
        returnedData
      });
    }

  })

};
