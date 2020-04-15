const path =require('path')
const ethers=require('ethers')
const config=require(path.resolve(__dirname,"../server/config/configData.js"))
const ABI=require(path.resolve(__dirname, "./smartContracts/abi/Patient.js"))
const Doctor=require(path.resolve(__dirname, "./smartContracts/abi/Doctor.js"))
const Pharmacy=require(path.resolve(__dirname, "./smartContracts/abi/Pharmacy.js"))

class Patient{

    constructor(_patientAddress){
        try{
        let provider = ethers.getDefaultProvider(config.wallet.network)
        this.contract=new ethers.Contract(_patientAddress, ABI.abi, provider)
        this.contract.connect(new ethers.Wallet(config.wallet.privateKey, provider))
        }
        catch(err){
            console.error(err.message)
        }
    }
// exports.initContract=async function(patientAddress){

//     contract = new ethers.Contract(patientAddress, abi, provider)
// }

async addEmr(_emr, _doctorAddress){
    let tx = await  contract.addEmr(_emr,_doctorAddress)
    await tx.wait()
}

// exports.addPrescription=async function(_prescription,_doctorAddress){
//     let tx = contract.addPrescription(_prescription,  _doctorAddress)
//     await tx.wait()
// }

// exports.addVerifiedEmr=async function(_emr,_doctorAddress,_sign){
//     let tx = contract.addVerifiedEmr(_emr,_doctorAddress,_sign)
//     await tx.wait()
// }

async verifySender(_doctorAddress){
    try{
    let res = await  this.contract.verifySender(_doctorAddress)
    return res
    }
    catch(err){
        console.error(err.message)
    }
   
}


}




async function createPatient(){
    let pat= new Patient("0x279CAAFf6f75d9c08Ecb29928388d9C747a6C516")
     let res = await pat.verifySender("0x2e3AEa4b4EC043c60bA45E43b40046A3cFbc0d27")
     console.log(res)
}

createPatient()