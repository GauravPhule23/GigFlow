const { Router } = require('express')
const bidData = require('../Middlewares/bidDataValidation.Middleware')
const isLogin = require('../Middlewares/isLoggedIn.Middleware')
const { postBid, getBidsForOwner } = require('../Controller/Bid.Controller')
const hireBid = require('../Controller/Hire.Controller')


Router.post('/', isLogin, bidData, postBid)
Router.get('/:gigId', isLogin, getBidsForOwner) 
Router.patch('/:bidId/hire', isLogin, hireBid) 


module.exports = Router