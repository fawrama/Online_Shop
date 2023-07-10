const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/OnlineShop'
const ProductSchema = mongoose.Schema({
	name: String,
	price: Number,
	amount: Number,
	userID: String,
	productID: String,
	timeStamp: Number
})

const CART_ITEM = mongoose.model('cart', ProductSchema)

exports.addItem = data => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {
			let cart = new CART_ITEM(data)
			return cart.save()
		}).then(() => {
			mongoose.disconnect()
			resolve()
		}).catch(err => {
			mongoose.disconnect()
			reject(err)
		})
	})
}