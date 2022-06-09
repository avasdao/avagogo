/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

/* Add (navigation) stacks. */
import BoardsStackScreen from './BoardsStack'
import TreasuryStackScreen from './TreasuryStack'

/* Add (main) screens. */
import CafeScreen from './Cafe'
import PortfolioScreen from './Portfolio'

import InfoButton from '../components/InfoButton'
import MenuButton from '../components/MenuButton'

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
                    } else if (route.name === 'Café') {
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
                    return <Ionicons
                        name={iconName}
                        size={size}
                        color={color}
                    />
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
                    headerRight: MenuButton,
                }}
            />

            <Tab.Screen
                name="Treasury"
                component={TreasuryStackScreen}
                options={{
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name="Café"
                component={CafeScreen}
                options={{
                    headerRight: InfoButton,
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
