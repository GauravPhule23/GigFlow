const {Router} = require('express')
const {sign_up, login} = require('../Controller/Auth.Controller')
const {registrationData, loginData} = require('../Middlewares/userDataValidation.Middleware')


Router.post('/register',registrationData,sign_up)
Router.post('/login',loginData,login)


module.exports=Router