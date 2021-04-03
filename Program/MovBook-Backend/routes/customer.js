const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/customers");

//get user data with id
router.get('/:email', (req, res, next) => {
  Users.findOne({ email: req.params.email })
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

//update the user 
router.put('/:id', (req, res, next) => {
  console.log(req.body);
  Users.updateOne({ email: req.params.id },
    {
      'name.0.prefix': req.body.prefix,
      'name.0.firstName': req.body.firstName,
      'name.0.middleName': req.body.middleName,
      'name.0.lastName': req.body.lastName,
      'address.0.streetAddress': req.body.streetAddress,
      'address.0.city': req.body.city,
      'address.0.postalZipCode': req.body.postalZipCode,
      "phone": req.body.phone
    })
    .then((data) => {
      console.log(data);
      res.send("Updated")
    })
});

module.exports = router;