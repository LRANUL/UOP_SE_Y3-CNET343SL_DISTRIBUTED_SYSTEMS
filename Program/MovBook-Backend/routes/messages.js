const express = require("express");

const router = express.Router();

const Messages = require("../models/messages");

// Get all Messages - read/sent/reply
router.get('', (req, res, next) => {
    Messages.find({})
        .then((data) => {
            console.log(data);
            res.send(data)
        }).catch(err => {
            res.status.send({
                message: err.message
            })
        })
});

// Get all new sent Messages
router.get('/new', (req, res, next) => {
    Messages.find({ status: 'sent' })
        .then((data) => {
            console.log(data);
            res.send(data)
        }).catch(err => {
            res.status.send({
                message: err.message
            })
        })
});
// Reply Messages
router.put('/reply', (req, res, next) => {
    Messages.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true, useFindAndModify: false }).then((data) => {
            res.send(JSON.stringify('Message Sent'))
        }).catch(err => {
            res.send(JSON.stringify("Not sent: " + err))
        })
});

// Sent Messages
router.post('/sent', (req, res, next) => {
    let newMessage = new Messages(req.body);
    newMessage.save((err, Message) => {
        if (err) {
            res.send(err);
        }
        res.json(Message);
    });
});
// Get all indiviual msgs 
router.get('/:email', (req, res, next) => {
    Messages.find({email: req.params.email})
        .then((data) => {
            console.log(data);
            res.send(data)
        }).catch(err => {
            res.status(404).json({
                message: err.message
            })
        })
});
module.exports = router;