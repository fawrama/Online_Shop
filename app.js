const express = require('express')
const path = require('path')
const session = require('express-session')
const StoreSessions = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

const server = express()
const HomeRouter = require('./routes/HomeRoute')
const ProductRouter = require('./routes/Productroute')
const AuthRouter = require('./routes/AuthRoute')
const CartRouter = require('./routes/CartRoute')

server.use(express.static(path.join(__dirname, 'assets')))
server.use(express.static(path.join(__dirname, 'images')))
server.use(flash())
const STORE = new StoreSessions({
	uri: 'mongodb://localhost:27017/OnlineShop',
	collection: 'sessions'
})

server.use(session({
	secret: 'This Is My Security Text',
	store: STORE,
	resave: true,
	saveUninitialized: false,
}))

server.set('view engine', 'ejs')
server.set('views', 'views')

server.use('/', HomeRouter)
server.use(ProductRouter)
server.use(AuthRouter)
server.use(CartRouter)

server.listen(3000, (err) => { console.error(); })