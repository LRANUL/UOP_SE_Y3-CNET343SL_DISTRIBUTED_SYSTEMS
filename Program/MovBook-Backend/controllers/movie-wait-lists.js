// Importing model to query from the mongoDB database
const movieWaitListModel = require("../models/movie-wait-lists");

// Function - Retrieving movie wait list using route, 'BASE_URL/api/movie-wait-list/:managerObjectId'
exports.retrieveMovieWaitList = async (req, res, next) => {

  // Getting passed 'managerObjectId' from the URL
  let managerObjectId = req.params.managerObjectId;

  // Using mongoDB's findById() functionality to retrieve movie wait list for a manager user
  await movieWaitListModel.find({ managerObjectId: managerObjectId }, (error, returnedData) => {

      if(error){
        res.status(500).json({
          message:
            "Unable to retrieve movie wait list",
        });
      }
      else{
        // If condition - checking whether the length of the returned data is zero (no data is returned)
        // and the relevant message passed to the client-side
        if(returnedData.length == 0){
          res.status(200).json({
            message:
              "No movie wait list available"
          });
        }
        else{
          res.status(200).json({
            message:
              "Movie wait list retrieved",
            returnedData
          });
        }
      }

  })
};

// Function - Creating a new movie wait list using route, 'BASE_URL/api/movie-wait-list/add/:managerObjectId/:movieObjectId'
exports.createMovieWaitList = async (req, res, next) => {

  // Getting passed 'managerObjectId' from the url
  let managerObjectId = req.params.managerObjectId;

  // Using mongoDB's save() functionality to create a new movie wait list document (object)
  await new movieWaitListModel({
    managerObjectId: managerObjectId,
    movieObjectId: [req.body.movieObjectId]
  }).save((error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to create movie wait list, movie not added"
      });
      console.log(error);
    }
    else{
      res.status(200).json({
        message:
          "Created new movie wait list, added movie",
        returnedData
      });
    }
  
  })
};

// Function - Updating movie wait list document(object) using route, 'BASE_URL/api/movie-wait-list/update/:managerObjectId/:movieObjectId'
exports.updateMovieWaitList = async (req, res, next) => {

  // Getting passed 'managerObjectId' from the url
  let passedManagerObjectId = req.params.managerObjectId;
  
  console.log(res);
  // Using mongoDB's findOneAndUpdate() functionality to update movie wait list document (object)
  await movieWaitListModel.findOneAndUpdate({ managerObjectId: passedManagerObjectId }, 
    {
      $push: {
        movieObjectId: req.body.movieObjectId
    }
  }, (error, returnedData) => {
    
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to update movie wait list",
      });
    } 
    else{
      res.status(200).json({
        message: 
          "Movie wait list updated",
          returnedData
      });
    }
  });

};
