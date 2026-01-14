const Gig = require('../Model/gig.Model')
const apiResponse = require('../Utils/apiResponse.Utils')
const apiError = require('../Utils/apiError.Utils')

// handels post gig

async function postGig(req,res){
  try {
    console.log("inside")
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
// handels searching of gigs with filters
async function searchGig(req,res){
  try {
    const {search, status, self=false, page=1, limit=10} = req.query

    const query = {};
    if(search){
      query.title = { $regex: search, $options: "i" };
    }
    if(status){
      query.status = status;
    }
    if(self){
      query.ownerId = req.user._id
    }
    const skip = (Number(page)-1)*Number(limit);
    console.log("inside gig search bfr search")
    const gigs = await Gig.find(query)
    .sort({createdAt:-1})
    .skip(skip)
    .limit(Number(limit))
    .populate('ownerId','fName lName')
    
    console.log("inside gig search aftr search")
    return res.status(200).json(
      new apiResponse(200, "Gigs fetched", { gigs, total:Object.keys(gigs).length, page: Number(page) })
    );

  } catch (e) {
    return res.status(500).json(new apiError(e.code, e.message, e));
  }
}

// sends details of respective gig

async function getGig(req,res){
  try {
    const id = req.params.id
    if(!id){
      return res.status(400,"Gig id required")
    }
    const detail = await Gig.findById(id).populate([{
      path:'ownerId',
      select:'fName lName'
    },{
      path:'hiredBid',
      select: 'freelancerId amount', // Select fields from the Bid document
    populate: {
      path: 'freelancerId',        // This field is inside the 'Bid' model
      select: 'fName lName'
      }
    }])
    if(!detail){
      return res.status(404,"Gig no found")
    }
    console.log(detail)

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
