const productsModel = require('../models/fetchProducts')

exports.getHome = (req, res, next) => {

	let category = req.query.category
	let productsPromise
	if (category && category !== "all") productsPromise = productsModel.getProductsByCategory(category)
	else productsPromise = productsModel.allProducts()

	productsPromise.then(products => {
		res.render('index', {
			products: products,
			isUser: req.session.userID,
			validationError: req.flash('validationError')[0]
		})
	})
} 