const express = require("express");

const router = express.Router();

const bookings = require("../models/bookings");
const showingCinemaHalls = require("../models/showing-cinema-halls");
// Making Booking
router.post('/add', (req, res, next) => {
    // Implemented by Mr. R.P. Ladduwahetty with Support of Mr. H.V.L Hasanka
    console.log(req.body)
    var seatsArray;
    var slotObjectId
    seatsArray = req.body.movieTickets.seatNumbers;
    slotObjectId = req.body.movieTickets.slotObjectId

    bookings.create(req.body).then((data) => {
        // console.log(data)
        seatsArray.forEach(seatReservation);
        function seatReservation(seat) {
            // console.log(seat)
            // console.log(slotObjectId)
            // console.log(seatsArray)
            showingCinemaHalls.findOneAndUpdate({
                'slotObjectId': slotObjectId,
                'showingSeatDetails.seatNumber': seat
            },
                {
                    $set: { 'showingSeatDetails.$.seatStatus': "Reserved" }
                })
        }
    }).then((data) => {
        // console.log(data)
        res.send(JSON.stringify('Booking Stored'))
    }).catch(err => {
        res.send(JSON.stringify("Not stored: " + err))
    })
});
module.exports = router;