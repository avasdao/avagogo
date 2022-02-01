/* Import modules. */
import React from 'react'

import { action, computed, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'

/**
 * Profile Store
 *
 * Manages the user's profile information..
 */
class Profile {
    /* Constructor. */
    constructor() {
        makeObservable(this)
    }

    /* Initialize (observable) variables. */
    @observable wallet = null

    /* Initialize (persistent) variables. */
    @persist @observable phone = ''
    @persist @observable firstName = ''
    @persist @observable lastName = ''
    @persist @observable streetAddress = ''

    /* Create wallet. */
    @action.bound
    async createWallet() {
        console.log('\nSTART TIME', moment().unix())

        /* Set node URL. */
        const NODE_URL = 'wss://speedy-nodes-nyc.moralis.io/39f5474b84a2f39277aea60a/avalanche/mainnet/ws'

        /* Set provider. */
        const provider = new ethers.providers.WebSocketProvider(NODE_URL)
    
        /* Set signer. */
        const signer = provider.getSigner()
    
        /* Set mnemonic. */
        const mnemonic = require('../../.secrets').mnemonic
    
        const mnemonicWallet = Wallet.fromMnemonic(mnemonic)
        // console.log('\nWALLET (mnemonic):', mnemonicWallet)
        console.log('\nWALLET (mnemonic):', moment().unix())

        this.wallet = mnemonicWallet.connect(provider)
        // console.log('\nWALLET', this.wallet, moment().unix())
        console.log('\nWALLET', moment().unix())

        // Querying the network
        const balance = await this.wallet.getBalance()
            .catch(err => console.error(err))
        console.log('\nBALANCE', balance, moment().unix())

        const txCount = await this.wallet.getTransactionCount()
            .catch(err => console.error(err))
        console.log('\nTXS', txCount, moment().unix())

        return this.wallet
    }

    /* Save (mobile) phone number. */
    @action.bound
    savePhone(_phone) {
        this.phone = _phone
    }

    /* Save first name. */
    @action.bound
    saveFirstName(_firstName) {
        this.firstName = _firstName
    }

    /* Save last name. */
    @action.bound
    saveLastName(_lastName) {
        this.lastName = _lastName
    }

    /* Save street address. */
    @action.bound
    saveStreetAddress(_streetAddress) {
        this.streetAddress = _streetAddress
    }

    /* Display name. */
    @computed
    get displayName() {
        if (this.firstName && this.lastName) {
            return `${this.firstName} ${this.lastName}`
        } else if (this.firstName) {
            return `${this.firstName}`
        } else {
            return 'Guest User'
        }
    }

    /* User greeting. */
    @computed
    get greeting() {
        if (this.firstName && this.lastName) {
            return `Good morning ${this.firstName} ${this.lastName}!`
        } else if (this.firstName) {
            return `Good morning ${this.firstName}!`
        } else {
            return 'Good morning Guest!'
        }
    }

}

/* Initialize store. */
const Store = new Profile()

/* Initialize (store) context. */
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
