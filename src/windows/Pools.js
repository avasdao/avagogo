/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
    Linking,
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import store from '../store'

import PoolListItem from '../components/PoolListItem'

/**
 * Open Web Home
 */
const openWebHome = async () => {
    /* Set URL. */
    const url = 'https://avagogo.io'

    /* Open URL. */
    await Linking.openURL(url)
}

/**
 * Pools
 */
const Pools = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize PLATFORM context. */
    const {
        currentPool,
        saveCurrentPool,
    } = React.useContext(store.Platform)

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

            <View style={tailwind('m-3')}>

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

                <PoolListItem
                    basePair={'USDC'}
                    tradePair={'DAI'}
                    platform={'Trader Joe'}
                    yield={'20.41'}
                    yieldOther={'16.20'}
                    farming={null}
                    fee={'129.75'}
                    borrow={'-8.80'}
                />

                <PoolListItem
                    basePair={'USDT'}
                    tradePair={'DAI'}
                    platform={'Trader Joe'}
                    yield={'13.95'}
                    yieldOther={'13.95'}
                    farming={null}
                    fee={'13.95'}
                    borrow={'-0.00'}
                />

                <PoolListItem
                    basePair={'AVAX'}
                    tradePair={'USDT'}
                    platform={'Pangolin V2'}
                    yield={'135.35'}
                    yieldOther={'43.01'}
                    farming={'64.48'}
                    fee={'116.43'}
                    borrow={'-45.56'}
                />

                <PoolListItem
                    basePair={'USDC'}
                    tradePair={'AVAX'}
                    platform={'Pangolin V2'}
                    yield={'177.29'}
                    yieldOther={'54.03'}
                    farming={'70.75'}
                    fee={'156.56'}
                    borrow={'-45.56'}
                />

                <PoolListItem
                    basePair={'WETH'}
                    tradePair={'AVAX'}
                    platform={'Pangolin V2'}
                    yield={'45.09'}
                    yieldOther={'20.47'}
                    farming={'34.23'}
                    fee={'26.73'}
                    borrow={'-15.86'}
                />

                <PoolListItem
                    basePair={'AVAX'}
                    tradePair={'DAI'}
                    platform={'Pangolin V2'}
                    yield={'72.21'}
                    yieldOther={'31.27'}
                    farming={'11.65'}
                    fee={'119.92'}
                    borrow={'-59.36'}
                />

            </View>
        </ScrollView>
    )
})

export default Pools
