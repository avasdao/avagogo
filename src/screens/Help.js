/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import type {Node} from 'react'

import {
    Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

/**
 * Help Screen
 */
function Help({navigation}) {
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
                        color={'rgba(90, 90, 90, 0.8)'}
                    />
                </Pressable>
            </View>

            <View style={tailwind('py-6 items-center')}>
                <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
                    <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                        Portfolio Help
                    </Text>
                </View>
            </View>

            <View style={tailwind('py-5 bg-gray-50 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../assets/lottie/customer-support.json')} autoPlay loop
                />

                <Text style={tailwind('text-pink-500 font-semibold')}>
                    24 Customer Support Center
                </Text>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>
                    Do you need help?
                </Text>

                <Button onPress={() => navigation.goBack()} title="No thanks" />
            </View>

        </ScrollView>
    )
}

export default Help
