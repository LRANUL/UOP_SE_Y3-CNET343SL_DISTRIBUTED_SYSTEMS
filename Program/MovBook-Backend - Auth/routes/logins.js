const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");


const logins = require("../models/logins");
const customers = require("../models/customers");
const admin = require("../models/admin");
const operator = require("../models/operators");
const manager = require("../models/managers");
const nodemailer =require("nodemailer");
const sendgridTransport =require("nodemailer-sendgrid-transport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport(sendgridTransport({
   auth:{
    api_key:process.env.SENDGRID_API_KEY
   }
}))



//creating user with pasword and email 
router.post("/signup",(req , res, next)=>{
  bcrypt.hash(req.body.password,10)
    .then(hash =>{
      const user = new logins({
        email:req.body.email,
        password:hash,
        name: req.body.prefix+" "+req.body.fName+" "+req.body.lName,
        status: "Online",
        type: "Customer",
        address: req.body.city,
        phone: req.body.phone
      });
      
      user.save()
        .then(result =>{
          console.log("user Created")
           res.status(201).json({
             message:"customer created!!",
             result : result
           });
        });
    })
      .catch(err =>{
        res.status(500).json({ error:err })
      });
});
//manager creation fName, mName,lName,phone,streetAddress,city,postalCode,
router.post("/manager-signup",(req , res, next)=>{
    bcrypt.hash(req.body.password,10)
      .then(hash =>{
        const user = new logins({
          email:req.body.email,
          password:hash,
          name: req.body.prefix+" "+req.body.fName+" "+req.body.lName,
          status: "Online",
          type: "Manager",
          address: req.body.city,
          phone: req.body.phone
        });
        
        user.save()
          .then(result =>{
            const mger = new manager({
                email: req.body.email,
                name:
                {
                    prefix: req.body.prefix,
                    firstName: req.body.fName,
                    middleName: req.body.mName,
                    lastName: req.body.lName,
                },
                phone: req.body.phone,
                address: {
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    postalCode: req.body.postalCode
                },
                registerdDateTime: new Date()
                
            })
            mger.save().then((result)=>{
                console.log("Manager Created")
                res.status(201).json({
               message:"Manager created!!",
               result : result
             });
            })
            
          });
      })
        .catch(err =>{
          res.status(500).json({ error:err })
        });
  });

  //manager creation fName, mName,lName,phone,streetAddress,city,postalCode,
router.post("/operator-signup",(req , res, next)=>{
    bcrypt.hash(req.body.password,10)
      .then(hash =>{
        const user = new logins({
          email:req.body.email,
          password:hash,
          name:req.body.prefix+" "+req.body.fName+" "+req.body.lName, 
          status: "Online",
          type: "Operator",
          address: req.body.city,
          phone: req.body.phone
        });
        
        user.save()
          .then(result =>{
            const Oprt = new operator({
                email: req.body.email,
                name:
                {
                    prefix: req.body.prefix,
                    firstName: req.body.fName,
                    middleName: req.body.mName,
                    lastName: req.body.lName,
                },
                phone: req.body.phone,
                address: {
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    postalCode: req.body.postalCode
                },
                accountStatus: "enabled",
                registerdDateTime: new Date()
                
            })
            Oprt.save().then((result)=>{
                console.log("Manager Created")
                res.status(201).json({
               message:"Manager created!!",
               result : result
             });
            })
            
          });
      })
        .catch(err =>{
          res.status(500).json({ error:err })
        });
  });



//get user data with id
router.get('/:email' ,(req,res,next)=>{
    logins.findOne({email: req.params.email})
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
    logins.updateOne({email: req.params.id}, {name: req.body.Fname, address: req.body.Address, phone: req.body.Mnumber})
  .then((data) => {
    console.log(data);
  })
});

//Customer login

router.post("/customer-login",(req,res,next)=>{
    let fetchedUSer;
    logins.findOne({ email:req.body.email })
      .then(user =>{
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
                  'The_Customers_secrets_1',
                    {expiresIn: "1h"}); 
              res.status(200).json({
                  token: token ,
                  expiresIn:3600, 
                  userId:fetchedUSer._id,
                  email:fetchedUSer.email,
                  prefix:fetchedUSer.name.split(" ")[0],
                  fName:fetchedUSer.name.split(" ")[1],
                  mName:fetchedUSer.name.split(" ")[2],
                  lName:fetchedUSer.name.split(" ")[3] 
                })
            
               
              console.log(fetchedUSer._id + ' ' +'customer Logged in');
              
          
        }
        else if(bcryptResult == false){
          return res.status(401).json({ message:"Wrong user Password"});
        }
      })
      .catch(err =>{
        return res.status(401).json({ message:"Authentication failed"})
      })
  });


