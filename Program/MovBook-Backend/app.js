const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const beveragesRoutes = require("./routes/beverages");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const loyaltyRoutes= require("./routes/loyalty");
const ticketPriceRoutes= require("./routes/ticket-prices");
const showingCinemaHall = require("./routes/showing-movie-hall");
const bookingHistory = require("./routes/bookingHistory");
const customerRoutes = require("./routes/customer");
const managerRoutes = require("./routes/managers");
const cinemaHallRoutes = require("./routes/cinema-halls");
const cinemaLocationRoutes = require("./routes/cinema-locations");
const upcomingMovieSearchResults = require("./routes/upcoming-movie-search-results");
const bookingDetails = require("./routes/booking-details");
const movieWaitLists = require("./routes/movie-wait-lists");
const movies = require("./routes/movies");

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
    "Origin,X-Requested-With, Content-Type, Accept,authorization"
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
app.use("/api/ticket-prices", ticketPriceRoutes);
app.use("/api/showing-cinema-hall", showingCinemaHall)
app.use("/api/booking-history", bookingHistory);
app.use("/api/booking-details", bookingDetails);
app.use("/api/omdb/upcoming-movies", upcomingMovieSearchResults);
app.use("/api/customers", customerRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/cinema-halls", cinemaHallRoutes);
app.use("/api/cinema-locations", cinemaLocationRoutes);
app.use("/api/movie-wait-lists", movieWaitLists);
app.use("/api/movies", movies);

module.exports = app;
