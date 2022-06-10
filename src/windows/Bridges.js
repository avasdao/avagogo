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

import store from '../store'

import Divider from '../components/Divider'
import ScreenTitle from '../components/ScreenTitle'

/**
 * Blank Screen
 */
const Blank = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

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
            <View style={tailwind('bg-gray-800 items-end py-1')}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons
                        style={tailwind('mr-2 text-gray-300')}
                        name={'close-outline'}
                        size={40}
                    />
                </Pressable>
            </View>

            <ScreenTitle title="Bridges" />

            <View style={tailwind('py-5 bg-gray-50 items-center border-b-4 border-gray-300')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../assets/lottie/52099-golden-gate-bridge.json')}
                    autoPlay
                    loop={true}
                />
            </View>

            <Text style={tailwind('mt-3 px-3 text-gray-800 text-xl font-medium')}>
                Easily move your assets back-and-forth across your favorite blockchains:
            </Text>

            <View style={tailwind('mt-3 px-10')}>
                <Text style={tailwind('mt-2 text-lg text-gray-800 font-semibold')}>
                    &#8618; Avalanche (AVAX)
                </Text>

                <Text style={tailwind('mt-2 text-lg text-gray-800 font-semibold')}>
                    &#8618; BNB Chain (BSC)
                </Text>

                <Text style={tailwind('mt-2 text-lg text-gray-800 font-semibold')}>
                    &#8618; Ethereum (ETH)
                </Text>

                <Text style={tailwind('mt-2 text-lg text-gray-800 font-semibold')}>
                    &#8618; Polygon (MATIC)
                </Text>

                <Text style={tailwind('mt-2 text-lg text-gray-800 font-semibold')}>
                    &#8618; Smart Bitcoin (SBCH)
                </Text>
            </View>

        </ScrollView>
    )
})

export default Blank
