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

import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Add START screen. */
import BoardsStart from './Boards'

/* Add BOARDS screens. */
import _1inch from './Boards/1inch'
import Aave from './Boards/Aave'
import AlphaFinanceLabs from './Boards/AlphaFinanceLabs'
import BENQI from './Boards/BENQI'
import Curve from './Boards/Curve'
import MistSwap from './Boards/MistSwap'
import PancakeSwap from './Boards/PancakeSwap'
import Pangolin from './Boards/Pangolin'
import TraderJoe from './Boards/TraderJoe'
import YieldYak from './Boards/YieldYak'

import HelpButton from '../components/HelpButton'

/* Initialize navigators. */
const Stack = createNativeStackNavigator()

/**
 * Boards Stack
 */
const BoardsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BoardsStart"
                component={BoardsStart}
                options={{
                    title: 'Boards',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="Boards1inch"
                component={_1inch}
                options={{
                    title: '1inch Network',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsAave"
                component={Aave}
                options={{
                    title: 'Aave',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsAlphaFinanceLabs"
                component={AlphaFinanceLabs}
                options={{
                    title: 'Alpha Finance Labs',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsBENQI"
                component={BENQI}
                options={{
                    title: 'BENQI',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsCurve"
                component={Curve}
                options={{
                    title: 'Curve',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsMistSwap"
                component={MistSwap}
                options={{
                    title: 'MistSwap',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsPancakeSwap"
                component={PancakeSwap}
                options={{
                    title: 'PancakeSwap',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsPangolin"
                component={Pangolin}
                options={{
                    title: 'Pangolin',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsTraderJoe"
                component={TraderJoe}
                options={{
                    title: 'Trader Joe',
                    headerRight: HelpButton,
                }}
            />

            <Stack.Screen
                name="BoardsYieldYak"
                component={YieldYak}
                options={{
                    title: 'Yield Yak',
                    headerRight: HelpButton,
                }}
            />

        </Stack.Navigator>
    )
}

export default BoardsStack
