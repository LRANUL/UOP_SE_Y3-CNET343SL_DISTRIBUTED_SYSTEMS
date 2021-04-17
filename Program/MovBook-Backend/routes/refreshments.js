const express = require("express");

const router = express.Router();

const Refreshments = require("../models/refreshments");

// Add New Refreshment
router.post('/add-new', (req, res, next) => {
  Refreshments({
    name: req.body.beverageName,
    price: req.body.beveragePrice,
    stock: req.body.beverageQuantity,
    imgURL: req.body.beverageImageLink,
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
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

// Get Count of Refreshments
router.get('/count', (req, res, next) => {
  // Using mongoose find() and count() functionalities to get the count of refreshments
  Refreshments.find().count().exec((error, returnedData) => {
    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve count of refreshments",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No refreshments available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Count of refreshments retrieved",
          returnedData
        });
      }
    }
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

// Update Refreshment Name and Image URL
router.put('/update-name-image-url', (req, res, next) => {
  let passedRefreshmentObjectId = req.body.refreshmentObjectId;
  let passedRefreshmentName = req.body.refreshmentName;
  let passedRefreshmentImageURL = req.body.refreshmentImageURL;
  Refreshments.findByIdAndUpdate({
    '_id': passedRefreshmentObjectId
  },
  {
    'name': passedRefreshmentName,
    'imgURL': passedRefreshmentImageURL
  }, (error, returnedData) => {
    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to update refreshment",
      });
    }
    else {
      res.status(200).json({
        message:
          "Refreshment updated",
        returnedData
      });
    }
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
