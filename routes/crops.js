var express = require("express");
var mongoose = require("mongoose");
var Crop = require("../models/Crop");
let fs = require("fs")

let router = express.Router();

router.post("/",async(req,res)=>{
    let body = req.body;
    let crops = new Crop(body);
    crops.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}))
    })
});

router.get("/",(req,res)=>{
    Crop.find().sort({name:1}).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.get("/:id", async(req,res)=>{
    Crop.findById(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.put("/:id",(req,res)=>{
    let body = req.body;
    Crop.findByIdAndUpdate(req.params.id, body).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.delete("/:id",(req,res)=>{
    Crop.findByIdAndDelete(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});


module.exports = router;
