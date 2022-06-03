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

import { useNavigation } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import store from '../../store'

/**
 * Rewards Pending
 */
const Rewards = observer(() => {
    /* Initialize navigation. */
    const navigation = useNavigation()

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
        <>
            <View style={tailwind('my-1')}>
                <Text style={tailwind('text-gray-400 text-base font-bold uppercase')}>
                    Unclaimed Rewards
                </Text>
            </View>

            <View style={tailwind('my-1 pl-3 flex flex-row justify-between items-start')}>
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        Trader Joe
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        Pool • Farm • Lend • Stake
                    </Text>
                </View>

                <View style={tailwind('flex flex-col items-end')}>
                    <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                        $37.88
                    </Text>

                    <Text style={tailwind('text-gray-600 text-xs')}>
                        7 mins ago
                    </Text>
                </View>
            </View>

            <View style={tailwind('my-1 pl-3 flex flex-row justify-between items-start')}>
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        Alpha Venture DAO
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        Homora V2 • AlphaX
                    </Text>
                </View>

                <View style={tailwind('flex flex-col items-end')}>
                    <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                        $8.05
                    </Text>

                    <Text style={tailwind('text-gray-600 text-xs')}>
                        3 hours ago
                    </Text>
                </View>
            </View>
        </>
    )
})

export default Rewards
