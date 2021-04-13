const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const refreshmentsRoutes = require("./routes/refreshments");
const usersRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const operatorRoutes = require("./routes/operators");
const loyaltyRoutes = require("./routes/loyalty");
const showingCinemaHall = require("./routes/showing-movie-hall");
const bookingHistory = require("./routes/bookingHistory");
const bookingRoutes = require("./routes/bookings");
const customerRoutes = require("./routes/customer");
const messagesRoutes = require("./routes/messages");
const managerRoutes = require("./routes/managers");
const adminRoutes = require("./routes/admin");
const cinemaHallRoutes = require("./routes/cinema-halls");
const cinemaLocationRoutes = require("./routes/cinema-locations");
const upcomingMovieSearchResults = require("./routes/upcoming-movie-search-results");
const bookingDetails = require("./routes/booking-details");
const movieWaitLists = require("./routes/movie-wait-lists");
const movies = require("./routes/movies");
const showingExperiences = require("./routes/showing-experiences");
const showingMovies = require("./routes/showing-movies");
const showingCinemaHalls = require("./routes/showing-cinema-halls");

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

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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
app.use("/api/refreshments", refreshmentsRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/operators", operatorRoutes);
app.use("/api/loyalty", loyaltyRoutes);
app.use("/api/showing-cinema-hall", showingCinemaHall)
app.use("/api/booking-history", bookingHistory);
app.use("/api/booking", bookingRoutes);
app.use("/api/booking-details", bookingDetails);
app.use("/api/omdb/upcoming-movies", upcomingMovieSearchResults);
app.use("/api/customers", customerRoutes);
app.use("/api/managers", managerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cinema-halls", cinemaHallRoutes);
app.use("/api/cinema-locations", cinemaLocationRoutes);
app.use("/api/movie-wait-lists", movieWaitLists);
app.use("/api/movies", movies);
app.use("/api/showing-experiences", showingExperiences);
app.use("/api/showing-movies", showingMovies);
app.use("/api/showing-cinema-halls", showingCinemaHalls);

module.exports = app;
