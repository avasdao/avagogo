/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import store from '../../../store'

/**
 * Pools Screen
 */
const Pools = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            //
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('mt-32 items-center')}>
                <Text style={tailwind('text-gray-500 text-xl font-medium')}>
                    no history available
                </Text>

                <LottieView
                    style={tailwind('mt-0 h-48')}
                    source={require('../../../assets/lottie/no-result-found.json')} autoPlay loop
                />
            </View>

        </ScrollView>
    )
})

export default Pools
