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

// Function - Retrieving list of cinema locations using route, 'BASE_URL/api/cinema-locations'
exports.retrieveListCinemaLocations = async (req, res, next) => {
  const cinemaLocationDocuments = await cinemaLocationModel.find();
  res.json(cinemaLocationDocuments);
};


//funtion to retreive single location
exports.retrieveCinemaLocation = async (req, res, next) => {
  cinemaLocationModel.findById({_id: req.params.cinemaLocationObjectId})
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

//find a specific cinema location
exports.retrieveSpecificCinemaLocation = async (req, res, next) => {
  cinemaLocationModel.find({cinemaLocationName: req.params.location})
  .then((returnedData)=>{
    console.log(returnedData);
    if(returnedData)
  {
    res.status(200).json({
      message: "Cinema halls Retrieved ffdb",
      returnedData
    })
  }else
  {
    console.log("gvhgvjvgjvjvgvjvj");
    res.status(404).json({
      message: "Unable to retrieve cinema hall",
      returnedData : ""
    })
  } 
  }).catch(err => {
   console.log(err);
  })
};