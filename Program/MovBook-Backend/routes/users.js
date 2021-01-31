const express = require("express");

const router = express.Router();

const Users = require("../models/users");
// Get selected user
router.get('' ,(req,res,next)=>{
  var email = req.query.email || "";
  Users.findOne({email: email})
    .then((data)=>{
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

module.exports = router;