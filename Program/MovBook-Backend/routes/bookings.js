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


// Get count of bookings each month for the past six months (including the current month (seven months))
router.get('/count-bookings-by-months', async (req, res, next) => {

    // Declaration - to store an array of the count of bookings
    let countOfBookingsArray = new Array(7);
    // Assigning the current date time
    let currentDateTime = new Date();
    // To store the status of retrieving the count of bookings from the database
    let bookingCountRetrieved = false;
  
    // For Loop - Initializing the 'countOfBookingsArray' array indexes
    for (let countIndex = 0; countIndex < 7; countIndex++)
        countOfBookingsArray[countIndex] = 0;
    
    // For Loop - Iterating through to retrieve the count of bookings for the past six months
    // Including this month, the loop will iterate six times
    for (let monthIndex = 6; monthIndex > 0; monthIndex--) {
  
        // If the month is not the current month ('monthIndex' == 6), the month will be decremented by one to the previous month
        if(monthIndex != 6){
            currentDateTime.setMonth(currentDateTime.getMonth() - 1);
        }
    
        // Extracting the month value from the 'currentDateTime', Sample: Mar
        let month = (new Date(currentDateTime).toLocaleString('default', { month: '2-digit' }));
        // Extracting the year value from the 'currentDateTime', Sample: 2021
        let year = (new Date(currentDateTime).toLocaleString('default', { year: 'numeric' }));
        // Assigning the regular expression to search for the bookings for each month
        let regexPatternString = `^(\\d\\d)([/]*)([${month}]+)([/]*)([${year}]+)(\\,[ ]*\\d\\d[:]*\\d\\d[:]*\\d\\d)$`;
        // Converting regular expression from string to regex object
        let regexPatternObject = new RegExp(regexPatternString);
  
        // Using mongoose aggregate() functionality to get the count of bookings for each month
        await bookings.aggregate(
        [
            {
                $match: { 
                    "purchaseDate": { 
                        $regex: regexPatternObject 
                    }  
                }
            },
            { 
                $project: { "_id": 0 }
            },
            { "$group": { 
                "_id": "$purchaseDate",
                "count": { "$sum": 1 }
            }}
        ]).exec().then((returnedData) => {
            // Assigning the number of bookings object retrieved to an array element
            countOfBookingsArray[monthIndex] = returnedData.length;
            bookingCountRetrieved = true;
        }).catch((error) => {
            res.status(500).json({
                message:
                    "Unable to retrieve count of bookings", 
                    error
                });
        });
    }
  
    // Checking whether the retrieval of booking count was successful
    if(bookingCountRetrieved == true){
        // Returning a response to the client with the count of bookings
        res.status(200).json({
        message:
            "Bookings count retrieved",
            countOfBookingsArray
        });
    }
    else{
        res.status(500).json({
        message:
            "Unable to retrieve count of bookings"
        });
    }
  });


module.exports = router;
