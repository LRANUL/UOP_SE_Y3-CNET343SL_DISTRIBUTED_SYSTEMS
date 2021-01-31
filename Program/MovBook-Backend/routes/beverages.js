const express = require("express");

const router = express.Router();

const Beverages = require("../models/beverages");
// Get all beverages
router.get('' ,(req,res,next)=>{
    Beverages.find({})
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