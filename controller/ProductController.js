const express = require("express")
const productModel = require("../models/fetchProducts")

exports.getProduct = (req, res, next) => {
	productModel.GetFirstProduct().then((product) => {
		res.render('product',
			{
				product: product,
				isUser: req.session.userID
			}
		)
	})
}


exports.getProductByID = (req, res, next) => {
	let id = req.params.id
	productModel.getProductsByID(id).then((product) => {
		res.render('product',
			{
				product: product,
				isUser: req.session.userID
			}
		)
	})
}