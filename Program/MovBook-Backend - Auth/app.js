const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


const usersRoutes = require("./routes/logins");


const app = express();

// Database Connectivity
mongoose
  .connect(
    process.env.MONGODB_ATLAS_URI_PRIMARY,
    // Legacy Server Support Added, Server timeout set to 30 seconds
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex:true,
      serverSelectionTimeoutMS: 30000,
      poolSize: 5,
      keepAlive: true,
    }
  )
  .then(() => {
    console.log("Connected Successful");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept,authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,PUT,OPTIONS"
  );
  next();
});


app.use("/api/logins", usersRoutes);


module.exports = app;
