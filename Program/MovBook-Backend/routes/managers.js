const express = require("express");

const router = express.Router();

//const Managers = require("../models/users");
const Managers = require("../models/managers");


// router.post("/post", (req, res, next) => { //to add posts to the db
//     // const post = req.body;
//     console.log(req)
//     const abc = new Managers({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         status: req.body.status,
//         type: req.body.type,
//         phone: req.body.phone,
//         address: req.body.address,
//     });

//     //console.log(post);

//     abc.save().then(results => {
//         res.status(201).json({
//             message: 'post added successfully',
//             postId: results._id
//         });
//     });

// });
router.post("/post", (req, res, next) => { //to add posts to the db
    // const post = req.body;
    console.log(req)
    const manager = new Managers({
        Prefix: req.body.Prefix,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.RetypePassword,
        RetypePassword: req.body.RetypePassword,
        Phone: req.body.Phone,
        StreetAddress: req.body.Phone,
        City: req.body.Phone,
        PostalCode: req.body.Phone,
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
            console.log(documents);
            res.status(200).json({
                message: 'posts  fetched successfully!',
                ManagerDetails: documents
            });
        });
});


//update
// router.put('/update/:id', (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);

//     var managerUpdate = {
//         Prefix: req.body.Prefix,
//         FirstName: req.body.FirstName,
//         MiddleName: req.body.MiddleName,
//         LastName: req.body.LastName,
//         Email: req.body.Email,
//         RetypePassword: req.body.RetypePassword,
//         Phone: req.body.Phone,
//         StreetAddress: req.body.Phone,
//         City: req.body.Phone,
//         PostalCode: req.body.Phone,
//     };
//     Managers.findByIdAndUpdate(req.params.id, { $set: managerUpdate }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2)); }
//     });
// });



router.put('update/:id', (req, res, next) => {
    Managers.updateOne({ Email: req.params.id }, { 
        // name: req.body.Fname, 
        // address: req.body.Address, 
        // phone: req.body.Mnumber 

        Prefix: req.body.Prefix,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Email,
        RetypePassword: req.body.RetypePassword,
        Phone: req.body.Phone,
        StreetAddress: req.body.Phone,
        City: req.body.Phone,
        PostalCode: req.body.Phone,

    })
        .then((data) => {
            console.log(data);
        })
});



//delete manager details
router.delete("/delete/:id", (req, res, next) => {
    Managers.deleteOne({ _id: req.params.id }).then(result => {

        console.log(req.params.id);
        res.status(200).json({ message: 'post deleted!' });
    })
});


//sidebar Manager Details
router.get('', (req, res, next) => {
    var Email = req.query.Email || "";
    Managers.findOne({ Email: Email })
        .then((data) => {
            console.log(data);
            res.send(data)
        }).catch(err => {
            res.status.send({
                message: err.message
            })
        })
});

module.exports = router;