//manager login
router.post("/manager-login",(req,res,next)=>{
    let fetchedUSer;
    logins.findOne({ email:req.body.email })
      .then(user =>{
        if(!user){
          return res.status(401).json({message:"Unregisterd Email!"}); 
        }
        if(user.type != "Manager"){
          return res.status(401).json({message:"user type mismatch"}); 
        }else{
          fetchedUSer = user;
          return bcrypt.compare(req.body.password ,user.password);
        }
      })
      .then(bcryptResult =>{
         
        if(bcryptResult == true){
           
              const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                  'The_manager_secrets_2',
                    {expiresIn: "1h"}); 
              res.status(200).json({
                  token: token ,
                  expiresIn:3600, 
                  userId:fetchedUSer._id,
                  email:fetchedUSer.email,
                  prefix:fetchedUSer.name.split(" ")[0],
                  fName:fetchedUSer.name.split(" ")[1],
                  mName:fetchedUSer.name.split(" ")[2],
                  lName:fetchedUSer.name.split(" ")[3] 
                })
            
               
              console.log(fetchedUSer._id + ' ' +'manager Logged in');
              
          
        }
        else if(bcryptResult == false){
          return res.status(401).json({ message:"Wrong user Password"});
        }
      })
      .catch(err =>{
        return res.status(401).json({ message:"Authentication failed"})
      })
  });

//operator -login
router.post("/operator-login",(req,res,next)=>{
    let fetchedUSer;
    logins.findOne({ email:req.body.email })
      .then(user =>{
        if(!user){
          return res.status(401).json({message:"Unregisterd Email!"}); 
        }
        if(user.type != "Operator"){
          return res.status(401).json({message:"user type mismatch"}); 
        }else{
          fetchedUSer = user;
          return bcrypt.compare(req.body.password ,user.password);
        }
      })
      .then(bcryptResult =>{
         
        if(bcryptResult == true){
           
              const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                  'The_operator_secrets_3',
                    {expiresIn: "1h"}); 
              res.status(200).json({
                  token: token ,
                  expiresIn:3600, 
                  userId:fetchedUSer._id,
                  email:fetchedUSer.email,
                  prefix:fetchedUSer.name.split(" ")[0],
                  fName:fetchedUSer.name.split(" ")[1],
                  mName:fetchedUSer.name.split(" ")[2],
                  lName:fetchedUSer.name.split(" ")[3] 
                })
               
              console.log(fetchedUSer._id + ' ' +'Operator Logged in');
              
          
        }
        else if(bcryptResult == false){
          return res.status(401).json({ message:"Wrong user Password"});
        }
      })
      .catch(err =>{
        return res.status(401).json({ message:"Authentication failed"})
      })
  });

//admin -login
router.post("/Admin-login",(req,res,next)=>{
  let fetchedUSer;
  logins.findOne({ email:req.body.email })
    .then(user =>{
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
         admin.findOne({ emailAddress:req.body.email }).then((response)=>{
            const token = jwt.sign({email: fetchedUSer.email , userId: fetchedUSer._id},
                'The_admin_secrets_4',
                  {expiresIn: "1h"}); 
            res.status(200).json({ 
                token: token ,expiresIn:3600, 
                userId:fetchedUSer._id,
                email:fetchedUSer.email,
                prefix:response.name.prefix,
                fName:response.name.firstName ,
                mName:response.name.middleName ,
                lName:response.name.lastName});
            console.log(fetchedUSer._id + ' ' +'Admin Logged in');
            })
        
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Wrong user Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Authentication failed"})
    })
});

router.post("/forgotPassword",(req , res, next)=>{
    console.log(req.body.email)
        const email = req.body.email;
        logins.findOne({email:email})
          .then(result =>{
            if(!result){
             return res.status(404).json({message:"invalid email"});
            }
            
              const resetToken = jwt.sign({email: req.body.email },'password-reset',{expiresIn: "1h"}); 
              console.log(email);
              transporter.sendMail({
                to:email,
                from:"movbook.team@gmail.com",
                subject:"password reset",
                html:"<a href='http://localhost:49624/new-password/"+email+"/"+resetToken+"'>click on this link to change your password</a>"
                
              }).then((reply)=>{
                
                const datenow = new Date();
                let tokenExiration =datenow.setHours(datenow.getHours()+2);
                
                logins.updateOne({email: email}, {passwordResetToken:resetToken,passwordTokenExpitation:tokenExiration})
                  .then((data) => {
                          res.status(201).json({message:"password token updated"});
                      })
              }) 
          })
        .catch(err =>{
          res.status(500).json({ error:err })
        });
  });

//password forget
// router.post("/forgotPassword",(req , res, next)=>{
//     console.log(req.body.email)
//     const email = req.body.email;
        
//     logins.findOne({email:email})
//       .then(result =>{
  
//       if(!result){
//         return res.status(404).json({message:"invalid email"});
//       }
          
//       const resetToken = jwt.sign({email: req.body.email },'password-reset',{expiresIn: "1h"}); 
//       console.log(resetToken);
  
