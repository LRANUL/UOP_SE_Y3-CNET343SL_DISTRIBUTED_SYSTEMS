const express = require("express");

const router = express.Router();

//const Managers = require("../models/users");
const Managers = require("../models/managers");


router.post("/post", (req, res, next) => { //to add posts to the db
    // const post = req.body;
    //console.log(req)
    const manager = new Managers({
        Prefix: req.body.Prefix,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.RetypePassword,
        RetypePassword: req.body.RetypePassword,
        Phone: req.body.Phone,
        StreetAddress: req.body.StreetAddress,
        City: req.body.City,
        PostalCode: req.body.PostalCode,
    });

    //console.log(post);

    manager.save().then(results => {
        res.status(201).json({
            message: 'Post Added Successfully',
            postId: results._id
        });
    });

});


//get manager details
router.get('/get', (req, res, next) => { //to fetch posts from db
    Managers.find()
        .then((documents) => {
            //console.log(documents);
            res.status(200).json({
                message: 'Data Retrieved',
                ManagerDetails: documents
            });
        });
});


//get manager details 
router.get('/get/:id', (req, res, next) => { //to fetch posts from db
    Managers.findById(req.params.id)
        .then((documents) => {
            //console.log(documents);
            res.status(200).json({
                message: 'Data Retrieved',
                ManagerDetails: documents
            });
        });
});

//get manager profile 
router.get('/:email', (req, res, next) => { //to fetch posts from db
    console.log(req.params.email)

    Managers.findOne({ Email: req.params.email })
        .then((manager) => {
            console.log(manager)
            res.json(manager);
        });
});


//update
router.put('/update/:id', (req, res) => {

    const managerUpdate = new Managers({
        _id: req.params.id,
        Prefix: req.body.Prefix,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        StreetAddress: req.body.StreetAddress,
        City: req.body.City,
        PostalCode: req.body.PostalCode,
    });
    //console.log("******************************************************")
    //console.log(managerUpdate)
    Managers.updateOne({ _id: req.params.id }, managerUpdate).then(res => {

    })

});



//delete manager details
router.delete("/delete/:id", (req, res, next) => {
    Managers.deleteOne({ _id: req.params.id }).then(result => {

        //console.log(req.params.id);
        res.status(200).json({ message: 'post deleted!' });
    })
});


//sidebar Manager Details
router.get('', (req, res, next) => {
    var Email = req.query.Email || "";
    Managers.findOne({ Email: Email })
        .then((data) => {
            //console.log(data);
            res.send(data)
        }).catch(err => {
            res.status.send({
                message: err.message
            })
        })
});

module.exports = router;



