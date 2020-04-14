const firebase = require("firebase")
const firebaseConfig=require("../../config/configData.js").firebaseConfig
firebase.initializeApp(firebaseConfig)

 exports.intialSignUpEmail=async function (email, password){
    return new Promise((resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password).then(res=>{
            let user=firebase.auth().currentUser
            console.log("Email:" +user.providerData[0].email)
            console.log("Auth Type:" +user.providerData[0].providerId)
            console.log("Last SignIn TIme: " +user.metadata.lastSignInTime)
            console.log("Creation Time: "+ user.metadata.creationTime)
            resolve({
                email: user.providerData[0].email,
                authType: user.providerData[0].providerId,
                lastSignInTime: user.metadata.lastSignInTime,
                creationTime: user.metadata.creationTime
            })
        }).catch(function(error) {
            console.error("Inital SignUp: "+error.code+" "+error.message)
            console.error("Email: "+user.providerData[0].email )
            console.error("Auth Type: "+ user.providerData[0].providerId)
            reject("Inital SignUp: "+error.code+" "+error.message)
          })
    })
    
      
}

exports.signInEmail= async function  (email, password){
    return new Promise((resolve,reject)=>{
    firebase.auth().signInWithEmailAndPassword(email, password).then(res=>{
        let user= firebase.auth().currentUser
        console.log("Email:" +user.providerData[0].email)
        console.log("Auth Type:" +user.providerData[0].providerId)
        console.log("Last SignIn TIme: " +user.metadata.lastSignInTime)
        resolve({
            email: user.providerData[0].email,
            authType: user.providerData[0].providerId,
            lastSignInTime: user.metadata.lastSignInTime,
        })
       
    }).catch(function(error) {
        console.error("SignIn: "+error.code+" "+error.message)
        console.error("Email: "+user.providerData[0].email )
        console.error("Auth Type: "+ user.providerData[0].providerId)
        reject("SignIn: "+error.code+" "+error.message)
      })
    })

}



exports.resetPassword=async function(email){
    return new Promise((resolve,reject)=>{
        firebase.auth().sendPasswordResetEmail(email).then(res=>{
            resolve("Email sent: success")
        }).catch(err=>{
            reject("Email sent: Email sent: There is no user record corresponding to this identifier.")

        })
    })
} 

