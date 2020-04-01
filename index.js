require('dotenv').config()

console.log(process.env.SESSION_SECRET)


var express= require('express')
var app=express()
var port=3400
var userRoute = require('./routes/user.route')
var cookieParser = require('cookie-parser')
var authRoute = require('./routes/auth.route')

var authMiddleware = require('./middlewares/auth.middleware')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'))
app.use(cookieParser(process.env.SESSION_SECRET))


app.get('/', function(req,res){

    res.render('index',{
       name:'AAB' 
    })
})
  
app.use('/users',authMiddleware.requireAuth ,userRoute)
app.use('/auth',authRoute)

app.listen(port,function(){
    console.log('exp listening on port'+port)
})


