/* Import modules. */
import React from 'react'

import { action, runInAction, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

import { ethers, utils, Wallet } from 'ethers'
import numeral from 'numeral'

import Token from './Token'

/**
 * Platform Store
 *
 * Manages the individual platform's settings.
 */
class Platform {
    /* Constructor. */
    constructor() {
        makeObservable(this)

        /* Request quotes. */
        // this.requestQuote('AVAX') // Avalanche

    }

    /* Initialize (observable) variables. */
    @observable basePairBalances = 0
    @observable tradePairBalances = 0

    /* Initialize (persistent) variables. */
    @persist @observable currentPool = null

    @action.bound
    async saveCurrentPool(_currentPool) {
        /* Set current pool. */
        this.currentPool = _currentPool

        /* Parse base pair. */
        const basePair = _currentPool.split('/')[0]
        // console.log('BASE PAIR', basePair)

        /* Parse base pair. */
        const tradePair = _currentPool.split('/')[1]
        // console.log('TRADE PAIR', tradePair)

        /* Set base pair. */
        const basePairBalances = await Token.Store.getBalances(basePair)
        // console.log('BASE PAIR BALANCES', this.basePairBalances)

        /* Set trade pair. */
        const tradePairBalances = await Token.Store.getBalances(tradePair)
        // console.log('TRADE PAIR BALANCES', this.tradePairBalances)

        // NOTE: Allows MobX to change observables while
        //       running in "strict-mode".
        runInAction(() => {
            /* Set base pair. */
            this.basePairBalances = basePairBalances

            /* Set trade pair. */
            this.tradePairBalances = tradePairBalances
        })
    }

}

const Store = new Platform()
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
