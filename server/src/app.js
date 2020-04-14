const path=require('path')
const express= require('express')
const bodyParser= require('body-parser')
const morgan= require('morgan')
const upload =require('express-fileupload')
const moment=require('moment')
const config = require('../config/configData.js')
const app = express()
const authRouter= require("../routes/auth.js")
const indexRouter= require("../routes/index.js")
app.set('title','facedrive db')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,"../views"))
app.use(express.static("../views"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods","GET, POST, OPTIONS")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept , enctype")
    next()
})
app.use('/auth',  authRouter)
app.use('/',  indexRouter)
app.use(upload({
    useTempFiles : true,
    tempFileDir : path.resolve(__dirname,'../tmp')
}))
app.listen(config.port,()=>{ console.log("Server is running on port: "+config.port)})



