const { z } = require('zod')
const apiError = require('../Utils/apiError.Utils')


function bidData(req, res, next) {
  try {
    const reqBody = z.object({
      gigId: z.string().min(16).max(64),
      message: z.string().min(3).max(100),
      bidAmt: z.number({ required_error: "Bid Ammount is required" }).min(50),
    })

    const data = reqBody.safeParse(req.body)
    if (data.success) {
      req.body = data.data
      next();
    } else {
      res.status(400).json(new apiError(400, "Data Validation Failed", data.error))
    }
  } catch (error) {
    res.status(400).json(new apiError(500, "Internal Server Error", error))

  }
}




module.exports=bidData