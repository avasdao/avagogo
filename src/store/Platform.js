/* Import modules. */
import React from 'react'

import { action, runInAction, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

import { ethers, utils, Wallet } from 'ethers'
import numeral from 'numeral'

import Profile from './Profile'

/**
 * Get Token Balances
 *
 * Will retrieve the token balance of a wallet. The balance is then
 * returned in multiple formats:
 *   1. Wei
 *   2. Decimal
 *   3. Display
 *
 * NOTE: This will ONLY retrieve the "primary" account balance.
 */
const getTokenBalances = async (_tokenid) => {
    let abi
    let address

    /* Retrieve the user's wallet. */
    const wallet = Profile.Store.wallet

    /* Handle token id. */
    switch(_tokenid) {
    case 'DAI':
        address = '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70'
        abi = require('../assets/abis/ERC20')
        break
    case 'JOE':
        address = '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd'
        abi = require('../assets/abis/ERC20')
        break
    case 'USDT':
        address = '0xc7198437980c041c805A1EDcbA50c1Ce5db95118'
        abi = require('../assets/abis/ERC20')
        break
    case 'WAVAX':
        address = '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7'
        abi = require('../assets/abis/ERC20')
        break
    default:
        throw new Error('That symbol is NOT supported in this application.')
    }

    /* Initialize contract. */
    const contract = new ethers.Contract(address, abi, wallet)
    // console.log('CONTRACT', contract)

    /* Retrieve balance. */
    const wei = await contract
        .balanceOf(wallet.address)
        .catch(err => console.error(err))
    // console.log('WEI', wei)

    /* Retrieve number of decimals. */
    const numDecimals = await contract
        .decimals()
        .catch(err => console.error(err))
    // console.log('# DECIMALS', numDecimals)

    /* Convert to decimal balance. */
    const decimal = utils.formatUnits(wei, numDecimals)
    // console.log('DECIMAL FORMAT', decimal)

    /* Format balance. */
    const display = numeral(decimal).format('0,0.0000[00]')
    // console.log('DISPLAY FORMAT', display)

    /* Return a balance package. */
    return {
        wei,
        decimal,
        display,
    }
}

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
        const basePairBalances = await getTokenBalances(basePair)
        // console.log('BASE PAIR BALANCES', this.basePairBalances)

        /* Set trade pair. */
        const tradePairBalances = await getTokenBalances(tradePair)
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
