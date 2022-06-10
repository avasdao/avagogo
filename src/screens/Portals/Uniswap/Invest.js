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

import PoolListItem from '../../../components/PoolListItem'

/**
 * Pools Screen
 */
const Pools = observer(({navigation}) => {
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
            style={tailwind('px-3')}
        >
            <View style={tailwind('mt-4 p-3 border-2 border-purple-400 bg-purple-200 rounded-lg')}>
                <View style={tailwind('flex-row justify-between')}>
                    <View>
                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Total Investment
                        </Text>

                        <Text style={tailwind('text-2xl text-gray-700 font-bold')}>
                            $1,337.88
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

            <View style={tailwind('mt-0 mb-5')}>
                <PoolListItem
                    basePair={'AVAX'}
                    tradePair={'JOE'}
                    platform={'Trader Joe'}
                    yield={'206.23'}
                    yieldOther={'59.87'}
                    farming={'95.02'}
                    fee={'156.77'}
                    borrow={'-45.56'}
                />

                <PoolListItem
                    basePair={'AVAX'}
                    tradePair={'USDT'}
                    platform={'Trader Joe'}
                    yield={'206.23'}
                    yieldOther={'59.87'}
                    farming={'95.02'}
                    fee={'156.77'}
                    borrow={'-45.56'}
                />

                <PoolListItem
                    basePair={'USDC'}
                    tradePair={'AVAX'}
                    platform={'Trader Joe'}
                    yield={'184.48'}
                    yieldOther={'55.76'}
                    farming={'76.43'}
                    fee={'158.07'}
                    borrow={'-50.02'}
                />

                <PoolListItem
                    basePair={'WETH'}
                    tradePair={'AVAX'}
                    platform={'Trader Joe'}
                    yield={'73.01'}
                    yieldOther={'29.86'}
                    farming={'51.78'}
                    fee={'37.08'}
                    borrow={'-15.86'}
                />

                <PoolListItem
                    basePair={'AVAX'}
                    tradePair={'DAI'}
                    platform={'Trader Joe'}
                    yield={'95.81'}
                    yieldOther={'36.89'}
                    farming={null}
                    fee={'155.17'}
                    borrow={'-59.36'}
                />

                <PoolListItem
                    basePair={'USDC'}
                    tradePair={'USDT'}
                    platform={'Trader Joe'}
                    yield={'13.65'}
                    yieldOther={'13.65'}
                    farming={null}
                    fee={'13.65'}
                    borrow={'-0.00'}
                />

                <PoolListItem
                    basePair={'WBTC'}
                    tradePair={'AVAX'}
                    platform={'Trader Joe'}
                    yield={'77.24'}
                    yieldOther={'28.91'}
                    farming={'58.75'}
                    fee={'27.29'}
                    borrow={'-8.80'}
                />

            </View>

        </ScrollView>
    )
})

export default Pools
