const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
  // const token = req.query.auth
  try{
    const token = req.headers.authorization.split(" ")[1]; //why the .split and [1]? to be continued inthe front end..simple answer -becuase its a convention ..try this if you still didnt get it console.log("helloo hii".split(" ")[0]);  and console.log("helloo hii".split(" ")[1]);
                                                          //try this, future me if you still didnt get it console.log("helloo hii".split(" ")[0]);  and console.log("helloo hii".split(" ")[1]);
    jwt.verify(token,"the_key_that_is_used_to_create_a_uniquie_key_it_should_be_longer_than_this" );
    next();
  }
  catch(err){
    res.status(401).json({message: "auth Failed!! "});
  }


}