/* Import modules. */
import React from 'react'

import { action, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

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
    // @observable quotes = {}

    /* Initialize (persistent) variables. */
    @persist @observable currentPool = null

    @action.bound
    saveCurrentPool(_currentPool) {
        this.currentPool = _currentPool
    }

}

const Store = new Platform()
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
