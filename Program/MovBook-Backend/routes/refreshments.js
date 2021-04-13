const express = require("express");

const router = express.Router();

const Refreshments = require("../models/refreshments");

// Add New Refreshment
router.post('/add-new', (req, res, next) => {
  Refreshments({
    name: req.body.beverageName,
    price: req.body.beveragePrice,
    stock: req.body.beverageQuantity,
    imgUrl: req.body.beverageImageLink,
  }).save((error, returnedData) => {
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to add new refreshment"
      });
    }
    else{
      res.status(200).json({
        message: 
          "New refreshment added",
        returnedData
      });
    }
  })
});

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

// Remove One Refreshment
router.delete('/remove/:refreshmentObjectId', (req, res, next) => {
  Refreshments.deleteOne({
    '_id': req.params.refreshmentObjectId
  }, (error, returnedData) => {
    if(error){
      res.status(500).json({
        message:
          "Error - Unable to remove refreshment"
      });
    }
    else{
      res.status(200).json({
        message: 
          "Refreshment removed",
        returnedData
      });
    }
  })
});

module.exports = router;
