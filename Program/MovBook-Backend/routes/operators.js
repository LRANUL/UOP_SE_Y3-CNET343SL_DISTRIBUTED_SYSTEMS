const express = require("express");

const router = express.Router();

const Operators = require("../models/operators");

// Add Operator Email
router.post('/add', (req, res, next) => {
  console.log(req.body)
  Operators(req.body).save().then((data) => {
    res.send(JSON.stringify('Operator Added'))
  }).catch(err => {
    console.log(err)
    res.send(JSON.stringify("Operator Not Added"))
  })
});

// Get Operator Details by Email
router.get('/:email', (req, res, next) => {
  Operators.find({ emailAddress: req.params.email })
    .then((data) => {
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

// Get Operator Details by Information - NOT FUNCTIONAL
router.get('/', (req, res, next) => {
  console.log(req.query)
  Operators.find({
    $or: [{
      'name.prefix': req.query.prefix
    }, {
      'name.firstName': req.query.firstName
    }, {
      'name.lastName': req.query.lastName
    }]
  }, function (err, Operators) {
    if (err) {
      res.send(Operators);
    }
    console.log(Operators);
    res.json(Operators);
  });
});

// Update Operator Email
router.put('/update', (req, res, next) => {
  console.log(req.body)
  Operators.findOneAndUpdate(
    { emailAddress: req.body.oldEmail },
    { emailAddress: req.body.newEmail }).then((data) => {
      res.send(JSON.stringify('Updated Email'))
    }).catch(err => {
      res.send(JSON.stringify("Not updated: "))
    })
});

// Update Operator Account Status
router.put('/status', (req, res, next) => {
  var email = req.body.email
  var status = req.body.status
  Operators.updateOne(
    { emailAddress: email },
    { accountStatus: status }).then((data) => {
      if (status == 'Disabled') {
        console.log(data)
        res.send(JSON.stringify('Account Disabled : ' + email))
      }
      else if (status == 'Enabled') {
        console.log(data)
        res.send(JSON.stringify('Account Enabled : ' + email))
      }
    }).catch(err => {
      res.send(JSON.stringify("Not updated: " + err))
    })
});
module.exports = router;