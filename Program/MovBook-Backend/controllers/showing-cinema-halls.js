// Importing model to query from the mongoDB database
const showingCinemaHallModel = require("../models/showing-cinema-halls");

// Function - Assigning showing cinema hall(s) for the showing movie | Route: 'BASE_URL/api/showing-cinema-halls/assign-showing-cinema-hall'
exports.assignShowingCinemaHall = async (req, res, next) => {

  // Using mongoose insertMany() functionality to create new showing cinema hall document(s)
  await showingCinemaHallModel.insertMany(req.body, (error, returnedData) => {

    if (error) {
      res.status(500).json({
        message:
          "Error - Unable to assign showing cinema hall(s) ", error
      });
    }
    else {
      res.status(200).json({
        message:
          "Showing cinema hall(s) assigned",
        returnedData
      });
    }

  })

};


/** DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS */
// Function - Update showing experience using route, 'BASE_URL/api/showing-cinema-halls/update-showing-cinema-hall'
exports.updateShowingCinemaHall = async (req, res, next) => {

  // Extracting the 'cinemaHallObjectId' from the sent request body
  let cinemaHallObjectId = req.body._id;

  await showingCinemaHallModel.bulkWrite(
    Object.keys(req.body.seatingDetails).forEach((seatIndex) => {
      return ({
        updateOne: {
          filter: {
            cinemaHallObjectId: cinemaHallObjectId,
            showingSeatDetails: { $elemMatch: { seatId: req.body.seatingDetails[seatIndex].seatId } }
          },
          update: {
            $set: {
              "showingSeatDetails.$[].seatActive": req.body.seatingDetails[seatIndex].seatActive,
              'showingSeatDetails.$[].seatNumber': req.body.seatingDetails[seatIndex].seatNumber,
              'showingSeatDetails.$[].seatUnavailable': req.body.seatingDetails[seatIndex].seatUnavailable
            }
          },
          upsert: true
        }
      })
    })).exec((error, returnedData) => {

    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to update all showings under this showing cinema hall",
      });
    }
    else {
      res.status(200).json({
        message:
          "All showings under this showing cinema hall is updated",
        returnedData
      });
    }

  })

};
