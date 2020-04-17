const path =require('path')
const ethers=require('ethers')
const config=require(path.resolve(__dirname,"../../server/config/configData.js"))
const ABI=require(path.resolve(__dirname, "../smartContracts/abi/Pharmacy.js"))

module.exports=class Pharmacy{

    constructor(_pharmacyAddress){
        try{
        let provider = ethers.getDefaultProvider(config.wallet.network)
        this.contract=new ethers.Contract(_pharmacyAddress, ABI.abi, provider)
        this.contract=this.contract.connect(new ethers.Wallet(config.wallet.privateKey, provider))
        }
        catch(err){
            console.log(err.message)
        }
    }



 async disprensePrescriptions( _patientAddress, _pres) {
    let tx = await  this.contract.disprensePrescriptions(_patientAddress,ethers.utils.formatBytes32String(_pres))
    await tx.wait()
    console.log(JSON.stringify(tx))
}


async isPrescDispensed(_prescription){
    try{
        let res = await  this.contract.isPatientAssigned(ethers.utils.formatBytes32String(_prescription))
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

