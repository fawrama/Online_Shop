const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const DB_URL = 'mongodb://localhost:27017/OnlineShop'
const UserSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
})
const USER = mongoose.model('user', UserSchema)

exports.CreateUser = (name, email, password) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {
			return USER.findOne({ email: email })
		}).then((user) => {
			if (user) {
				mongoose.disconnect()
				reject('email already used')
			}
			else {
				return bcrypt.hash(password, 10);
			}
		}).then((HashedPassword) => {
			let user = new USER({
				name: name,
				email: email,
				password: HashedPassword
			})
			return user.save()
		}).then(() => {
			mongoose.disconnect()
			resolve('User created successfully')
		}).catch(err => {
			mongoose.disconnect()
			reject(err)
		}
		)
	})
}

exports.signInUser = (email, Password) => {
	return new Promise((resolve, reject) => {
		mongoose.connect(DB_URL).then(() => {
			return USER.findOne({ email: email })
		}).then(async (found) => {
			if (found)
				if (await bcrypt.compare(Password, found.password)) {

					mongoose.disconnect()
					resolve(found._id)
				}
				else {
					mongoose.disconnect()
					reject('Password is incorrect')
				}
			else {
				mongoose.disconnect()
				reject('Email not found')
			}
			mongoose.disconnect()
		}).catch(err => {
			
			reject(err)
		})
	})
}