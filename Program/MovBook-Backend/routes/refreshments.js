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

module.exports = router;