const express = require('express');
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");

const Post = require('./models/post');
//mongoose.connect("mongodb+srv://Ishan:sJWS7z81vPX7lvSN@cluster0.bb1e1.mongodb.net/<dbname>?retryWrites=true&w=majority")
const app = express();
mongoose.connect("mongodb+srv://Ishan:sJWS7z81vPX7lvSN@cluster0.bb1e1.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>{
  console.log('connected to the database');
})
.catch(()=>{
  console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false })); //parse url encoded data

app.use((req, res,next)=>{                   // this is to allow approprite headers
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,DELETE,PATCH,OPTIONS");
  next();
});

// sJWS7z81vPX7lvSN

app.post("/api/posts",(req, res, next)=>{ //to add posts to the db
  // const post = req.body;
  const post = new Post({title: req.body.title , content:req.body.content});
   console.log(post);

   post.save().then(results =>{
    res.status(201).json({
      message:'post added successfully',
      postId: results._id
    });
   });

});

app.get('/api/posts' ,(req,res,next)=>{ //to fetch posts from db
  Post.find()
    .then((documents)=>{
      console.log(documents);
      res.status(200).json({
        message:'posts  fetched successfully!',
        posts: documents
      });
    });
});

app.delete("/api/posts/:id",(req,res,next) =>{
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);

    console.log(req.params.id);
    res.status(200).json({message:'post deleted!'});
  })
});

module.exports = app;
