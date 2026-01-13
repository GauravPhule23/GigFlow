const { Router } = require('express')
const { searchGig, postGig, getGig } = require('../Controller/Gig.Controller')
const gigData = require('../Middlewares/gigDataValidation.Middleware')
const isLogin = require('../Middlewares/isLoggedIn.Middleware')

const router = Router();



router.get('/', isLogin, searchGig)
router.post('/', isLogin, gigData, postGig)
router.get('/:id', isLogin, getGig) // extra route to have detailed view about the Gig


module.exports = router