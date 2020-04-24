/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Fabric smart contract classes
const { Contract, Context } = require('fabric-contract-api');

// FoodTracNet specifc classes
const Entity= require('./entity.js');
const ProductPalletList = require('./entitylist.js');

/**
 * A custom context provides easy access to list of all product pallets
 */
class EntityContext extends Context {

    constructor() {
        super();
        // All pallets are held in a list
        this.eneityList = new EntityList(this);
    }
}

class EntityContract extends Contract {

  constructor() {
    super('healthblocks.entity')

  }
  createContext() {
    return new EntityContext();
  }

  /**
   * Instantiate: ledger setup
   * @param {Context} ctx the transaction context
   */
  async instantiate(ctx) {
    console.log('Instantiating entity contract');
  }

 
  async create(ctx, email,wallet, type, details, affiliation, license, status) {

    // create pallet
    let entity = Entity.createInstance( email, wallet, type, details, affiliation, license, status);

    // Change Pallet state to Created(1)
    if(type=="Patient"){
    entity.setTypePatient()
    entity.setApproved()
    }
    else if (type=="Doctor"){
      entity.setTypeDoctor()
      entity.setSignedUp()
    }
    else if(type=="Pharmacy"){
      entity.setTypePharmacy()
      entity.setSignedUp()
    }

  
    // Add newly created pallet to the list
    await ctx.entityList.addEntity(entity)

    return entity
  }





}

module.exports = EntityContract;
