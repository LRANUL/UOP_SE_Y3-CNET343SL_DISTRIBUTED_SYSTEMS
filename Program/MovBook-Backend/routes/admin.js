const express = require("express");

const router = express.Router();

//const Managers = require("../models/users");
const Admin = require("../models/admin");




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
router.get('', (req, res, next) => {
    var Email = req.query.Email || "";
    Admin.findOne({ Email: Email })
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



