const express = require("express");

const router = express.Router();

const loyality = require("../models/loyalty");


//get user data with email
router.get('/:email' ,(req,res,next)=>{
  loyality.findById(req.params.email)
    .then((data)=>{
      console.log(data);
      if(data)
    {
      res.status(200).json({
        message: "It works",
        users: data
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