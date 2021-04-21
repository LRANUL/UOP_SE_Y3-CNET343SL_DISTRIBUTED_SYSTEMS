const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Customers = require("../models/customers");
const Users = require("../models/users");
const customers = require("../models/customers");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      if(user.type != "Customer"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Customer Logged in');
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Wrong user Password"});
      }
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
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      if(user.type != "manager"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'manager Logged in');
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Wrong user Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

router.post("/operator-login",(req,res,next)=>{
  let fetchedUSer;
  Users.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      if(!user.type == "Operator"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Operator Logged in');
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Wrong user Password"});
      }
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
      if(user.type != "Admin"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                            'the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this',
                              {expiresIn: "1h"}); 
      res.status(200).json({ token: token ,expiresIn:3600, userId:fetchedUSer._id,email:fetchedUSer.email,name:fetchedUSer.name});
      console.log(fetchedUSer._id + ' ' +'Admin Logged in');
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Wrong user Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"})
    })
});

//password forget
router.post("/forgotPassword",(req , res, next)=>{

  console.log(req.body.email)
  const email = req.body.email;
      
  Users.findOne({email:email})
    .then(result =>{

    if(!result){
      return res.status(404).json({message:"invalid email"});
    }
        
    const resetToken = jwt.sign({email: req.body.email },'password-reset',{expiresIn: "1h"}); 
    console.log(email);

    // Defining email template ID
    let passwordResetEmailTemplateId = "d-5a26f36338554f03bda21ffb765699f1";

    // Defining dynamic values for the email template
    let dynamicTemplateData = {
      passwordResetLink: `http://localhost:49624/new-password/${email}/${resetToken}`
    };

    // Email configuration to send a valid email
    const emailConfigurations = {
      to: passedEmailAddress,
      from: { 
        name: "MovBook Team", 
        email: "movbook.team@gmail.com" 
      },
      templateId: passwordResetEmailTemplateId,
      dynamic_template_data: dynamicTemplateData
    };

    // Sending new email through Send Grid
    sgMail.send(emailConfigurations).then((emailResponse) => {
      
      const datenow = new Date();
      let tokenExiration =datenow.setHours(datenow.getHours()+2);
      
      Users.updateOne({email: email}, {passwordResetToken:resetToken,passwordTokenExpitation:tokenExiration})
        .then((data) => {
          res.status(201).json({message:"password token updated"});
      })
      console.log("Password Resent Email Sent: ", { passwordResetEmailTemplateId, dynamicTemplateData });
      console.log('Email Response: ', emailResponse);

    })
    .catch((error) => {
      console.error("Error (send grid error): ", error.toString());
      res.status(500).json({ error: error })
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
     return bcrypt.compare(req.body.oldPassword,user.password)
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
  console.log(req.body.passwordToken);
  let fetchedUSer;
  let datenow = new Date();
  Users.findOne({ email:req.body.email })
    .then(user =>{
      fetchedUSer = user;
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      else if(fetchedUSer.passwordResetToken!=req.body.passwordToken){
        console.log(req.body.passwordToken);
        console.log(fetchedUSer.passwordResetToken);
        return res.status(401).json({message:"this link is invalid!"}); 
      }
      else if(fetchedUSer.passwordTokenExpitation < datenow ){
        return res.status(401).json({message:"link expired try again !"}); 
      }else{
        const newPassword = bcrypt.hash(req.body.password,10)
      Users.updateOne({email: req.body.email}, {password:newPassword});
      res.status(201).json({message:"new Password added succcessfully"})
      }
      
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"});
    })
});

module.exports = router;