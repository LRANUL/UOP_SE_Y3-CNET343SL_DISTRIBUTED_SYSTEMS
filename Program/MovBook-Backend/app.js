const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const beveragesRoutes = require("./routes/beverages");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");

const app = express();

mongoose
  .connect(
    "mongodb+srv://test:test@movbook-db-primary.axmm8.mongodb.net/MovBook-DB-Primary?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to the database");
  })
  .catch(() => {
    console.log("connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
  );
  next();
});

app.use("/api/movies", moviesRoutes);
app.use("/api/users",usersRoutes);
app.use("/api/beverages", beveragesRoutes);

module.exports = app;
