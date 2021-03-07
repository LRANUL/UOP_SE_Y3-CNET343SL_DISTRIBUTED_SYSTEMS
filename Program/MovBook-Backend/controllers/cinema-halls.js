// Importing model to query from the mongoDB database
const cinemaHallModel = require("../models/cinema-halls");


// Function - Inserting new cinema hall using route, 'BASE_URL/api/cinema-hall/'
exports.createCinemaHall = async (req, res, next) => {

  // Using mongoDb's save functionality to store the cinema hall details
  await new cinemaHallModel({
    cinemaLocationObjectId: req.body.cinemaLocationObjectId,
    cinemaHallName: req.body.hallName,
    seatingGridNoOfRows: req.body.noOfRows,
    seatingGridNoOfColumns: req.body.noOfColumns,
    seatingDetails: req.body.seatingDetails
  }).save((error, returnedData) => {
    
    // If condition - Response will be sent accordingly if an error occurs
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


// Function - Getting cinema halls for one cinema location using, 'BASE_URL/api/cinema-halls/:cinemaLocationObjectId'
exports.retrieveCinemaHalls = async (req, res, next) => {

  // Getting passed 'cinemaLocationObjectId' from the URL
  let cinemaLocationId = req.params.cinemaLocationObjectId;

  // Using mongoDB's find() functionality to retrieve cinema halls for the cinema location
  await cinemaHallModel.find({ cinemaLocationObjectId: cinemaLocationId }, (error, returnedData) => {

    // If condition - checking whether an error has occurred and the relevant message is passed to the client-side
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to retrieve cinema halls"
      });
    }
    else{

      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if(returnedData.length == 0){
        res.status(200).json({
          message:
            "No cinema halls available for cinema location"
        });
      }
      else{
        res.status(200).json({
          message:
            "Cinema halls Retrieved",
          returnedData
        });
      }

    }

  })
};

// to get one cinema hall
exports.retrieveCinemaHall = async (req, res, next) => {
  cinemaHallModel.findById({_id: req.params.cinemaHallObjectId})
  .then((returnedData)=>{
    if(returnedData)
  {
    res.status(200).json({
      message: "Cinema halls Retrieved",
      returnedData
    })
  }else
  {
    res.status(404).json({
      message: "Unable to retrieve cinema hall"
    })
  } 
  }).catch(err => {
   console.log(err);
  })
};
