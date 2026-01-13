const mongoose = require('mongoose')

const gigSchema = new mongoose.Schema({
  ownerId:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'user'},
  title:{type:String, required:true},
  description:{type:String},
  budget:{type:Number,required:true},
  status:{type:String,enum:["Open","Assigned","Completed"],default:"Open"},
  hiredBid:{type:mongoose.Schema.Types.ObjectId, ref:'bid'},
  completionDate:{type:Date,required:true},
},{timestamps:true});


const Gig = mongoose.model('gig',gigSchema)

module.exports=Gig