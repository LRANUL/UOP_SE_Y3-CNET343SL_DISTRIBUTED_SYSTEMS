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

// Get count of operator account for thw particular account status (Enabled or Disabled)
router.get('/count-operator-accounts/account-status/:AccountStatus', (req, res, next) => {
  // Extracting the retrieved accountStatus from the URL
  let passedAccountStatus = req.params.accountStatus;
  // Using mongoose find() and count() functionalities to get the count of refreshments
  Operators.find({
    'accountStatus': passedAccountStatus
  }).count().exec((error, returnedData) => {
    // If condition - checking whether an error occurred during the query execution
    if (error) {
      res.status(500).json({
        message:
          "Unable to retrieve count of accounts",
      });
    }
    else {
      // If condition - checking whether the length of the returned data is zero (no data is returned)
      // and the relevant message passed to the client-side
      if (returnedData.length == 0) {
        res.status(200).json({
          message:
            "No accounts available"
        });
      }
      else {
        res.status(200).json({
          message:
            "Count of accounts retrieved",
          returnedData
        });
      }
    }
  })
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