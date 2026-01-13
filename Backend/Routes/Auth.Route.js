const {Router} = require('express')
const {sign_up, login} = require('../Controller/Auth.Controller')
const {registrationData, loginData} = require('../Middlewares/userDataValidation.Middleware')
const router = Router()

router.post('/register',registrationData,sign_up)
router.post('/login',loginData,login)


module.exports=router