const authModel = require('../models/authModel')
const validationResult = require('express-validator').validationResult
exports.getSignup = (req, res, next) => {

	res.render('signup', {
		AuthError: req.flash('AuthError')[0],
		validationError: req.flash('validationError'),
		isUser: false
	})
}
exports.getLogin = (req, res, next) => {
	res.render('login', {
		AuthError: req.flash('AuthError')[0],
		validationError: req.flash('validationError'),
		isUser: false
	})
}
exports.postSignUp = (req, res, next) => {

	if (!validationResult(req).isEmpty()) {
		res.redirect('/signup')
		req.flash('validationError', validationResult(req).array())

	}
	else {
		authModel.CreateUser(req.body.name, req.body.email, req.body.Password).then(() =>
			res.redirect('/login')
		).catch(err => {
			req.flash('AuthError', err)
			res.redirect('/signup')
		})

	}
}
exports.postLogin = (req, res, next) => {

	if (!validationResult(req).isEmpty()) {
		req.flash('validationError', validationResult(req).array())
		console.log('from login',validationResult(req).array());
		res.redirect('/login')
	}
	else {
		authModel.signInUser(req.body.email, req.body.Password).then((id) => {
			req.session.userID = id
			res.redirect('/')
		}
		).catch(err => {
			req.flash('AuthError', err)
			res.redirect('/login')
		})

	}
}
exports.logout = (req, res, next) => {
	req.session.destroy(() => {
		res.redirect('/')
	})
}