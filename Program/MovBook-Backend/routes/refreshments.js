const express = require("express");

const router = express.Router();

const Refreshments = require("../models/refreshments");
// Get all Refreshments
router.get('', (req, res, next) => {
  Refreshments.find({})
    .then((data) => {
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

// Update Refreshments
router.put('/update', (req, res, next) => {
  Refreshments.findOneAndUpdate(
    { name: req.body.name },
    { stock: req.body.quantity }).then((data) => {
      res.send(JSON.stringify("Updated Stock"))
    }).catch(err => {
      res.send(JSON.stringify("Not Updated: "+ err))
    })
});
module.exports = router;