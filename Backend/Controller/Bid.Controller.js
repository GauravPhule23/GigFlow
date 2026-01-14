const Bid = require("../Model/bid.Model")
const Gig = require("../Model/gig.Model")
const apiResponse = require("../Utils/apiResponse.Utils")
const apiError = require("../Utils/apiError.Utils")

// handels post bid

async function postBid(req, res) {
  try {
    const { gigId, message, bidAmt } = req.body
    
    const gigUser = await Gig.findById(gigId).select('ownerId')
    if(req.user._id == gigUser.toString()){
      return res.status(400).json(new apiError(400,"Owner cannot apply"))
    }
    
    const bid = await Bid.create({
      freelancerId:req.user._id,
      gigId,
      message,
      bidAmt
    })

    return res.status(201).json(new apiResponse(201,"bid posted succesfuly",bid))

  } catch (e) {

  }
}
// handels get bids route
async function getBidsForOwner(req,res){
  try {
    const gigId = req.params.gigId
    console.log(gigId + "got")
    const gigUser = await Gig.findById(gigId).select('ownerId')
    console.log(gigUser.ownerId.toString())
    if(gigUser.ownerId.toString()!=req.user._id){
      console.log("inside check")
      return res.status(400).json(new apiError(400,["Not Authorized"]))
    }
    console.log("bfr bids find")
    const bids = await Bid.find({gigId}).populate('freelancerId',"fName lName email")
    console.log("aftr bids find")

    return res.status(200).json(new apiResponse(200,"All bids delivered",{bids}))
  } catch (e) {
    return res.status(500).json(new apiError(500,"Server Error",e))
  }
}

module.exports={
  postBid,
  getBidsForOwner
}