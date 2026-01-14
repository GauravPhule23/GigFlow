const {Router} = require('express')
const {sign_up, login, logout} = require('../Controller/Auth.Controller')
const {registrationData, loginData} = require('../Middlewares/userDataValidation.Middleware')
const isLogin = require('../Middlewares/isLoggedIn.Middleware')
const router = Router()

router.post('/register',registrationData,sign_up)
router.post('/login',loginData,login)
router.post('/logout',isLogin,logout)


module.exports=router