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
