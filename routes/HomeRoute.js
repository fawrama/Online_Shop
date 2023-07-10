const router = require('express').Router()
const getHome = require('../controller/HomeController')


router.get('/', getHome.getHome)

module.exports = router
