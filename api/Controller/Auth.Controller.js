const User = require('../Model/user.Model')
const apiResponse = require('../Utils/apiResponse.Utils')
const apiError = require('../Utils/apiError.Utils')



async function sign_up(req,res){
  try {
    const {fName, lName, email, password} = req.body;
    
    const isUser = await User.find({email});
    if(isUser){
      res.status(409).json(new apiError(409,"email already exists"))
      return
    }

    const user = await User.create({
      fName,
      lName,
      email,
      password
    })

    const resData={
      _id:user._id,
      fName:user.fName,
      lName:user.lName,
      email:user.email
    }

    res.status(201).json(new apiResponse(201,"User Created",resData))
    return
  } catch (e) {
    console.log(e);
    res.status(500).json(new apiError(500,"Internal Server Error",e))
    return
  }
}


async function login(req,res){
  try {
    const {email, password} = req.body;
    
    const isUser = await User.find({email});
    if(!isUser){
      res.status(404).json(new apiError(404,"user not found"))
      return
    }

    const token = await user.sign_in_user(password)
    if(!token){
      res.status(409).json(new apiError(409,"invalid email or password"))
      return
    }
    const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' 
  };
    
    res.status(200).cookie("accessToken", token, options).json(new apiResponse(200, "User logged in successfully", { user, token }));
    return
  } catch (e) {
    console.log(e);
    res.status(500).json(new apiError(500,"Internal Server Error",e))
    return
  }
}

module.exports={
  sign_up,
  login
}

