/**
 * 
 * DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS
 * 
 */

const express = require("express");
const router = express.Router();

// Importing movie-wait-list controller to retrieve the functions
const movieWaitListsController = require("../controllers/movie-wait-lists");

// GET - Retrieve movie wait list | Route: 'BASE_URL/api/movie-wait-list/:managerObjectId'
router.get("/:managerObjectId", movieWaitListsController.retrieveMovieWaitList);

// POST - Creating a new movie wait list | Route: 'BASE_URL/api/movie-wait-list/add'
router.post("/add", movieWaitListsController.createMovieWaitList);

// PUT - Updating a movie wait list | Route: 'BASE_URL/api/movie-wait-list/add-movie'
router.put("/add-movie", movieWaitListsController.addMovieToMovieWaitList);

// DELETE - Deleting a movie wait list

module.exports = router;
