const router = require("express").Router()
const productController = require("../controller/ProductController")

router.get('/product/', productController.getProduct)

router.get('/product/:id', productController.getProductByID)



module.exports = router