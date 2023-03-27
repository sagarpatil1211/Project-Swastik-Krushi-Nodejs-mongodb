
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        name:{type:String, required:true},
        email:{type:String},
        mobileno:{type:String, required:true,  unique: true},
        landspace:{type:String, required:true},
        password:{type:String, required:true}
    }
)

let Farmer = mongoose.model("farmers",schema);
module.exports = Farmer;