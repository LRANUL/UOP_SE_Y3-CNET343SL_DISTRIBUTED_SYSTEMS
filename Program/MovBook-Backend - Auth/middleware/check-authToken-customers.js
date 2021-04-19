const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  
  try{
    const token = req.headers.authorization.split(" ")[1]; 
    jwt.verify(token,"The_Customers_secrets_1" );
    next();
  }
  catch(err){
    res.status(401).json({message: "auth Failed!! "});
  }


}