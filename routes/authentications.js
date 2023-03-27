let express = require("express");
var mongoose = require("mongoose");
let Admin = require("../models/Admin");

let router = express.Router();

router.post("/login", (req,res)=>{
    let body = req.body;
    // console.log(body);

    Admin.find({username : body.username, password : body.password}).then((result)=>{
        if (Object.keys(result).length > 0) {
            res.end(JSON.stringify({ status: "success", data: result }))
        }
        else{
        res.end(JSON.stringify({status:"failed", data:"Invalid Credentials"}));

        }
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

module.exports = router;
