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

// Update Refreshments Stock
router.put('/update-stock', (req, res, next) => {
  Refreshments.findOneAndUpdate(
    { name: req.body.name },
    { stock: req.body.quantity }).then((data) => {
      res.send(JSON.stringify("Updated Stock"))
    }).catch(err => {
      res.send(JSON.stringify("Not Updated: "+ err))
    })
});
// Update Refreshments Price
router.put('/update-price', (req, res, next) => {
  Refreshments.findOneAndUpdate(
    { name: req.body.name },
    { price: req.body.price }).then((data) => {
      res.send(JSON.stringify("Updated Stock"))
    }).catch(err => {
      res.send(JSON.stringify("Not Updated: "+ err))
    })
});
module.exports = router;