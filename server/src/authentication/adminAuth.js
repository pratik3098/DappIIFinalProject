const path=require('path')
const admin=require('firebase-admin')
admin.initializeApp({
    credential: admin.credential.cert(path.resolve(__dirname,'../config/adminServiceKey.json'))
})

exports.sendResetEmail=async function sendResetEmail(email){
    return new Promise((resolve,reject)=>{
        admin.auth().getUserByEmail(email).then(user=>{
            resolve(user)
        }).catch(err=>{
            console.error(err.message)
        })
      
    })
}

