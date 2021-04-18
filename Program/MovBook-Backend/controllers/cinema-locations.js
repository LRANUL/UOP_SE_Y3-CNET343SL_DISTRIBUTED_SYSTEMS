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

  await cinemaLocationModel.find({}, (error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve cinema locations"
      });
    }
    else{
      res.status(200).json({
        message:
          "Cinema locations retrieved",
        returnedData
      });
    }
  
  })

};

// Function - Retrieving count of cinema location using route, 'BASE_URL/api/cinema-location/count'
exports.retrieveCinemaLocationsCount = async (req, res, next) => {

  // Using mongoose countDocuments() functionality to get the count of cinema locations
  await cinemaLocationModel.countDocuments((error, returnedData) => {
    
    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve count of cinema locations",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No cinema locations available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Count of cinema locations retrieved",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieve one cinema location
exports.retrieveCinemaLocation = (req, res, next) => {
  let id = req.params.cinemaLocationObjectId;
  let id2 = id.split(' ').join('')
  console.log(id);
  console.log(id2);
  cinemaLocationModel.findById(id2)
  .then((returnedData)=>{
    console.log(returnedData);
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

// Function - Update cinema location using route, 'BASE_URL/api/cinema-locations/update'
exports.updateCinemaLocation = async (req, res, next) => {

  // Using mongoose findOneAndUpdate() functionality to update cinema location
  await cinemaLocationModel.findOneAndUpdate(
    {
      '_id': req.body._id
    },
    {
      'cinemaLocationName': req.body.locationName,
      'cinemaLocationAddress.streetAddress': req.body.locationAddressStreetAddress,
      'cinemaLocationAddress.city': req.body.locationAddressCity,
      'cinemaLocationAddress.postalCode': req.body.locationAddressPostalCode
    }, (error, returnedData) => {

      // If condition - checking whether an error occurred during the query execution
      if (error) {
        res.status(500).json({
          message:
            "Unable to update cinema location",
        });
      }
      else {
        res.status(200).json({
          message:
            "Cinema location updated",
          returnedData
        });
      }
    })
    
};
