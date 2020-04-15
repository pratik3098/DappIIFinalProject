const ethers= require('ethers')
const path=require('path')
const config=require(path.resolve(__dirname,"../server/config/configData.js"))
const Patient=require(path.resolve(__dirname, "./smartContracts/abi/Patient.js"))
const Doctor=require(path.resolve(__dirname, "./smartContracts/abi/Doctor.js"))
const Pharmacy=require(path.resolve(__dirname, "./smartContracts/abi/Pharmacy.js"))

let wallet
let abi
let bytecode

exports.generateWallet= async function (){
    let provider=ethers.getDefaultProvider(config.wallet.network)
    wallet = new ethers.Wallet(config.wallet.privateKey, provider)
}


exports.deployContract= async function(type){
   if(Boolean(wallet)){

 return new Promise((resolve,reject)=>{
    if (type=="Doctor"){
        abi=Doctor.abi
        bytecode=Doctor.bytecode
   }
   else if(type== "Pharmacy")
   {
        abi=Pharmacy.abi
        bytecode=Pharmacy.bytecode
   }
   else
   {
       abi=Patient.abi
       bytecode=Patient.bytecode
   }
   
     try{
         let contractAddress
        let factory = new ethers.ContractFactory(abi, bytecode, wallet)
        factory.deploy().then(contract=>{
            contractAddress=contract.address
        }).then(contract=>{
            contract.deployed().then(()=>{
            console.log(contractAddress)
            resolve(contractAddress)
            })
        })
        
     
        
     }
     catch(err){
         console.log(err.message)
         reject(err.message)
     }
 })

}
else{
  await generateWallet().catch(err=>{console.error(err.message)})
}
}