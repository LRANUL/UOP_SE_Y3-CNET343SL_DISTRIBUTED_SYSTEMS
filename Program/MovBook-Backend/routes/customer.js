const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Users = require("../models/customers");
const customers = require("../models/customers");

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
  console.log('Name:'+req.body.firstName);
  Users.updateOne({ email: req.params.id },
    req.body)
    .then((data) => {
      // console.log(data);
      res.send(data)
    })
});

module.exports = router;