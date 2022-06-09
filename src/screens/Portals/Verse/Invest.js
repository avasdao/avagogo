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
            <View style={tailwind('m-4 p-3 border-2 border-purple-400 bg-purple-200 rounded-lg')}>
                <View style={tailwind('flex-row justify-between')}>
                    <View>
                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Investment Pools
                        </Text>

                        <Text style={tailwind('text-2xl text-gray-700 font-bold')}>
                            $1,049,237.18
                        </Text>

                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Jun 02, '22
                        </Text>
                    </View>

                    <View>
                        <Text style={tailwind('text-sm font-bold')}>
                            1W | 1M | ALL
                        </Text>
                    </View>
                </View>
            </View>

            <View style={tailwind('m-4 p-3 border-2 border-purple-400 bg-purple-200 rounded-lg')}>
                <View style={tailwind('flex-row justify-between')}>
                    <View>
                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Volume
                        </Text>

                        <Text style={tailwind('text-2xl text-gray-700 font-bold')}>
                            $12,835.43
                        </Text>

                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Jun 02, '22
                        </Text>
                    </View>

                    <View>
                        <Text style={tailwind('text-sm font-bold')}>
                            1W | 1M | ALL
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={tailwind('my-16 text-purple-600 text-3xl font-semibold text-center uppercase')}>
                Verse
            </Text>

            <View style={tailwind('py-5 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../../../assets/lottie/finance-guru.json')} autoPlay loop
                />

                <Text style={tailwind('text-purple-700 font-light')}>
                    This area is still under development
                </Text>
            </View>

        </ScrollView>
    )
})

export default Pools
