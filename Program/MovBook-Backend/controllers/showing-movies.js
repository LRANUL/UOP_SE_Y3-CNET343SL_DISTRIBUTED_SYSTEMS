// Importing model to query from the mongoDB database
const showingMovieModel = require("../models/showing-movies");

// Function - Add new movie in the relevant movie status, 'BASE_URL/api/showing-movies/add-new-showing-movie'
exports.addNewShowingMovie = async (req, res, next) => {
  // Using mongoose save() functionality to create a new showing movie document (object)
  await new showingMovieModel({
    movieObjectId: req.body.movieObjectId,
    cinemaHallObjectId: req.body.cinemaHallObjectId,
    cinemaLocation: {
      cinemaLocationObjectId: req.body.cinemaLocation.cinemaLocationObjectId,
      cinemaLocationName: req.body.cinemaLocation.cinemaLocationName,
      cinemaLocationAddress: {
        streetAddress: req.body.cinemaLocation.cinemaLocationAddress.streetAddress,
        city: req.body.cinemaLocation.cinemaLocationAddress.city,
        postalCode: req.body.cinemaLocation.cinemaLocationAddress.postalCode
      }
    },
    showingStartDate: req.body.showingStartDate,
    showingEndDate: req.body.showingEndDate,
    showingSlots: req.body.showingSlots
  }).save((error, returnedData) => {
    if (error) {
      res.status(500).json({
        message:
          "Error - Unable to add showing movie", error
      });
    }
    else {
      res.status(200).json({
        message:
          "Showing movie added",
        returnedData
      });
    }
  })
};

// Function - Check availability of movie showing using route, 'BASE_URL/api/showing-movies/check-showing-movie-availability'
exports.checkShowingMovieAvailability = async (req, res, next) => {
  await showingMovieModel.find({
    $and: [
      {
        "cinemaLocation.cinemaLocationObjectId": req.body.cinemaLocationObjectId
      },
      {
        "cinemaHallObjectId": req.body.cinemaHallObjectId
      },
      {
        "movieObjectId": req.body.movieObjectId
      },
      {
        "showingStartDate": req.body.showingStartDate
      },
      {
        "showingEndDate": req.body.showingEndDate
      }
    ]
  }).exec((error, returnedData) => {
    if (error) {
      res.status(500).json({
        message:
          "Unable to check availability of showing movies"
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No showing movie available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Showing movie available",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieving movie wait list using route, 'BASE_URL/api/showing-movies/by-movie-object-id/:movieObjectId'
exports.getShowingMovieByMovieObjectId = async (req, res, next) => {
  // Getting passed 'movieObjectId' from the URL
  let movieObjectId = req.params.movieObjectId;

  // Using mongoose find() functionality to retrieve showing movie for movieObjectId
  await showingMovieModel.find({ 'movieObjectId': movieObjectId }, (error, returnedData) => {
    if(error){
      res.status(500).json({
        message:
          "Unable to retrieve showing movie",
      });
    }
    else{
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if(returnedData.length == 0){
        res.status(404).json({
          message:
            "No showing movie available"
        });
      }
      else{
        res.status(200).json({
          message:
            "Showing movie retrieved",
          returnedData
        });
      }
    }
  })
};

// Function - Retrieve number of showing movie slots per mouth for the previous 6 months using route,
// Route: 'BASE_URL/api/showing-movies/showing-movies-by-months'
exports.getShowingMoviesByMonths = async (req, res, next) => {

  // Declaration - to store an array of the count of showing movies
  let countOfShowingMovieSlotsArray = new Array(7);
  // Assigning the current date time
  let currentDateTime = new Date();
  // To store the status of retrieving the count of showing movie slots from the database
  let showingMovieSlotsCountRetrieved = false;
  
  // For Loop - Initializing the 'countOfShowingMovieSlotsArray' array indexes
  for (let countIndex = 0; countIndex < 7; countIndex++)
    countOfShowingMovieSlotsArray[countIndex] = 0;

  // For Loop - Iterating through to retrieve the count of showing movies for the past six mouths
  // Including this month, the loop will iterate seven times
  for (let monthIndex = 6; monthIndex > 0; monthIndex--) {

    // If the month is not the current month ('monthIndex' == 7), the month will be decremented to the previous month
    if(monthIndex != 6){
      currentDateTime.setMonth(currentDateTime.getMonth() - 1);
    }
  
    // Extracting the month value from the 'currentDateTime', Sample: Mar
    let month = (new Date(currentDateTime).toLocaleString('default', { month: 'short' }));
    // Extracting the year value from the 'currentDateTime', Sample: 2021
    let year = (new Date(currentDateTime).toLocaleString('default', { year: 'numeric' }));
    // Assigning the regular expression to search for the showing movies for each month
    let regexPatternString = `([${month}])\\w+[ ]\\d\\d\\,[ ][${year}]+`;
    // Converting regular expression from string to regex object
    let regexPatternObject = new RegExp(regexPatternString);

    // Using mongoose aggregate() functionality to get the count of showing slots for each month
    await showingMovieModel.aggregate(
      [
        { 
          $unwind: "$showingSlots" 
        }, 
        { 
          $match: { 
            "showingSlots.showingDate": { 
              $regex: regexPatternObject 
            }  
          }
        },
        { 
          $project: { "_id": 0 }
        },
        { "$group": { 
            "_id": "$showingSlots",
            "count": { "$sum": 1 }
        }}
    ]).exec().then((returnedData) => {
      // Assigning the number of showing slot object retrieved to an array element
      countOfShowingMovieSlotsArray[monthIndex] = returnedData.length;
      showingMovieSlotsCountRetrieved = true;
    }).catch((error) => {
      res.status(500).json({
          message:
            "Unable to retrieve count of showing movie slots", 
            error
        });
    });
  }
  
  if(showingMovieSlotsCountRetrieved == true){
    // Returning a response to the client with the count of showing movie slots
    res.status(200).json({
      message:
        "Showing movie slots count retrieved",
        countOfShowingMovieSlotsArray
    });
  }
  else{
    res.status(500).json({
      message:
        "Unable to retrieve count of showing movie slots"
    });
  }
};

exports.getShowingMovieByMovieId = async (req, res, next) => {
  await showingMovieModel.find({movieObjectId: req.params.id})
      .then((data)=>{
        if(data)
      {
        res.status(200).json({
          message: "It works",
          tickets: data
        })
      }else
      {
        res.status(404).json({
          message: "The user does not exist"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
};

exports.getShowingMovieByShowingId = async (req, res, next) => {
  await showingMovieModel.findById(req.params.showingId)
      .then((data)=>{
        if(data)
      {
        res.status(200).json({
          message: "It works",
          tickets: data
        })
      }else
      {
        res.status(404).json({
          message: "The user does not exist"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
};
