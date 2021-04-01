const express = require("express");

const router = express.Router();

const booking = require("../models/bookingHistory");

//get user data with email
router.get('/:id' ,(req,res,next)=>{
    booking.find({customerObjectId: req.params.id})
      .then((tickets)=>{
        if(tickets)
      {
        res.status(200).json({
          message: "It works",
          tickets
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