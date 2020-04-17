const firebase = require("firebase")
const path=require('path')
const firebaseConfig=require("../../config/configData.js").firebaseConfig
//firebase.initializeApp(firebaseConfig)

exports.addUserData= async  function(userName, data) {
    return new Promise((resolve,reject)=>{
        try{
        firebase.database().ref('users/' + userName).set({
            data: data
          })

        let res= data
        resolve(res)
        }
        catch(err){
            reject(err.message)
        }
    })

 }



