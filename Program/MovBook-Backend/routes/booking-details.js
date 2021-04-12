/**
 * 
 * DEPRECATED - DO NOT USE FOR FURTHER IMPLEMENTATIONS
 * 
 */

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

router.get('/id/:showingId' ,(req,res,next)=>{
    booking.findById(req.params.showingId)
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
module.exports = router;