const path =require('path')
const ethers=require('ethers')
const config=require(path.resolve(__dirname,"../../server/config/configData.js"))
const ABI=require(path.resolve(__dirname, "../smartContracts/abi/Doctor.js"))

module.exports=class Doctor{

    constructor(_doctorAddress){
        try{
        let provider = ethers.getDefaultProvider(config.wallet.network)
        this.contract=new ethers.Contract(_doctorAddress, ABI.abi, provider)
        this.contract=this.contract.connect(new ethers.Wallet(config.wallet.privateKey, provider))
        }
        catch(err){
            console.log(err.message)
        }
    }

 async assignPatient(_patientAddress){
    let tx = await this.contract.assignPatient(_patientAddress)
    await tx.wait()
    console.log(JSON.stringify(tx))
 }
   

 async withdrawPatient(_patientAddress){
    let tx = await this.contract.withdrawPatient(_patientAddress)
    await tx.wait()
    console.log(JSON.stringify(tx))
 }

 async addEmr(_patientAddress,_emr){
    let tx = await  this.contract.addEmr(_patientAddress,ethers.utils.formatBytes32String(_emr))
    await tx.wait()
    console.log(JSON.stringify(tx))
}

async addPrescription(_patientAddress, _prescription){
    let tx = await this.contract.addPrescription(_patientAddress,ethers.utils.formatBytes32String(_prescription))
    await tx.wait()
    console.log(JSON.stringify(tx))
}

async isPatientAssigned(_patientAddress){
    try{
        let res = await  this.contract.isPatientAssigned(_patientAddress)
        return res
        }
        catch(err){
            console.log(err.message)
        }
}


async verifySender(_doctorAddress){
    try{
    let res = await  this.contract.verifySender(_doctorAddress)
    return res
    }
    catch(err){
        console.log(err.message)
    }
   
}


}

