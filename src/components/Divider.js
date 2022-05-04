/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react'

import {
    View,
} from 'react-native'

import tailwind from 'tailwind-rn'

/**
 * Divider
 */
const Divider = (() => {
    return (
        <View style={tailwind('border-t-2 border-purple-300 my-2')} />
    )
})

export default Divider
