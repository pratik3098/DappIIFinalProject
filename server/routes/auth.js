const express = require('express')
const path=require('path')
const router = express.Router()
const config = require(path.resolve(__dirname,'../config/configData.js'))
const auth=require(path.resolve(__dirname,"../src/authentication/emailAuth.js"))
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

router.post('/signInadmin',function(req,res, next){
  console.log(req.body.data)
  auth.signInEmail(req.body.data.email,req.body.password).then(result=>{
    return res.status(200).send({
      success: 'true',
      data: { email: req.body.email,
         authenticated: true,
         isAdmin: true,
         authenticationTime: Date.now()
      // More parameters can be added here 
      }
  })
  }).catch(err=>{
    return res.status(404).send({
        success: 'false',
        message: err.message,
        authenticationTime: Date.now()
    })
})
})


router.post('/signUp',function(req,res, next){
  console.log(req.body.data)
  auth.intialSignUpEmail(req.body.data.email,req.body.password).then(result=>{
    
    contractDeploy.deployContract(req.body.type).then(res1=>{
      console.log(res1)
      return res.status(200).send({
        success: 'true',
        data: { email: req.body.email,
           authenticated: true,
           isAdmin: false,
           authenticationTime: Date.now()
        // More parameters can be added here 
        }
    }).catch(err=>{
      console.error(err.message)
    })
    
   
  })
  }).catch(err=>{
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