const express = require("express");
const router = express.Router();

// Importing movie-wait-list controller to retrieve the functions
const movieWaitListsController = require("../controllers/movie-wait-lists");

// GET - Retrieve movie wait list | Route: 'BASE_URL/api/movie-wait-list/:managerObjectId'
router.get("/:managerObjectId", movieWaitListsController.retrieveMovieWaitList);

// POST - Creating a new movie wait list | Route: 'BASE_URL/api/movie-wait-list/add/:managerObjectId'
router.post("/add/:managerObjectId", movieWaitListsController.createMovieWaitList);

// PUT - Updating a movie wait list | Route: 'BASE_URL/api/movie-wait-list/update/:managerObjectId'
router.put("/update/:managerObjectId", movieWaitListsController.updateMovieWaitList);

// DELETE - Deleting a movie wait list


module.exports = router;