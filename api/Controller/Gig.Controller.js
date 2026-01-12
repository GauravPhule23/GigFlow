const Gig = require('../Model/gig.Model')
const apiResponse = require('../Utils/apiResponse.Utils')
const apiError = require('../Utils/apiError.Utils')

async function postGig(req,res){
  try {
    let {title, description, budget, completionDate} = req.body
    if(!description){
      description=null;
    }
    const newGig = await Gig.create({
      ownerId:req.user._id,
      title,
      description,
      budget,
      completionDate
    })

    res.status(201).json(new apiResponse(201,"Gig created",newGig));
    return

  } catch (e) {
    res.status(500).json(new apiError(500,"Internal Error",e));
    return
  }
}

async function searchGig(req,res){
  try {
    const {status, self, page=1, limit=10} = req.query

    const query = {};
    if(status){
      query.status = status;
    }
    if(self){
      query.ownerId = req.user._id
    }
    const skip = (Number(page)-1)*Number(limit);
    const gigs = await Gigs.find(query)
    .sort({createdAt:-1})
    .skip(skip)
    .limit(Number(limit))
    .populate('ownerId','fName lName')

    return res.status(200).json(
      new apiResponse(200, "Gigs fetched", { gigs, total:Object.keys(gigs).length, page: Number(page) })
    );

  } catch (e) {
    return res.status(500).json(new apiError(500, "Server Error", e));
  }
}

async function getGig(req,res){
  try {
    const id = req.params.id
    if(!id){
      return res.status(400,"Gig id required")
    }
    const detail = await Gig.findById(id)
    if(!detail){
      return res.status(404,"Gig no found")
    }

    return res.status(200).json(new apiResponse(200,"Gig details",detail))
  } catch (e) {
    return res.status(500).json(new apiError(500, "Server Error", e));
  }
}


module.exports={
  postGig,
  searchGig,
  getGig
}
