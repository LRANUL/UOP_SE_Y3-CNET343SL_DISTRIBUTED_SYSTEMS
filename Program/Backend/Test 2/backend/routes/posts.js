const express = require("express");
const Post = require('../models/post');
const multer =require("multer");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png':'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const imgStorage = multer.diskStorage({ //configureing multer
  destination:(req,file,callback)=>{  //this is executed when multer decide to save a file
    const isValid = MIME_TYPE_MAP[file.mimetype]; //this will return nothing if the file is not a png, or jpg
    let errorr = new Error("not valid Mime type");
    if(isValid){ errorr =null; }
    callback(errorr,"backend/images"); //the image will be stored here
  },
  filename: (req,file,cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-'); //split and join google
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+''+Date.now()+'.'+ext);
  }
});

router.post("",multer({storage:imgStorage}).single("image") ,(req, res, next)=>{ //to add posts to the db //this storage is a keyword ,meaning the name cannot be changed //as you can see you can add more funtions after the path,
  // const post = req.body;                                                      //and here .single("image") means multer expects a single file //which is under a image: property in the incoming request
  const url = req.protocol+'://'+req.get("host");
  const post = new Post({
    title: req.body.title,
    content:req.body.content ,
    imagePath:url+"/images/" +req.file.filename //the last part is provided by multer
  });
   console.log(post);
   post.save().then(results =>{
    res.status(201).json({
      message:'post added successfully',
      post:{
        id: results._id,
        title: results.title,
        content: results.content,
        imagePath: results.imagePath
      }
    });
   });
});

router.get("",(req,res,next)=>{ //to fetch all posts from db
  // console.log(req.query);
  const pageSize = +req.query.pageSize; //this lastpart(.pageSize) is upto me to define and when sending request hae to use the same name as well
  const currentPage = req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if(pageSize && currentPage){
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then((documents)=>{
      fetchedPosts = documents;
      return Post.countDocuments();
      })
    .then((count) =>{
      console.log(count);
      res.status(200).json({
        message:"post fetched Successfully!",
        posts:fetchedPosts,
        maxPosts:count
      })
    })

});

router.get("/:id",(req,res,next)=>{ //get a single post
  Post.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json(post);
    }else {
      res.status(404).json({
        message:'Post does not exist'
      });
    }
  });
});

router.put("/:id" ,multer({storage:imgStorage}).single("image") , (req,res,next) =>{  //update a post
   console.log("hiiii")
  let imagePath = req.body.imagePath;
  if(req.file){ 
    const url = req.protocol+'://'+req.get("host");
    imagePath = url+"/images/" +req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath:imagePath
  });
  console.log(post);
Post.updateOne({_id:req.params.id},post).then(result=>{
    console.log(result);
    res.json({message:'update Successfull!'});
  });
});

router.delete("/:id",(req,res,next) =>{ //delete a post
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    console.log(req.params.id);
    res.status(200).json({message:'post deleted!'});
  })
});

module.exports = router;
