const express = require('express');
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");

const Movies = require('./models/post');
const app = express();
mongoose.connect("mongodb+srv://test:test@movbook-db-primary.axmm8.mongodb.net/movbookdb-primary?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true})
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


app.get('/api/movies' ,(req,res,next)=>{
  Movies.find({})
    .then((data)=>{
      console.log(data);
      res.send(data)
    }).catch(err => {
      res.status.send({
        message: err.message
      })
    })
});

module.exports = app;
