/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for ledger state
const State = require('../ledger-api/state.js');


// Enumerate product pallet state values
const enState = {
    SIGNEDUP: 1,
    APPROVED: 2,
    WORKING: 3

};
const enType = {
  PATIENT: 1,
  DOCTOR: 2,
  PHARMACY: 3,

};
/**
 * ProductPallet class extends State class
 * Class will be used by application and smart contract to define a pallet
 */

// { 
    
//   email: "pratik3098@gmail.com",
//   details: {
//       name: "Pratik Patil",
//       dob:  "12/10/1997",
//       practiseStart: "1/12/2001"
//   },
//   type: "Doctor",
//   affiliation: {
//   name: "SunnyBrook Hospital",
//   address: "2075 Bayview Ave, Toronto, ON M4N 3M5"
// },
//   minc: "CAMD-1234-5679",
//   ocp: "12345",
//   created: "2013-03-01",
//   status: ""
// }
class Entity extends State {

    constructor(obj) {
        super(Entity.getClass(), [obj.email]);
        Object.assign(this, obj);
    }

    /**
     * Basic getters and setters
    */
    getEmail(){
      return this.getEmail
    }
    setEmail(email) {
        this.email = email
    }

    setDetails(details){
      this.details= details
    }
    
    getDetails(){
      return this.details
    }
    getType() {
        return this.type
    }

    
    getLicense() {
      return this.license
  }

  
  getWallet(){
    return this.wallet
  }
  getAffiliation() {
    return this.affiliation
  }

  getStatus(){
    return this.status
  }
    /**
     * Useful methods to encapsulate pallet states
     */
  setTypePatient() {
      this.type = enType.PATIENT
  }

  setTypeDoctor() {
    this.type = enType.DOCTOR
    }
  
  setTypePharmacy() {
   this.type = enType.PHARAAMCY
  }

 setLicense(license) {
      this.license = license
    }


  setWallet(address){
    this.wallet=address
  }


  setAffiliation(affiliation){
      this.affiliation=affiliation
  }
  
  setSignedUp(){
    this.status=enState.SIGNEDUP
  }
  setApproved(){
    this.status= enState.APPROVAL
  }
  
  setRejected(){
    this.status= enState.REJECTED
  }
  

  

  isDoctor() {
        return this.type === enType.DOCTOR
  }
    
  isPatient() {
      return this.type === enType.PATIENT
  }
       
  isPharmacy() {
    return this.type === enType.PHARMACY
   }

  
  
    static fromBuffer(buffer) {
        return Entity.deserialize(buffer)
    }

    toBuffer() {
        return Buffer.from(JSON.stringify(this))
    }

    /**
     * Deserialize a state data to product pallet
     * @param {Buffer} data to form back into the object
     */
    static deserialize(data) {
        return State.deserializeClass(data, Entity)
    }

    /**
     * Factory method to create a pallet object
     */
    static createInstance(email, wallet, type, details, affiliation, license, status) {
        return new Entity({ email, wallet, type, details, affiliation, license, status})
    }

    static getClass() {
        return 'healthblocks.entity'
    }
}

module.exports = Entity
