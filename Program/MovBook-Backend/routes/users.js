const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Customers = require("../models/customers");
const Users = require("../models/users");
const customers = require("../models/customers");
const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  }
}))
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
        type: "Customer",
        address: req.body.address,
        phone: req.body.phone
      });
      
      user.save()
        .then(result =>{
          const customer = new customers({
              name:req.body.name,
              email:req.body.email,
              registerdDateTime: new Date(),
              address:req.body.address,
              phoneNo:req.body.phone
          })
          customer.save();
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
router.get('/:email' ,(req,res,next)=>{
  Users.findOne({email: req.params.email})
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

//update the user 
router.put('/:id' ,(req,res,next)=>{
  Users.updateOne({email: req.params.id}, {name: req.body.Fname, address: req.body.Address, phone: req.body.Mnumber})
  .then((data) => {
    console.log(data);
  })
});

//Customer login
router.post("/customer-login",(req,res,next)=>{
  let fetchedUSer;

  Users.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      if(!user.type == "Customer"){
        return res.status(401).json({message:"user type mismatch "}); 
      }
      fetchedUSer = user;
     return bcrypt.compare(req.body.password ,user.password)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      
      const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Customer Logged in');
    })
    
    
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

//manager login
router.post("/manager-login",(req,res,next)=>{
  let fetchedUSer;

  Users.findOne({ email:req.body.email })
    .then(user =>{
      
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      if(!user.type == "Manager"){
        return res.status(401).json({message:"user type mismatch "}); 
      }
      fetchedUSer = user;
     return bcrypt.compare(req.body.password ,user.password)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      
      const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Manager Logged in');
    })
    
    
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

router.post("/operator-login",(req,res,next)=>{
  let fetchedUSer;

  Users.findOne({ email:req.body.email })
    .then(user =>{
      fetchedUSer = user;
      return bcrypt.compare(req.body.password ,user.password)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      if(!fetchedUSer){
        console.log("user not Exist!");
        return res.status(401).json({message:"Unregisterd Email!"});
      }
      if(fetchedUSer.type != "operator"){
        console.log("user wrong type !")
        return res.status(401).json({message:"user type mismatch"}); 
      }
      const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'operator Logged in');
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

router.post("/Admin-login",(req,res,next)=>{
  let fetchedUSer;

  Users.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      if(!user.type == "Admin"){
        return res.status(401).json({message:"user type mismatch"}); 
      }
      fetchedUSer = user;
     return bcrypt.compare(req.body.password ,user.password)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      
      const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Admin Logged in');
    })
    
    
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

//password forget
router.post("/forgot-password",(req , res, next)=>{
  bcrypt.hash(req.body.password,10)
    .then(hash =>{
      const email = req.body.email;
      
      user.findOne()
        .then(result =>{
          if(!result){
            res.status(404).json({message:"invalid email"});
          }
          else{
            const resetToken = jwt.sign({email: fetchedUSer.email },'password-reset',{expiresIn: "1h"}); 
            
            transporter.sendMail({
              to:email,
              from:"ishancbandara@gmail.com",
              subject:"password reset",
              html:"<a href='http://localhost:4200/new-password/"+email+"/"+tokenExiration+"'>click on this link to change your password</a>"
      
            }).then((reply)=>{
              const tokenExiration = new Date();
              Users.updateOne({email: email}, {passwordResetToken:resetToken,passwordTokenExpitation:tokenExiration})
                .then((data) => {
                        res.status(201).json({message:"password token updated"});
                    })
            })
          }
          
        });
    })
      .catch(err =>{
        res.status(500).json({ error:err })
      });
});


//change password
router.post("/change-password",(req , res, next)=>{
  let fetchedUSer;
  Users.findOne({ email:req.body.email })
    .then(user =>{
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      fetchedUSer = user;
     return bcrypt.compare(req.body.resetToken,user.passwordResetToken)
    })
    .then(bcryptResult =>{
      if(!bcryptResult){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      const newPassword = bcrypt.hash(req.body.newPassword,10)
      Users.updateOne({email: req.body.email}, {password:newPassword})
          .then((data) => {
            res.status(200).json({ message:"Password Updated "});
            console.log(fetchedUSer._id + ' ' +'password changed');
          });
    })
    
    
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});


//new password from forgot password 
router.post("/new-password",(req , res, next)=>{
  let fetchedUSer;
  let datenow = new Date();
  Users.findOne({ email:req.body.email })
    .then(user =>{
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      fetchedUSer = user;
      if(fetchedUSer.passwordResetToken!=req.body.passwordToken){
        return res.status(401).json({message:"this link is invalid!"}); 
      }
      if(fetchedUSer.passwordTokenExpitation < datenow ){
        return res.status(401).json({message:"link expired try again !"}); 
      }
      const newPassword = bcrypt.hash(req.body.password,10)
      Users.updateOne({email: req.body.email}, {password:newPassword});
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"});
    })
});

module.exports = router;