// Importing model to query from the mongoDB database
const cinemaLocationModel = require("../models/cinema-locations");

// Function - Inserting new cinema location using route, 'BASE_URL/api/cinema-location/'
exports.createCinemaLocation = async (req, res, next) => {
  await new cinemaLocationModel({
    cinemaLocationName: req.body.locationName,
    cinemaLocationAddress: {
      streetAddress: req.body.locationAddressStreetAddress,
      city: req.body.locationAddressCity,
      postalCode: req.body.locationAddressPostalCode
    }
  }).save((error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to add cinema location"
      });
    }
    else{
      res.status(200).json({
        message:
          "Cinema location created",
        returnedData
      });
    }
  
  })
};

