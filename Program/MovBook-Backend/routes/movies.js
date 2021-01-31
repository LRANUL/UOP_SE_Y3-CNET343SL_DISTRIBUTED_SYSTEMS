const express = require("express");

const router = express.Router();

const Movies = require("../models/movies");
// Get all movies
router.get('' ,(req,res,next)=>{
  Movies.find({})
    .then((data)=>{
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

module.exports = router;