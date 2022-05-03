/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import {
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import {
  LineChart,
} from 'react-native-chart-kit'

import PoolListItem from '../../components/PoolListItem'

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

/**
 * Yield
 */
const Yield = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('m-3')}>

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
}

/**
 * Liquidity
 */
const Liquidity = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('mt-10 items-center')}>
                <Text style={tailwind('text-gray-500 text-lg font-light text-center uppercase')}>
                    no liquidity providers found
                </Text>

                <LottieView
                    style={tailwind('h-48')}
                    source={require('../../assets/lottie/no-result-found.json')} autoPlay loop
                />
            </View>
        </ScrollView>
    )
}

/**
 * Board Screen
 */
function Board({navigation}) {
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
        <View style={tailwind('h-full')}>
            <Image
                style={tailwind('w-full absolute')}
                source={require('../../assets/backgrounds/gradient-purple-pink.jpg')}
            />

            <View style={tailwind('my-2 flex flex-row justify-between')}>

                <View style={tailwind('w-6/12 my-3 ml-3 p-3 bg-gray-700 opacity-90 rounded-xl')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Ionicons
                            style={tailwind('mr-2 text-gray-300')}
                            name={'lock-closed-outline'}
                            size={30}
                        />

                        <Text style={tailwind('text-yellow-300 font-bold text-lg text-center uppercase')}>
                            Total Value Locked
                        </Text>
                    </View>

                    <Text style={tailwind('mt-5 text-gray-50 text-2xl font-bold text-center')}>
                        $465,244,384
                    </Text>

                    <LineChart
                        data={{
                            labels: ['Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan'],
                            datasets: [
                                {
                                    data: [
                                        Math.random() * (75 - 25) + 25,
                                        Math.random() * (100 - 50) + 50,
                                        Math.random() * (125 - 75) + 75,
                                        Math.random() * (150 - 100) + 100,
                                        Math.random() * (175 - 125) + 125,
                                        Math.random() * (200 - 150) + 150,
                                    ]
                                }
                            ]
                        }}
                        width={175}
                        height={100}
                        yAxisLabel="$"
                        yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#7e89b7",
                            backgroundGradientTo: "#b35a94",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            // style: {
                            //     borderRadius: 16,
                            //     padding: 10
                            // },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginTop: 24,
                            marginBottom: 8,
                            borderRadius: 8,
                            // paddingVertical: 5,
                            // paddingHorizontal: 5,
                        }}
                    />

                </View>

                <View style={tailwind('w-5/12 m-2 p-3 bg-gray-700 opacity-90 rounded-xl')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Ionicons
                            style={tailwind('mr-2 text-gray-300')}
                            name={'globe-outline'}
                            size={30}
                        />

                        <Text style={tailwind('text-yellow-300 font-bold text-lg text-center uppercase')}>
                            Global Market
                        </Text>
                    </View>

                    <View style={tailwind('mt-3')}>
                        <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                            Total Collateral
                        </Text>

                        <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                            $255,022,498
                        </Text>
                    </View>

                    <View style={tailwind('mt-3')}>
                        <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                            Total Borrow
                        </Text>

                        <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                            $149,184,228
                        </Text>
                    </View>

                    <View style={tailwind('mt-3')}>
                        <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                            Active Positions
                        </Text>

                        <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                            865 Positions
                        </Text>
                    </View>
                </View>
            </View>

            <Tab.Navigator style={tailwind('')}>
                <Tab.Screen
                    name="Yield"
                    component={Yield}
                    options={{
                        title: 'Yield Farming'
                    }}
                />
                <Tab.Screen
                    name="Liquidity"
                    component={Liquidity}
                    options={{
                        title: 'Liquidity'
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}

export default Board
