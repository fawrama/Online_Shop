const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/OnlineShop'
const ProductSchema = mongoose.Schema({
	name: String,
	image: String,
	price: Number,
	category: String
})
const product = mongoose.model('product', ProductSchema)
exports.allProducts = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {

			return product.find({})
		}).then(products => {
			mongoose.disconnect()
			resolve(products)
		}).catch(err => {
			mongoose.disconnect()
			reject(err)
		})
	})
}
exports.getProductsByCategory = (category) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {

			return product.find({ category: category })
		}).then(products => {
			mongoose.disconnect()
			resolve(products)
		}).catch(err => {
			mongoose.disconnect()
			reject(err)
		})
	})
}
exports.getProductsByID = (id) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {

			return product.findById(id)
		}).then(products => {
			mongoose.disconnect()
			resolve(products)
		}).catch(err => {
			mongoose.disconnect()
			reject(err)
		})
	})
}
exports.GetFirstProduct = () => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {
			return product.findOne()
		}).then(products => {

			mongoose.disconnect()
			resolve(products)
		}).catch(err => {
			
			mongoose.disconnect()
			reject(err)
		})
	})
}