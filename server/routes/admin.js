const express = require('express')
const path=require('path')
const sha256=require('sha256')
const moment=require("moment")
const router = express.Router()
const config = require(path.resolve(__dirname,'../config/configData.js'))
const database=require(path.resolve(__dirname,"../src/database/userDatabase.js"))
const contractDeploy=require(path.resolve(__dirname,"../../ethereum/deployContract.js"))


  

router.get('/approvaldata',function(req,res, next){
  
  database.readAllData().then(result=>{
    console.log(result)
    return res.status(200).send({
      success: 'true',
      data: result
  })
  }).catch(err=>{
    console.log(err.message)
    return res.status(404).send({
        success: 'false',
        message: err.message,
        authenticationTime: moment(Date.now()).format()
    })
})
})





router.post('/',function(req,res, next){
    res.render("index", {val: "Hello World!"})
})


module.exports=router