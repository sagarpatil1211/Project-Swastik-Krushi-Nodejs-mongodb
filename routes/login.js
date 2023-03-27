let express = require("express");
let bodyparser = require("body-parser");
let Admin = require("../models/Admin");
let router = express.Router();
let jwt = require("jsonwebtoken");

router.post("/", async(req,res)=>{
    let body = req.body;

    Admin.find({username:body.username, password:body.password}, {password:0}).then((result)=>{
        if(result.length > 0){
            let token = jwt.sign({name:result[0].username}, 'swastik', {expiresIn:"10d"});
            res.end(JSON.stringify({status:"success", data:result[0], token:token}));
        }
        else{
            res.end(JSON.stringify({status:"failed", data:"Invalid credentials"}));
        }
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

module.exports = router;