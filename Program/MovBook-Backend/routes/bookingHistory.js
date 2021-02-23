const express = require("express");

const router = express.Router();

const booking = require("../models/bookingHistory");

//get user data with email
router.get('/:email' ,(req,res,next)=>{
    booking.find({userEmail: req.params.email})
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