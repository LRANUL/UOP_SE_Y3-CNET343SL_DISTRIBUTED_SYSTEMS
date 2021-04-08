// Importing model to query from the mongoDB database
const showingExperienceModel = require("../models/showing-experiences");

// Function - Inserting new showing experience using route, 'BASE_URL/api/showing-experiences/'
exports.createShowingExperience = async (req, res, next) => {
  await new showingExperienceModel({
    showingExperience: req.body.showingExperience,
    description: req.body.description
  }).save((error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to add showing experience"
      });
    }
    else{
      res.status(200).json({
        message:
          "Showing experience added",
        returnedData
      });
    }
  
  })
};

// Function - Retrieving list of showing experience using route, 'BASE_URL/api/showing-experiences'
exports.retrieveListOfShowingExperiences = async (req, res, next) => {

  await showingExperienceModel.find({}, (error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve showing experiences"
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No showing experiences available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Showing experiences retrieved",
          returnedData
        });
      }
    }
  
  })

};
