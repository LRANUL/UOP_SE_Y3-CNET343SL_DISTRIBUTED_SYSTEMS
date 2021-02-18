const express = require("express");

const router = express.Router();

const Managers = require("../models/users");


router.post("/api/post", (req, res, next) => { //to add posts to the db
    // const post = req.body;
    const abc = new Managers({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone,
        address: req.body.address,
    });

    //console.log(post);

    abc.save().then(results => {
        res.status(201).json({
            message: 'post added successfully',
            postId: results._id
        });
    });

});


//get manager details
router.get('/api/get', (req, res, next) => { //to fetch posts from db
    Managers.find()
        .then((documents) => {
            console.log(documents);
            res.status(200).json({
                message: 'posts  fetched successfully!',
                ManagerDetails: documents
            });
        });
});

//get admin details


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: req.body.status,
        type: req.body.type,
        phone: req.body.phone,
        address: req.body.address,
    };
    Managers.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
    });
});


//edit manager details
//edit admin details

//delete manager details
router.delete("/api/delete/:id", (req, res, next) => {
    Managers.deleteOne({ _id: req.params.id }).then(result => {
        //console.log("**********************************fewefwefwef***************");
        console.log(req.params.id);
        res.status(200).json({ message: 'post deleted!' });
    })
});

module.exports = router;
