const express = require("express");
const admin = require("../models/admin");

const router = express.Router();

//const Managers = require("../models/users");



//update Admin by email
router.put('/update', (req, res) => {
    console.log("********")
    console.log(req.body);
    console.log("adminUpdate")
     admin.updateOne({emailAddress:req.body.emailAddress},req.body).then(()=>{
        res.status(201).json({ message:"Admin details updated!! "});
     })

});
//update
router.put('/update/:id', (req, res) => {
    console.log(req.params.id)
    console.log("***************dcdscdscsdc***************************************")
    console.log(req.body)
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

    const adminUpdate = new Admin({
        _id:req.params.id,
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
    console.log("******************************************************")
    console.log(adminUpdate)
    Managers.updateOne({_id:req.params.id},adminUpdate).then(res=>{
        
        console.log(res)
    })

});



//sidebar Admin Details
router.get('/:Email', (req, res, next) => {
    var Email = req.params.Email ;
    console.log(Email);
    admin.findOne({ emailAddress: Email })
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