//       // Defining email template ID
//       let passwordResetEmailTemplateId = "d-5a26f36338554f03bda21ffb765699f1";
  
//       // Defining dynamic values for the email template
//       let dynamicTemplateData = {
//         passwordResetLink: `http://localhost:49624/new-password/${email}/${resetToken}`
//       };
//       console.log("email");
//       // Email configuration to send a valid email
//       const emailConfigurations = {
//         to: passedEmailAddress,
//         from: { 
//           name: "MovBook Team", 
//           email: "movbook.team@gmail.com" 
//         },
//         templateId: passwordResetEmailTemplateId,
//         dynamic_template_data: dynamicTemplateData
//       };
//       console.log("*******");
//       // Sending new email through Send Grid
//       sgMail.send(emailConfigurations).then((emailResponse) => {
        
//         const datenow = new Date();
//         let tokenExiration =datenow.setHours(datenow.getHours()+2);
        
//         logins.updateOne({email: email}, {passwordResetToken:resetToken,passwordTokenExpitation:tokenExiration})
//           .then((data) => {
//             res.status(201).json({message:"password token updated"});
//             console.log("Password Resent Email Sent: ", { passwordResetEmailTemplateId, dynamicTemplateData });
//             console.log('Email Response: ', emailResponse);
//         })
       
  
//       })
//       .catch((error) => {
//         console.error("Error (send grid error): ", error.toString());
//         res.status(500).json({ error: error })
//       });
//     })
//     .catch(err =>{
//       res.status(500).json({ error:err })
//     });
    
//   });



//change password
router.post("/change-password",(req , res, next)=>{
  let fetchedlogin;
  console.log(req.body);
  logins.findOne({ email:req.body.email })
    .then(user =>{
      if(!user){
        return res.status(401).json({message:"Unregisterd Email!"}); 
      }
      fetchedlogin = user;
      console.log(fetchedlogin.password);
     return bcrypt.compare(req.body.oldPassword,fetchedlogin.password)

    })
    .then((bcryptResult)=>{
        let newPassword;
        console.log(bcryptResult);
      if(bcryptResult != true){
        return res.status(401).json({ message:"Wrong user Password"})
      }
      console.log(req.body.newPassword);
      bcrypt.hash(req.body.newPassword,10).then((hash)=>{
          logins.updateOne({email: req.body.email}, {password:hash})
          .then((data) => {
            res.status(200).json({ message:"Password Updated "});
            console.log("admin" + ' ' +'password changed');
          });
        })
      
      
    })
    .catch(err =>{
      return res.status(401).json({ message:"Password Change Failed "})
    })
});


//new password from forgot password 
router.post("/new-password",(req , res, next)=>{
  console.log(req.body.passwordToken);
  let fetchedUSer;
  let datenow = new Date();
  logins.findOne({ email:req.body.email })
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
        logins.updateOne({email: req.body.email}, {password:newPassword});
      res.status(201).json({message:"new Password added succcessfully"})
      }
      
    })
    .catch(err =>{
      return res.status(401).json({ message:"Auth failed"});
    })
});

//Admin login-check
router.post("/Admin-login-check",(req,res,next)=>{
  let fetchedUSer;
  logins.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Enter the correct Email, Login check failed!"}); 
      }
      if(user.type != "Admin"){
        return res.status(401).json({message:"user type mismatch. Login check failed! "}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        
      res.status(200).json({ message:"Login Check Success!! "});
     
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Enter the correct Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Login check failed "})
    })
});

//operator-login-check
router.post("/operator-login-check",(req,res,next)=>{
  let fetchedUSer;
  logins.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Enter the correct Email"}); 
      }
      if(user.type != "Operator"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
      
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        
      res.status(200).json({ message:"Login Check Success!! "});
     
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Enter the correct Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Login check failed "});
    })
});

//customer-login-check
router.post("/customer-login-check",(req,res,next)=>{
  
  logins.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Enter the correct Email"}); 
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
        
      res.status(200).json({ message:"Login Check Success!! "});
     
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Enter the correct Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Login check failed "})
    })
});


//manager-login-check
router.post("/manager-login-check",(req,res,next)=>{
  let fetchedUSer;
  logins.findOne({ email:req.body.email })
    .then(user =>{
      console.log(user);
      if(!user){
        return res.status(401).json({message:"Enter the correct Email"}); 
      }
      if(user.type != "Manager"){
        return res.status(401).json({message:"user type mismatch"}); 
      }else{
        fetchedUSer = user;
        return bcrypt.compare(req.body.password ,user.password);
      }
    })
    .then(bcryptResult =>{
      if(bcryptResult == true){
        
      res.status(200).json({ message:"Login Check Successful"});
     
      }
      else if(bcryptResult == false){
        return res.status(401).json({ message:"Enter the correct Password"});
      }
    })
    .catch(err =>{
      return res.status(401).json({ message:"Login check failed "})
    })
});

module.exports = router;
