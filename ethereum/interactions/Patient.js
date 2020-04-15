const path =require('path')
const ethers=require('ethers')
const config=require(path.resolve(__dirname,"../../server/config/configData.js"))
const ABI=require(path.resolve(__dirname, "../smartContracts/abi/Patient.js"))

module.exports=class Patient{

    constructor(_patientAddress){
        try{
        let provider = ethers.getDefaultProvider(config.wallet.network)
        this.contract=new ethers.Contract(_patientAddress, ABI.abi, provider)
        this.contract=this.contract.connect(new ethers.Wallet(config.wallet.privateKey, provider))
        }
        catch(err){
            console.error(err.message)
        }
    }


async addEmr(_emr, _doctorAddress){
    let tx = await  this.contract.addEmr(ethers.utils.formatBytes32String(_emr),_doctorAddress)
    await tx.wait()
    console.log(JSON.stringify(tx))
}

async addPrescription(_prescription,_doctorAddress){
    let tx = await this.contract.addPrescription(ethers.utils.formatBytes32String(_prescription),  _doctorAddress)
    await tx.wait()
    console.log(JSON.stringify(tx))
}

async addVerifiedEmr(_emr,_doctorAddress,_sign){
    let tx = await this.addEmrcontract.addVerifiedEmr(ethers.utils.formatBytes32String(_emr),_doctorAddress,_sign)
    await tx.wait()
    console.log(JSON.stringify(tx))
}

async isEmrVerified(_emr){
    try{
        let res = await  this.contract.isEmrVerified(ethers.utils.formatBytes32String(_emr))
        console.log(res)
        return res
        }
        catch(err){
            console.error(err.message)
        }
}
async isPresVerified( _prescription){
    try{
        let res = await  this.contractisPresVerified(ethers.utils.formatBytes32String(_prescription))
        console.log(res)
        return res
        }
        catch(err){
            console.error(err.message)
        }
}



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




