const User = require('../Model/user.Model')
const apiResponse = require('../Utils/apiResponse.Utils')
const apiError = require('../Utils/apiError.Utils')

// handels signup

async function sign_up(req,res){
  try {
    const {fName, lName, email, password} = req.body;
    
    const isUser = await User.find({email});
    console.log("inside "+isUser)
    if(isUser===undefined){
      console.log("inside inside")
      res.status(409).json(new apiError(409,"email already exists"))
      return
    }
    console.log("bfr creation")
    
    const user = await User.create({
      fName,
      lName,
      email,
      password
    })
    
    console.log("aftr creation")
    const resData={
      _id:user._id,
      fName:user.fName,
      lName:user.lName,
      email:user.email
    }
    console.log("awhile response")

    res.status(201).json(new apiResponse(201,"User Created",resData))
    return
  } catch (e) {
    console.log(e);
    res.status(500).json(new apiError(e.statusCode,e.message,e))
    return
  }
}

// handels signin

async function login(req,res){
  try {
    const {email, password} = req.body;
    
    const isUser = await User.findOne({email});
    console.log("inside login")
    if(!isUser){
      console.log("inside login 2")
      const error = new apiError(404,"Invalid email")
      res.status(404).json(error)
      return
    }
    console.log("inside login bfr token generation")
    
    const token = await isUser.signinUser(password)
    console.log("inside login aftr token generation")
    if(!token){
      console.log("token failed")
      res.status(409).json(new apiError(409,"invalid email or password"))
      return
    }
    console.log("bfr options")
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'none' 
    };
    console.log("aftr options")
    
    res.status(200).cookie("token", token, options).json(new apiResponse(200, "User logged in successfully", { token }));
    console.log("aftr response")
    return
  } catch (e) {
    console.log(e);
    res.status(500).json(new apiError(500,"Internal Server Error",e))
    return
  }
}

// handels logout
async function logout(req,res){
  try{
    res.status(200).clearCookie("token", { 
      httpOnly: true,
      sameSite: "none", 
      secure: true    // Set to true if using HTTPS
    }).json(new apiResponse(200,"User logged out"));
  }catch(e){
    res.status(500).json({ success: false, message: "Logout failed" });
  }
}

module.exports={
  sign_up,
  login,
  logout
}

