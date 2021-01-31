const express = require('express');
const path = require("path");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

//mongoose.connect("mongodb+srv://Ishan:sJWS7z81vPX7lvSN@cluster0.bb1e1.mongodb.net/<dbname>?retryWrites=true&w=majority")
//
const app = express();
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://Ishan:sJWS7z81vPX7lvSN@cluster0.bb1e1.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true})
//mongoose.connect("mongodb+srv://test:test@movbook-db-primary.axmm8.mongodb.net/movbookdb-primary?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true})
.then(() =>{
  console.log('connected to the database');
})
.catch(()=>{
  console.log("connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false })); //parse url encoded data
app.use("/images",express.static(path.join("backend/images")));

app.use((req, res,next)=>{                   // this is to allow approprite headers
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH,OPTIONS");
  next();
});

// sJWS7z81vPX7lvSN

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
