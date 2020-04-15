/*
SPDX-License-Identifier: Apache-2.0
*/

'use strict';

// Utility class for collections of ledger states --  a state list
const StateList = require('./../ledger-api/statelist.js')

const Entity = require('./entity.js')

class EntityList extends StateList {

    constructor(ctx) {
        super(ctx, 'healthblocks.entitylist');
        this.use(EntityList);
    }

    async addEntity(entity) {
        return this.addState(entity);
    }

    async getEntity(email) {
        return this.getState(email);
    }

    async updateEntity(entity) {
        return this.updateState(entity);
    }
}


module.exports = EntityList
