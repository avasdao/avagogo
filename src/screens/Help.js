/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
  Button,
  Dimensions,
  Pressable,
  SafeAreaView,
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

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

const Support = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('mb-5 p-3')}>
                <Text style={tailwind('text-3xl text-pink-500')}>
                    Support Center
                </Text>

                <Text style={tailwind('mt-3 text-lg text-gray-800')}>
                    Culpa et arbitror e minim, hic quis nisi iis singulis, ne malis distinguantur,
                    occaecat reprehenderit aut voluptate. Hic illum ullamco est amet eu ex multos
                    iudicem ea culpa ubi occaecat, velit est fabulas. Si nescius sed admodum, id
                    aute senserit. Et e tamen minim irure.Summis hic in irure pariatur ne probant
                    dolore sint consequat veniam e doctrina ut magna cupidatat te arbitror labore
                    multos excepteur anim, ea nulla quibusdam nescius, e sint consequat, quem
                </Text>

                <Text style={tailwind('mt-3 text-lg text-gray-800')}>
                    Aut duis tempor eu incididunt. O dolor magna sint constias, de export
                    despicationes, singulis an proident quo sunt proident ut efflorescere o aute
                    possumus singulis, de aliqua incurreret distinguantur non cupidatat export
                    senserit se malis nescius ex sint fore. Incididunt velit anim aut export, legam
                    mentitum nescius, cillum hic mentitum, sed fabulas a mentitum.Fugiat aut iudicem
                    te anim. Ab quorum voluptate relinqueret. Quis voluptate quamquam. Non dolor
                    culpa sunt admodum o enim fabulas cohaerescant de ea culpa aliqua sed laboris te
                    minim nescius ut duis tamen ubi tempor officia hic probant, qui fugiat quibusdam
                    sempiternum, de fugiat aliquip familiaritatem a et anim multos fugiat appellat.
                </Text>
            </View>
        </ScrollView>
    )
}

/**
 * Settings
 */
const Settings = () => {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('p-3')}>
                <Text style={tailwind('text-lg text-gray-800')}>
                    Customize your settings here
                </Text>
            </View>

            <View style={tailwind('p-3')}>
                <Text style={tailwind('text-base text-gray-800 font-light')}>
                    Your window features:
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Width: {Dimensions.get('window').width}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Height: {Dimensions.get('window').height}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Scale: {Dimensions.get('window').scale}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Font scale: {Dimensions.get('window').fontScale}
                </Text>
            </View>

            <View style={tailwind('p-3')}>
                <Text style={tailwind('text-base text-gray-800')}>
                    Your screen features:
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Width: {Dimensions.get('screen').width}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Height: {Dimensions.get('screen').height}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Scale: {Dimensions.get('screen').scale}
                </Text>

                <Text style={tailwind('ml-3 text-sm text-gray-800')}>
                    Font scale: {Dimensions.get('screen').fontScale}
                </Text>
            </View>

        </ScrollView>
    )
}

/**
 * Help Screen
 */
function Help({navigation}) {
    return (
        <View style={tailwind('h-full')}>
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

            <View style={tailwind('py-5 bg-purple-200 items-center')}>
                <LottieView
                    style={tailwind('h-24')}
                    source={require('../assets/lottie/customer-support.json')} autoPlay loop
                />

                <Text style={tailwind('text-purple-500 font-semibold')}>
                    24 Customer Support Center
                </Text>
            </View>

            <Tab.Navigator style={tailwind('')}>
                <Tab.Screen
                    name="Support"
                    component={Support}
                    options={{
                        title: 'Support Center'
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        title: 'Settings'
                    }}
                />
            </Tab.Navigator>

        </View>
    )
}

export default Help
