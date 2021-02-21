const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

//creating user with pasword and email 
router.post("/signup",(req , res, next)=>{
  bcrypt.hash(req.body.password,10)
    .then(hash =>{
      const user = new Users({
        email:req.body.email,
        password:hash,
        name: req.body.name, 
        status: "Online",
        type: "not my-type",
        address: req.body.address,
        phone: req.body.phone
      });
      user.save()
        .then(result =>{
          console.log("user Created")
           res.status(201).json({
             message:"user created!!",
             result : result
           });
        });
    })
      .catch(err =>{
        res.status(500).json({ error:err })
      });
});
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

//user login
router.post("/login",(req,res,next)=>{
  let fetchedUSer;
  Users.findOne({ email:req.body.email })
    .then(user =>{
      if(!user){
        return res.status(401).json({message:"auth failed1"}); 
      }
      fetchedUSer = user;
     return bcrypt.compare(req.body.password ,user.password)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"auth failed2"})
      }
      const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token});
      console.log('User Logged in');
    }).catch(err =>{
      return res.status(401).json({ message:"auth failed3"})
    })
});

// Create new User
// router.post("/create", (req, res, next) => {
//   const User = new Users(req.body);
//   User.save()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status().send({ message: err.message });
//     });
// });
module.exports = router;