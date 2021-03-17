const express = require("express");
const router = express.Router();

const ticketsModel = require("../models/ticket-prices");

router.get('/:movieId' ,(req,res,next)=>{
    console.log(req.params.movieId);
    ticketsModel.findOne({movieObjectId: req.params.movieId})
      .then((data)=>{
        console.log(data);
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