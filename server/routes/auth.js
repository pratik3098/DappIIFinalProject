const express = require('express')
const path=require('path')
const router = express.Router()
const config = require('../config/configData.js')

router.post('/',function(req,res, next){
  res.render("index", {val: req.body.name})
})

router.get('/',function(req,res, next){
    res.render("index", {val: "Hello World!"})
  })

module.exports=router