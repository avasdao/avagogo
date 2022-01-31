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
    }

    /* Initialize local variables. */
    @persist @observable sessionid = null
    @persist @observable darkMode = false

    @action.bound
    saveSessionid(_sessionid) {
        this.sessionid = _sessionid
    }

    @action.bound
    saveDarkMode(_darkMode) {
        this.darkMode = _darkMode
    }
}

const Store = new System()
const Context = React.createContext(Store)

/* Export store and context. */
export default {
    Store,
    Context,
}
