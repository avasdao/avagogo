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

import {
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import AnalyticsScreen from './Uniswap/Analytics'
import HistoryScreen from './Uniswap/History'
import InvestScreen from './Uniswap/Invest'
import SwapScreen from './Uniswap/Swap'

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

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
        <Tab.Navigator>
            <Tab.Screen
                name="Swap"
                component={SwapScreen}
                options={{
                    title: 'Swap'
                }}
            />

            <Tab.Screen
                name="Invest"
                component={InvestScreen}
                options={{
                    title: 'Invest'
                }}
            />

            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    title: 'History'
                }}
            />

            <Tab.Screen
                name="Analytics"
                component={AnalyticsScreen}
                options={{
                    title: 'Analytics'
                }}
            />
        </Tab.Navigator>
    )
}

export default Board
