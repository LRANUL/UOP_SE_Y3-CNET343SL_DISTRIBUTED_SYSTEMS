const express = require("express");

const router = express.Router();

const Users = require("../models/users");
// Get selected user
/*router.get('' ,(req,res,next)=>{
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
*/

//get user data with id
router.get('/:id' ,(req,res,next)=>{
  Users.findById(req.params.id)
    .then((data)=>{
      console.log(data);
      if(data)
    {
      res.status(200).json({
        message: "It works",
        users: data
      })
    }else
    {
      res.status(404).json({
        message: "The user does not exist"
      })
    } 
    }).catch(err => {
     console.log(err);
    })
});

//update the user doesn't work
router.put('/:id' ,(req,res,next)=>{
  console.log("dsvsvs");
  const user = new Users({
    email: user.email,
    name: user.Fname, 
    address: user.Address, 
    phone: user.Mnumber
  });
  console.log("sdvdsvdsv");
  Users.updateOne({_id: req.params.id}, user).then((data) => {
    console.log(data);
  })
});


// Create new User
router.post("/create", (req, res, next) => {
  const User = new Users(req.body);
  User.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status().send({ message: err.message });
    });
});
module.exports = router;