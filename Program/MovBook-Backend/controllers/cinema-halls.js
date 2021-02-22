// Importing model to query from the mongoDB database
const cinemaHallModel = require("../models/cinema-halls");

// Function - Inserting new cinema hall using route, 'BASE_URL/api/cinema-hall/'
exports.createCinemaHall = async (req, res, next) => {
  await new cinemaHallModel({
    cinemaHallName: req.body.hallName,
    seatingGridNoOfRows: req.body.noOfRows,
    seatingGridNoOfColumns: req.body.noOfColumns,
    seatingDetails: req.body.seatingDetails
  }).save((error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to add cinema hall"
      });
    }
    else{
      res.status(200).json({
        message:
          "Cinema hall created",
        returnedData
      });
    }
  
  })
};

