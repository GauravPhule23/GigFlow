const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const apiError = require('../Utils/apiError.Utils');
const { createToken } = require('../Utils/auth.Utils');

// User Moedl creation

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Hashing before saving data to db

userSchema.pre('save', async function (next) {
  try {
    const user = this
    console.log("inside pre")
    if (!user.isModified("password")) return
    console.log("while hash")
    const hashPass = await bcrypt.hash(user.password, 5)
    this.password = hashPass;
    console.log("after hash")
    // next();
  } catch (e) {
    console.log("inside catch")
    throw new apiError(500, e.message)
  }
})

// creating method for sign-in user by creating token

userSchema.method("signinUser", async function (password){
  const user = this
  if (!user) throw new apiError("No User found")
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const token = createToken(user)
    return token;
  } else {
    throw new apiError(400, "Password is incorrect")
    
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User