const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  
  try{
    const token = req.headers.authorization.split(" ")[1]; 
    jwt.verify(token,"the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this" );
    next();
  }
  catch(err){
    res.status(401).json({message: "auth Failed!! "});
  }


}