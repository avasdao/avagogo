/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

// import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

// import tailwind from 'tailwind-rn'

// import LottieView from 'lottie-react-native'

// import store from '../store'

/* Add (navigation) stacks. */
import BoardsStackScreen from './BoardsStack'

/* Add (main) screens. */
import CafeScreen from './Cafe'
import PortfolioScreen from './Portfolio'
import TreasuryScreen from './Treasury'

import HelpButton from '../components/HelpButton'

/* Initialize navigators. */
const Tab = createBottomTabNavigator()

/**
 * Bottom Navigation Tabs
 */
const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Boards') {
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
                name="Boards"
                component={BoardsStackScreen}
                options={{
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs
