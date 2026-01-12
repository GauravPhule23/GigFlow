const mongoose = require('mongoose')

const bidSchema = new mongoose.Schema({
  freelancerId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
  gigId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'gig'},
  message:{type:String, required:true},
  bidAmt:{type:Number,required:true},
  status:{type:String,enum:["Pending","Hired","Completed","Rejected","Failed-To-complete"],default:"Open"},
},{timestamps:true});


const Bid = mongoose.model('bid',bidSchema)

module.exports=Bid