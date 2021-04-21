const express = require("express");

const router = express.Router();

//const Managers = require("../models/users");
const Managers = require("../models/managers");


router.post("/post", (req, res, next) => { //to add posts to the db
     const post = req.body;
    //console.log(req);
    //console.log(req.body.name.Prefix);
    const manager = new Managers({
        email: req.body.email,
        name: {
            prefix: req.body.name.prefix,
            firstName: req.body.name.firstName,
            middleName: req.body.name.middleName,
            lastName: req.body.name.lastName
        },
        password: req.body.password,
        retypePassword: req.body.retypePassword,
        phone: req.body.phone,

        address: {
            streetAddress: req.body.address.streetAddress,
            city: req.body.address.city,
            postalCode: req.body.address.postalCode
        },
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
        name: {
            prefix: req.body.name.prefix,
            firstName: req.body.name.firstName,
            middleName: req.body.name.middleName,
            lastName: req.body.name.lastName
        },
        email: req.body.email,
        phone: req.body.phone,

        address: {
            streetAddress: req.body.address.streetAddress,
            city: req.body.address.city,
            postalCode: req.body.address.postalCode
        },
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



