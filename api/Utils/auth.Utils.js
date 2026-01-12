const JWT = require("jsonwebtoken")

const secreteKey = process.env.JWT_SECRETE_KEY

async function createToken(user){
 
  const payload ={
    _id : user._id,
    
  }

  const token = await JWT.sign(payload,secreteKey,{
    expiresIn:'1d'
  })
  return token
 
}

function validateToken(token){
  const payload = JWT.verify(token,secreteKey)
  return payload
}

module.exports={
  createToken,
  validateToken
}