const express = require('express')
const path=require('path')
const sha256=require('sha256')
const router = express.Router()
const config = require(path.resolve(__dirname,'../config/configData.js'))
const auth=require(path.resolve(__dirname,"../src/authentication/emailAuth.js"))
const database=require(path.resolve(__dirname,"../src/database/userDatabase.js"))
const contractDeploy=require(path.resolve(__dirname,"../../ethereum/deployContract.js"))

router.post('/signin',function(req,res, next){

  auth.signInEmail(req.body.data.email,req.body.data.password).then(result=>{
    console.log(result)
    return res.status(200).send({
      success: 'true',
      data: { email: result.email,
         authenticated: true,
         isAdmin: false,
         authenticationTime: Date.now()
      // More parameters can be added here 
      }
  })
  }).catch(err=>{
    console.log(err.message)
    return res.status(404).send({
        success: 'false',
        message: err.message,
        authenticationTime: Date.now()
    })
})
})

router.post('/signinadmin',function(req,res, next){
  
  auth.signInEmail(req.body.data.email,req.body.data.password).then(result=>{
    console.log(result)
    return res.status(200).send({
      success: 'true',
      data: { 
        email: result.email,
         authenticated: true,
         isAdmin: true,
         authenticationTime: Date.now()
      }
  })
  }).catch(err=>{
    console.error(err.message)
    return res.status(404).send({
        success: 'false',
        message: err.message,
        authenticationTime: Date.now()
    })
})
})


router.post('/signup',function(req,res, next){
  
  auth.intialSignUpEmail(req.body.data.email,req.body.data.password).then(result=>{
    console.log(result)
    contractDeploy.deployContract(req.body.type).then(res1=>{
      console.log(res1)
      let data2
      if(req.body.data.type=="Patient")
      data2= {address: res1, approved: true}
      else
      data2={address: res1,approved:false}
      let newData = Object.assign({},req.body.data,data2)
      database.addUserData(sha256(req.body.data.email),newData)
    }).catch(err=>{
      console.log(err.message)
    }).then(res1=>{
      return res.status(200).send({
        success: 'true',
        data: { email: result.email,
           authenticated: true,
           isAdmin: false,
           authenticationTime: Date.now()
        }
    })
    
   
  })
  }).catch(err=>{
    console.log(err.message)
    return res.status(404).send({
        success: 'false',
        message: err.message,
        authenticationTime: Date.now()
    })
})
})




router.get('/',function(req,res, next){
    res.render("index", {val: "Hello World!"})
  })


module.exports=router