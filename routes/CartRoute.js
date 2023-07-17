const router = require('express').Router()
const bodyParser = require('body-parser')
const cartController = require('../controller/CartController')
const authGuard = require('./guards/AuthGaurds')
const check = require('express-validator').check
router.post('/cart', bodyParser.urlencoded({ extended: true }),
	authGuard.isAuth,
	check('amount')
		.notEmpty()
		.withMessage('amount must be more than 0')
		.isInt({ min: 1 })
		.withMessage('amount must be more than 0'),
	cartController.postCart
)
module.exports = router