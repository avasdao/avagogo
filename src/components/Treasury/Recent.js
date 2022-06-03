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
 * Recent Transactions
 */
const Recent = observer(() => {
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
                    Recent Transactions
                </Text>
            </View>

            <Pressable
                style={tailwind('my-1 pl-3 flex flex-row justify-between items-start')}
                onPress={() => navigation.navigate('Treasury.Recent')}
            >
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        Staking veJOE to Boost
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        PLATFORM — Verse
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        FUND — Homemade Index
                    </Text>
                </View>

                <View style={tailwind('flex flex-col items-end')}>
                    <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                        $23.50
                    </Text>

                    <Text style={tailwind('text-gray-600 text-xs')}>
                        1 day ago
                    </Text>
                </View>
            </Pressable>

            <View style={tailwind('my-1 pl-3 flex flex-row justify-between items-start')}>
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        Add LP Tokens to AVAX/JOE
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        PLATFORM — Pangolin
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        FUND — NumberGoUp Aggressive
                    </Text>
                </View>

                <View style={tailwind('flex flex-col items-end')}>
                    <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                        $186.66
                    </Text>

                    <Text style={tailwind('text-gray-600 text-xs')}>
                        1 day ago
                    </Text>
                </View>
            </View>

            <View style={tailwind('my-1 pl-3 flex flex-row justify-between items-start')}>
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        Add Stake to USDT/USDC
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        PLATFORM — Alpha Venture DAO
                    </Text>

                    <Text style={tailwind('text-xs')}>
                        FUND — Bitcoin FTW Fund
                    </Text>
                </View>

                <View style={tailwind('flex flex-col items-end')}>
                    <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                        $63.40
                    </Text>

                    <Text style={tailwind('text-gray-600 text-xs')}>
                        4 days ago
                    </Text>
                </View>
            </View>

        </>
    )
})

export default Recent
