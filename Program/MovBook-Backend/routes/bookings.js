const express = require("express");

const router = express.Router();

const bookings = require("../models/bookings");

// Making Booking
router.post('/add', (req, res, next) => {
    console.log( req.body)
    bookings.create(req.body).then((data) => {
        console.log(data)
        res.send(JSON.stringify('Booking Stored'))
    }).catch(err => {
        res.send(JSON.stringify("Not stored: " + err))
    })
});
module.exports = router;