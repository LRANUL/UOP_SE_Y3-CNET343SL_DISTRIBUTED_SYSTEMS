/**
 * 
 * DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS
 * 
 */

const express = require("express");
const router = express.Router();

const showingCinemaHall = require("../models/showing-movie-hall");

router.get('/:id' ,(req,res,next)=>{
    showingCinemaHall.find({slotObjectId: req.params.id})
      .then((returnedData)=>{
        if(returnedData)
      {
        res.status(200).json({
          message: "Movie hall found",
          returnedData
        })
      }else
      {
        res.status(404).json({
          message: "The Movie hall was not found"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
});


module.exports = router;