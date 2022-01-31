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

    /* Initialize ephemeral variables. */
    wallet = null
    metaWallet = null

    /* Initialize local variables. */
    @persist @observable phone = ''
    @persist @observable firstName = ''
    @persist @observable lastName = ''
    @persist @observable streetAddress = ''

    /* Create wallet. */
    @action.bound
    async createWallet() {
        console.log('\nSTART TIME', moment().unix())

        /* Set node URL. */
        // const NODE_URL = 'https://speedy-nodes-nyc.moralis.io/39f5474b84a2f39277aea60a/avalanche/mainnet'
        const NODE_URL = 'wss://speedy-nodes-nyc.moralis.io/39f5474b84a2f39277aea60a/avalanche/mainnet/ws'

        /* Set provider. */
        // const provider = new ethers.providers.JsonRpcProvider(NODE_URL)
        const provider = new ethers.providers.WebSocketProvider(NODE_URL)
        // console.log('\nPROVIDER', provider)

        /* Set signer. */
        const signer = provider.getSigner()
        // console.log('\nSIGNER', signer)

        /* Set mnemonic. */
        const mnemonic = require('../../.secrets').mnemonic
        // console.log('\nMNEMONIC', mnemonic)

        // const node = utils.HDNode.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`)
        // console.log('\nNODE', node, moment().unix())

        // const secondAccount = hdNode.derivePath(`m/44'/60'/0'/0/1`); // This returns a new HDNode
        // const thirdAccount = hdNode.derivePath(`m/44'/60'/0'/0/2`);

        // const walletMnemonic = Wallet.fromMnemonic(mnemonic)
        // console.log('\nWALLET MNEMONIC', walletMnemonic, moment().unix())

        // const wallet = walletMnemonic.connect(provider)
        // console.log('\nWALLET', walletMnemonic, moment().unix())

        this.metaWallet = Wallet.fromMnemonic(mnemonic)
        // console.log('\nWALLET (meta):', this.metaWallet, moment().unix())

        this.wallet = this.metaWallet.connect(provider)
        // console.log('\nWALLET (connected):', this.wallet, moment().unix())

        // Querying the network
        const balance = await this.wallet.getBalance()
            .catch(err => console.error(err))
        console.log('\nBALANCE', balance, moment().unix())

        const txCount = await this.wallet.getTransactionCount()
            .catch(err => console.error(err))
        console.log('\nTXS', txCount, moment().unix())

        return this.wallet
    }

    /* Save wallet. */
    @action.bound
    saveWallet(_wallet) {
        this.wallet = _wallet
    }

    /* Save (meta) wallet. */
    @action.bound
    saveMetaWallet(_wallet) {
        this.metaWallet = _wallet
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
