const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const apiError = require('../Utils/apiError.Utils');

const userSchema = new mongoose.Schema({
  fName:{type:String, required:true},
  lName:{type:String},
  email:{type:String,required:true,unique:true},
  password:{type:String,required:true}
},{timestamps:true});

userSchema.pre('save',async function(next){
  try{
    const user = this
    if(!user.isModified("password")) return
    const hashPass = await bcrypt.hash(user.password,5)
    this.password = hashPass;
    next();
  }catch(e){
    throw new apiError(500,e.message,[...e])
  }
})

const User = mongoose.model('user',userSchema)

module.exports=User