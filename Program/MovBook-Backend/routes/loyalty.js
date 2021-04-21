const express = require("express");

const router = express.Router();

const loyalty = require("../models/loyalty");


//get user data with email
router.get('/:email', (req, res, next) => {
  loyalty.find({email: req.params.email})
    .then((data) => {
      console.log(data);
      if (data) {
        res.status(200).json({
          message: "It works",
          users: data
        })
      } else {
        res.status(404).json({
          message: "The user does not exist"
        })
      }
    }).catch(err => {
      console.log(err);
    })
});


// Add Loyal points
router.put('/add', (req, res, next) => {
  var email = req.body.email
  var points = req.body.points
  loyalty.findOneAndUpdate(
    { email: email },
    { $inc: { totalPoints: points } }, { lastEarnedDate: new Date() }).then((data) => {
      res.send(JSON.stringify("Points Added"))
    }).catch(err => {
      res.send(JSON.stringify("Pointed Add Failed: " + err))
    })
});
module.exports = router;