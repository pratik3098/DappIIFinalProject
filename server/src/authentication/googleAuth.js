const firebase = require("firebase")
const firebaseConfig=require("../config/configData.js").firebaseConfig
firebase.initializeApp(firebaseConfig)

let provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')