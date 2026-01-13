const { Router } = require('express');
const apiError = require('../Utils/apiError.Utils');
const apiResponse = require('../Utils/apiResponse.Utils');

const router = Router();



router.get('/auth',(req,res)=>{
  try {
    if(req.user === undefined){
      return res.status(401).json(new apiError(401,["User not authenticated"]))
    }
    return res.status(200).json(new apiResponse(200,"User is registered",req.user))
  } catch (e) {
    
    return res.status(500).json(new apiError(500,["Server Error",e]))
  }
})

router.get('/health',(req,res)=>{
 try {
      return res.status(200).json({message:"good"})
  } catch (e) {
     return res.status(500).json(new apiError(500,["Server Error",e]))
  } 
})



module.exports = router