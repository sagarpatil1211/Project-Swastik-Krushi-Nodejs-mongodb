var express = require("express");
var mongoose = require("mongoose");
var Farmer = require("../models/Farmer");
let Recommendation = require("../models/Recommendation");
let fs = require("fs");
const { route } = require("./login");

let router = express.Router();

router.post("/", async(req,res)=>{
    let body = req.body;
    let farmers = new Farmer(body);
    farmers.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}))
    })
});

router.get("/", async(req,res)=>{
    Farmer.find().sort({name:1}).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.get("/:id", async(req,res)=>{
    Farmer.findById(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.put("/:id",(req,res)=>{
    let body = req.body;
    Farmer.findByIdAndUpdate(req.params.id,body).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.delete("/:id",(req,res)=>{
    Farmer.findByIdAndDelete(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.post("/recommendation", (req, res)=>{
    let recommendation = new Recommendation(req.body);
    recommendation.save().then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}))
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}))
    })
});

router.get("/recommendation/:farmerid", (req, res)=>{
    Recommendation.find({farmerid:req.params.farmerid}).populate({path:"cropid", select:["name"]}).sort({rdate:1}).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});

router.delete("/recommendation/:id", (req, res)=>{
    Recommendation.findByIdAndDelete(req.params.id).then((result)=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },(err)=>{
        res.end(JSON.stringify({status:"failed", data:err}));
    })
});


module.exports = router;