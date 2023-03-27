let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let schema = new Schema(
    {
        farmerid:{type:Schema.Types.ObjectId, ref:"farmers"},
        cropid:{type:Schema.Types.ObjectId, ref:"crops"},
        rdate:{type:Date, required:true},
        dose:{type:String, required:true},
        space:{type:String, required:true},
        drip:{type:String, required:true},
        sparewater:{type:String, required:true}
    }
)

let Recommendation = mongoose.model("recommendations",schema);
module.exports = Recommendation;