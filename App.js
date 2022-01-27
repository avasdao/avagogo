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
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import AppsScreen from './src/screens/Apps'
import CafeScreen from './src/screens/Cafe'
import HelpScreen from './src/screens/Help'
import PortfoliosScreen from './src/screens/Portfolios'
import TreasuryScreen from './src/screens/Treasury'

/**
 * Help & Support Button
 */
const HelpButton = () => {
    /* Request navigation. */
    const navigation = useNavigation()

    // const navState = navigation.getState()
    // console.log('NAVIGATION (state):', navState)

    return (
        <Pressable onPress={() => navigation.navigate('Help')}>
            <Ionicons
                style={tailwind('mr-3')}
                name={'information-circle'}
                size={36}
                color={'rgba(180, 90, 90, 0.8)'}
            />
        </Pressable>
    )
}

/* Initialize navigators. */
const HomeStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

/**
 * Tab Screens
 */
const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Apps') {
                        iconName = focused
                        ? 'ios-apps'
                        : 'ios-apps-outline'
                    } else if (route.name === 'Cafe') {
                        iconName = focused
                        ? 'ios-cafe'
                        : 'ios-cafe-outline'
                    } else if (route.name === 'Portfolios') {
                        iconName = focused
                        ? 'ios-bar-chart'
                        : 'ios-bar-chart-outline'
                    } else if (route.name === 'Treasury') {
                        iconName = focused
                        ? 'ios-cash'
                        : 'ios-cash-outline'
                    }

                    /* Return (tab) icon. */
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Portfolios"
                component={PortfoliosScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />

            <Tab.Screen
                name="Treasury"
                component={TreasuryScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />

            <Tab.Screen
                name="Cafe"
                component={CafeScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />

            <Tab.Screen
                name="Apps"
                component={AppsScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />
        </Tab.Navigator>
    )
}

/**
 * Home Stack Screen
 */
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name="Start" component={TabScreens} />
            <HomeStack.Screen name="Help" component={HelpScreen} />
        </HomeStack.Navigator>
    )
}

/**
 * Main Application
 */
const App = () => {
    /* Request dard mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(180, 180, 180, 0.8)',
    }

    return (
        <NavigationContainer>
            <SafeAreaView style={backgroundStyle, tailwind('h-full')}>
                <HomeStackScreen />
            </SafeAreaView>
        </NavigationContainer>
    )
}

export default App
