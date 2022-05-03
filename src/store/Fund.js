/* Import modules. */
import React from 'react'

import { action, runInAction, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

import { ethers, utils, Wallet } from 'ethers'
import numeral from 'numeral'

// import Profile from './Profile'

/**
 * Fund Store
 *
 * Manages the individual fund's settings.
 */
class Fund {
    /* Constructor. */
    constructor() {
        makeObservable(this)

        /* Request quotes. */
        // this.requestQuote('AVAX') // Avalanche

    }

    /* Initialize (observable) variables. */
    // @observable basePairBalances = 0
    // @observable tradePairBalances = 0

    /* Initialize (persistent) variables. */
    @persist @observable currentFund = null

    @action.bound
    async saveCurrentFund(_currentFund) {
        /* Set current fund. */
        this.currentFund = _currentFund
    }

}

const Store = new Fund()
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
