const { validateToken } = require("../Utils/auth.Utils")

function checkToken(cookieName){
  return async function (req,res,next){
    req.isLoggedIn = false;
    let tokenValue = await req.cookies[cookieName]
    if (!tokenValue) {
      console.log("dosent have token from cookies")
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        tokenValue = authHeader.split(" ")[1];
      }
    }
    if(!tokenValue){
      return next()
    }
    try {
      
      const payload = validateToken(tokenValue)
      console.log("cookie got and in req.user")
      req.user = payload
      req.isLoggedIn = true
      console.log(req.user)
      
    } catch (error) {
      console.log(error)
    }
    next()
  }
}

module.exports = checkToken