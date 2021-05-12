const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')

//Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }

//Use static asset file
app.use(express.static(path.join(__dirname, 'public/')))
app.use(express.static(path.join(__dirname, 'public/admin')))


//SETUP TEMPLATE ENGINE
app.engine("handlebars", exphbs({
    defaultLayout: "home",
    handlebars: allowInsecurePrototypeAccess(Handlebars),

}))

app.set('view engine', 'handlebars')

//BodyParser
app.use(express.json())

//Loading Routes
const homeRoute = require('./routes/home')

//Use Routes
app.use("/", homeRoute)




const PORT = process.env.PORT || 2000

app.listen(PORT, (req, res)=> console.log(`Server is running on port ${PORT}`))