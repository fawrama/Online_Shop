const router = require('express').Router()
const bodyParser = require('body-parser')
const authController = require('../controller/authController')
const AuthGuard = require('./guards/AuthGaurds')
const check = require('express-validator').check

router.get('/signup', AuthGuard.notAuth, authController.getSignup)
router.post('/signup',
	bodyParser.urlencoded({ extended: true }),
	check('name').not().isEmpty().withMessage('Name can\'t be empty'),
	check('email').not().isEmpty().withMessage('Email can\'t be empty').isEmail().withMessage('enter a valid email'),
	check('Password').not().isEmpty().withMessage('password can\'t be empty').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
	check('repeatedPassword').custom((confirmedPassword, { req }) => {
		if (confirmedPassword === req.body.Password)
			return true
		throw new Error('passwords doesn\'t match')
	}).withMessage('passwords must be matching'),
	authController.postSignUp)

router.get('/login', AuthGuard.notAuth,
	authController.getLogin)

router.post('/login',
	bodyParser.urlencoded({ extended: true }),
	check('email').not().isEmpty().withMessage('Email can\'t be empty').isEmail().withMessage('enter a valid email'),
	check('Password').not().isEmpty().withMessage('Password can\'t be empty').isLength({ min: 6 }).withMessage('password must be at least 6 characters'),
	authController.postLogin)

router.all('/logout', AuthGuard.isAuth, authController.logout)

module.exports = router