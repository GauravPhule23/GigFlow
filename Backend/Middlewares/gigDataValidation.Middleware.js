const { z } = require('zod')
const apiError = require('../Utils/apiError.Utils')


// Gig post data validation

function gigData(req, res, next) {
  try {
    console.log("inside validation")
    const reqBody = z.object({
      title: z.string().min(3).max(200),
      description: z.string().min(3).or(z.literal("")).optional(),
      budget: z.number({ required_error: "Budget is required" }).min(100),
      completionDate: z.coerce.date().min(new Date(),{message:"Date must be in future."}),
    })
    
    const data = reqBody.safeParse(req.body)
    if (data.success) {
      console.log("success")
      req.body = data.data
      next();
    } else {
      res.status(400).json(new apiError(400, "Data Validation Failed", data.error))
    }
  } catch (error) {
    res.status(400).json(new apiError(500, "Internal Server Error", error))

  }
}




module.exports=gigData