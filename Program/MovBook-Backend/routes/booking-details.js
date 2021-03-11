const express = require("express");

const router = express.Router();

const booking = require("../models/booking-details");

//get the movie with the id
router.get('/:id' ,(req,res,next)=>{
    booking.find({movieObjectId: req.params.id})
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
});

//get information with cinemaExperience
router.get('/experience/:experience' ,(req,res,next)=>{
    booking.find({showingExperience: req.params.experience})
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
          message: "The experience category does not exist"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
});

//get information with the location (need to make changes)
router.get('/location/:location' ,(req,res,next)=>{
    booking.find({location: req.params.location})
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
          message: "No data available for the entered location"
        })
      } 
      }).catch(err => {
       console.log(err);
      })
});

module.exports = router;