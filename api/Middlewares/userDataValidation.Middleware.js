const { z } = require('zod')
const apiError = require('../Utils/apiError.Utils')


function registrationData(req, res, next) {
  try {
    const reqBody = z.object({
      fName: z.string().min(3).max(20),
      lName: z.string().min(3).max(20).optional(),
      email: z.email().min(3).max(20),
      password: z.string().min(3).max(20)
        .regex(/[A-Z]/, { message: "At least a Capital Letter" })
        .regex(/[a-z]/, { message: "At least a small Letter" })
        .regex(/[0-9]/, { message: "At least a number" })
        .regex(/[!@#$%^&*]/, { message: "At least a special character" }),
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


function loginData(req, res, next) {
  try {
    const reqBody = z.object({
      email: z.email().min(3).max(20),
      password: z.string().min(3).max(20)
        .regex(/[A-Z]/, { message: "At least a Capital Letter" })
        .regex(/[a-z]/, { message: "At least a small Letter" })
        .regex(/[0-9]/, { message: "At least a number" })
        .regex(/[!@#$%^&*]/, { message: "At least a special character" }),
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

module.exports={
  registrationData,
  loginData
}