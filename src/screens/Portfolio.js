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

import store from '../store'

import FundsManagerScreen from './Portfolio/FundsManager'
import TradeCenterScreen from './Portfolio/TradeCenter'

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

/**
 * Portfolio Screen
 */
function Portfolio() {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Validate user agreement. */
    if (hasAgreed || !DEBUG) {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Centers"
                    component={TradeCenterScreen}
                    options={{
                        title: 'Centers'
                    }}
                />
                <Tab.Screen
                    name="Funds"
                    component={FundsManagerScreen}
                    options={{
                        title: 'Funds'
                    }}
                />
            </Tab.Navigator>
        )
    } else {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <View>
                    <View style={tailwind('px-5 pt-5 items-center')}>
                        <Text style={tailwind('text-lg text-gray-800 font-bold')}>
                            DeFi will NEVER be easier than this!
                        </Text>

                        <Text style={tailwind('mt-3 text-lg text-gray-800')}>
                            You can easily keep track of ALL your <Text style={tailwind('font-bold')}>"Managed" Investment Funds</Text> from one central location.
                        </Text>
                    </View>

                    <View style={tailwind('mt-3 py-5 items-center')}>
                        <LottieView
                            style={tailwind('h-48')}
                            source={require('../assets/lottie/happy-pig.json')} autoPlay loop
                        />

                        <Text style={tailwind('mt-3 text-pink-800 font-semibold')}>
                            Your AVAX Daily Earnings
                        </Text>
                    </View>

                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-sm text-red-500 font-bold')}>
                            !! WARNING !!
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            This is a very early (alpha) release of Ava GoGo that is currently using a <Text style={tailwind('font-bold')}>"SHARED"</Text> wallet for ALL demo users.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            It is very likely that other users will be modifying the portofio when you are not using the app.
                        </Text>
                    </View>

                    <View style={tailwind('py-6 items-center')}>
                        <Pressable
                            onPress={() => setHasAgreed(true)}
                            style={tailwind('bg-yellow-200 px-10 py-2 border-2 border-yellow-400 rounded-xl')}
                        >
                            <Text style={tailwind('text-yellow-800 text-xl font-semibold')}>
                                Okay, got it!
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Portfolio
