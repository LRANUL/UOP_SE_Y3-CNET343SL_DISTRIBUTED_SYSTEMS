const express = require("express");

const router = express.Router();

const Operators = require("../models/operators");
// Get Operator Details
router.get('', (req, res, next) => {
  Operators.find({ Email: req.query.email })
    .then((data) => {
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

// Update Operator Email
router.put('/update', (req, res, next) => {
  Operators.findOneAndUpdate(
    { Email: req.body.oldEmail },
    { Email: req.body.newEmail },
    { new: true, useFindAndModify: false }).then((data) => {
      res.send(JSON.stringify('Updated Email'))
    }).catch(err => {
      res.send(JSON.stringify("Not updated: " + err))
    })
});
module.exports = router;