const express = require('express')
const path=require('path')
const router = express.Router()
const config = require('../config/configData.js')


router.get('/',(req,res,next)=>{
    res.render("index",{val:"Server connected successfully @"+config.host+":"+config.port})
 })
 
module.exports=router