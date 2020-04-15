const ethers= require('ethers')
const path=require('path')
const config=require(path.resolve(__dirname,"../server/config/configData.js"))
const Patient=require(path.resolve(__dirname, "./smartContracts/abi/Patient.js"))
const Doctor=require(path.resolve(__dirname, "./smartContracts/abi/Doctor.js"))
const Pharmacy=require(path.resolve(__dirname, "./smartContracts/abi/Pharmacy.js"))
const Registry=require(path.resolve(__dirname, "./smartContracts/abi/Registry.js"))

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
            contract.deployed().then((contract)=>{

            let registryContract=new ethers.Contract(config.registryContract, Registry.abi, provider)
            registryContract=registryContract.connect(new ethers.Wallet(config.wallet.privateKey, provider))
            let tx
            if(type=="Patient") 
            registryContract.addPatient(contract.address).then(tx=>{
                tx.wait()
            })
            else if(type="Doctor")
            registryContract.addDoctor(contract.address).then(tx=>{
                tx.wait()
            })
            else if(type="Pharmacy")
            registryContract.addPharmacy(contract.address).then(tx=>{
                tx.wait()
            })
            console.log(JSON.stringify(tx))
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