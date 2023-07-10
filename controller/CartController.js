const cartModel = require('../models/cartModel')
const validationResult = require('express-validator').validationResult
exports.postCart = (req, res, next) => {

	if (validationResult(req).isEmpty()) {
		{
			cartModel.addItem({
				name: req.body.name,
				price: req.body.Price,
				amount: req.body.amount,
				userID: req.session.userID,
				productID: req.body.productId,
				timeStamp: Date.now()
			}).catch(err => { console.log(err); })
			res.redirect('/cart')
		}
	} else {
		req.flash('validationError', validationResult(req).array())
		res.redirect(req.body.redirectTo)
	}
}