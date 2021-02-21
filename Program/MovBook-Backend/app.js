const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const beveragesRoutes = require("./routes/beverages");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const loyaltyRoutes= require("./routes/loyalty");
const bookingHistory = require("./routes/bookingHistory");
const managerRoutes = require("./routes/managers");
const cinemaHallRoutes = require("./routes/cinema-hall");
const upcomingMovieSearchResults = require("./routes/upcomingMovieSearchResults");

const app = express();

// Database Connectivity
mongoose
  .connect(
    process.env.MONGODB_ATLAS_URI_PRIMARY,
// Legacy Server Support Added, Server timeout set to 30 seconds
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
    "GET,POST,DELETE,PATCH,PUT,OPTIONS"
  );
  next();
});

app.use("/api/movies", moviesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/beverages", beveragesRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/booking-history", bookingHistory);
app.use("/api/omdb/upcoming-movies/", upcomingMovieSearchResults);
app.use("/api/managers", managerRoutes);
app.use("/api/cinema-hall", cinemaHallRoutes);

module.exports = app;
