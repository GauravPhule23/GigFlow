import apiError from "../Utils/apiError.Utils";

export function isLogin(req,res,next){
  try {
    if(req.isLoggedIn){
      next();
    }else{
      res.status(400).json(new apiError(400,"User not Logged In"))
      return
    }
  } catch (e) {
    res.status(400).json(new apiError(400,"User not Logged In"))
    return
    
  }
}