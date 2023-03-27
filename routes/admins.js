var express = require("express");
var Admin = require("../models/Admin");
let router = express.Router();

router.post("/",(req,res)=>{
    let body = req.body;
    let admin = new Admin(body);
    admin.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}))
    });
});

router.get("/",(req,res)=>{
    Admin.find({}).sort({name:1}).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.get("/:id",(req,res)=>{
    Admin.findById(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.put("/:id",(req,res)=>{
    let body = req.body;
    Admin.findByIdAndUpdate(req.params.id, body).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.delete("/:id",(req,res)=>{
    Admin.findByIdAndDelete(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

module.exports = router;