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

import Bugsnag from '@bugsnag/react-native'

import store from './store'

import DAppsStart from './screens/DApps'
import AlphaFinanceLabs from './screens/DApps/AlphaFinanceLabs'
import BENQI from './screens/DApps/BENQI'
import Pangolin from './screens/DApps/Pangolin'
import TraderJoe from './screens/DApps/TraderJoe'
import YieldYak from './screens/DApps/YieldYak'

import CafeScreen from './screens/Cafe'
import TxManagerScreen from './screens/TxManager'
import HelpScreen from './screens/Help'
import PortfolioScreen from './screens/Portfolio'
import TreasuryScreen from './screens/Treasury'

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
const DappsStack = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

/**
 * DApps Stack Screen
 */
const DappsStackScreen = () => {
    return (
        <DappsStack.Navigator>
            <DappsStack.Screen
                name="DAppsStart"
                component={DAppsStart}
                options={{
                    title: 'DApp Store',
                    headerRight: HelpButton,
                }}
            />

            <DappsStack.Screen
                name="DAppsAlphaFinanceLabs"
                component={AlphaFinanceLabs}
                options={{
                    title: 'Alpha Finance Labs',
                    headerRight: HelpButton,
                }}
            />

            <DappsStack.Screen
                name="DAppsBENQI"
                component={BENQI}
                options={{
                    title: 'BENQI',
                    headerRight: HelpButton,
                }}
            />

            <DappsStack.Screen
                name="DAppsPangolin"
                component={Pangolin}
                options={{
                    title: 'Pangolin',
                    headerRight: HelpButton,
                }}
            />

            <DappsStack.Screen
                name="DAppsTraderJoe"
                component={TraderJoe}
                options={{
                    title: 'Trader Joe',
                    headerRight: HelpButton,
                }}
            />

            <DappsStack.Screen
                name="DAppsYieldYak"
                component={YieldYak}
                options={{
                    title: 'Yield Yak',
                    headerRight: HelpButton,
                }}
            />
        </DappsStack.Navigator>
    )
}

/**
 * Tab Screens
 */
const TabScreens = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'DApps') {
                        iconName = focused
                        ? 'ios-apps'
                        : 'ios-apps-outline'
                    } else if (route.name === 'Cafe') {
                        iconName = focused
                        ? 'ios-cafe'
                        : 'ios-cafe-outline'
                    } else if (route.name === 'Portfolio') {
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
                tabBarItemStyle: { paddingBottom: 3 },
            })}
        >
            <Tab.Screen
                name="Portfolio"
                component={PortfolioScreen}
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
                    tabBarBadge: 3,
                }}
            />

            <Tab.Screen
                name="DApps"
                component={DappsStackScreen}
                options={{
                    headerShown: false,
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

            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name="TxManager" component={TxManagerScreen} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

/**
 * Main Application
 */
const App = () => {
    const { createNavigationContainer } = Bugsnag.getPlugin('reactNavigation')
    const BugsnagNavigationContainer = createNavigationContainer(
        NavigationContainer)

    /* Request dard mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(180, 180, 180, 0.8)',
    }

    return (
        <BugsnagNavigationContainer>
            <SafeAreaView style={backgroundStyle, tailwind('h-full')}>
                <HomeStackScreen />
            </SafeAreaView>
        </BugsnagNavigationContainer>
    )
}

export default App
