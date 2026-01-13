const { Router } = require('express')
const bidData = require('../Middlewares/bidDataValidation.Middleware')
const isLogin = require('../Middlewares/isLoggedIn.Middleware')
const { postBid, getBidsForOwner } = require('../Controller/Bid.Controller')
const hireBid = require('../Controller/Hire.Controller')

const router = Router();


router.post('/', isLogin, bidData, postBid)
router.get('/:gigId', isLogin, getBidsForOwner) 
router.patch('/:bidId/hire', isLogin, hireBid) 


module.exports = router