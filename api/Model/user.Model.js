const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const apiError = require('../Utils/apiError.Utils');
const { createToken } = require('../Utils/auth.Utils');

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  try {
    const user = this
    if (!user.isModified("password")) return
    const hashPass = await bcrypt.hash(user.password, 5)
    this.password = hashPass;
    next();
  } catch (e) {
    throw new apiError(500, e.message, [...e])
  }
})

userSchema.method("sign-in-user", async (password) => {
  const user = await this
  if (!user) throw new apiError("No User found")
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const token = createToken(user)
    return token;
  } else {
    throw new apiError(400, "Password is incorrect")
    return
  }
})

const User = mongoose.model('user', userSchema)

module.exports = User