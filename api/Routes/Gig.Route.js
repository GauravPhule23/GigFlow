const { Router } = require('express')
const { searchGig, postGig, getGig } = require('../Controller/Gig.Controller')
const gigData = require('../Middlewares/gigDataValidation.Middleware')
const isLogin = require('../Middlewares/isLoggedIn.Middleware')


Router.get('/', isLogin, searchGig)
Router.post('/', isLogin, gigData, postGig)
Router.get('/:id', isLogin, getGig) // extra route to have detailed view about the Gig


module.exports = Router