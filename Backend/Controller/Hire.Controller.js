const Bid = require('../Model/bid.Model')
const Gig = require('../Model/gig.Model')
const apiError = require('../Utils/apiError.Utils')
const mongoose = require('mongoose')
const apiResponse = require('../Utils/apiResponse.Utils')

async function hireBid(req, res) {
  try {
    const bidId = req.params.bidId
    console.log("inside hireBid")
    const bid = await Bid.findById(bidId).populate("gigId", "ownerId hiredBid")
    
    if (!bid || bid.gigId.ownerId.toString() !== req.user._id || bid.gigId.hiredBid) {
      console.log(bid.gigId.ownerId.toString() !== req.user._id )
      console.log(bid.gigId.ownerId.toString() )
      console.log( req.user._id )
      console.log( bid.gigId.hiredBid )
      return res.status(400).json(new apiError(400,["Invalid request or unauthorized"]))
    }
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const bidUpdated = await Bid.findOneAndUpdate({
        _id: bidId,
        status: 'Pending'
      },
        {
          $set: {
            status: "Hired"
          }
        },
        {
          new: true,
          session: session
        }

      )
      if (!bidUpdated) throw new apiError(500,"Failed to update gig")

      const bidMany = await Bid.updateMany(
        { gigId: bidUpdated.gigId, _id: { $ne: bidId } },
        { $set: { status: 'Rejected' } },
        { session }
      )

      const updateGig = await Gig.findOneAndUpdate(
        { _id: bidUpdated.gigId },
        {
          $set: {
            status: "Assigned",
            hiredBid: bidUpdated._id ?? bidId
          }
        }, {
        new: true,
        session: session
      }
      )

      await session.commitTransaction();
      return res.status(200).json(new apiResponse(200,"Status Updated"))

    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {

      session.endSession();
    }


  } catch (e) {
    return res.status(500).json(new apiError(500, "Server Error", e))
  }
}


module.exports=hireBid
