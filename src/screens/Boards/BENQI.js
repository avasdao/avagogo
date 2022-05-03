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
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

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
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <Text style={tailwind('my-16 text-purple-600 text-3xl font-semibold text-center uppercase')}>
                BENQI
            </Text>

            <View style={tailwind('py-5 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../../assets/lottie/finance-guru.json')} autoPlay loop
                />

                <Text style={tailwind('text-purple-700 font-light')}>
                    This area is still under development
                </Text>
            </View>

        </ScrollView>
    )
}

export default Board
