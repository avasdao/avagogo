/* Import modules. */
import React from 'react'

import { action, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

/**
 * System Store
 *
 * Manages the application's (system) settings.
 */
class System {
    /* Constructor. */
    constructor() {
        makeObservable(this)

        /* Request AVAX quote. */
        this.requestQuote('AVAX')

        /* Set quote update. */
        setInterval(() => {
            console.log('Requesting AVAX quote..')
            this.requestQuote('AVAX')
        }, 30000)
    }

    /* Initialize (observable) variables. */
    @observable quotes = {}

    /* Initialize (persistent) variables. */
    @persist @observable sessionid = null
    @persist @observable darkMode = false

    @action.bound
    async requestQuote(_asset) {
        const response = await fetch(`https://api.telr.io/v1/ticker/quote/${_asset}`)

        const quote = await response.json()
        // console.log('QUOTE', quote)

        this.quotes[_asset] = quote
    }

    @action.bound
    saveSessionid(_sessionid) {
        this.sessionid = _sessionid
    }

    @action.bound
    saveDarkMode(_darkMode) {
        this.darkMode = _darkMode
    }

    @action.bound
    price(_asset) {
        if (this.quotes[_asset]) {
            return this.quotes[_asset].price
        } else {
            return 0
        }
    }

    @action.bound
    quote(_asset) {
        if (this.quotes[_asset]) {
            return this.quotes[_asset]
        } else {
            return null
        }
    }

}

const Store = new System()
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
