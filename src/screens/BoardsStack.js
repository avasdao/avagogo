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
import Start from './Boards'

/* Add BOARDS screens. */
import _1inch from './Boards/1inch'
import Aave from './Boards/Aave'
import AlphaFinanceLab from './Boards/AlphaFinanceLab'
import BENQI from './Boards/BENQI'
import Compound from './Boards/Compound'
import Cream from './Boards/Cream'
import Curve from './Boards/Curve'
import MistSwap from './Boards/MistSwap'
import PancakeSwap from './Boards/PancakeSwap'
import Pangolin from './Boards/Pangolin'

import TraderJoe from './Boards/TraderJoe'
import TraderJoeStake from './Boards/TraderJoe/Stake'

import Uniswap from './Boards/Uniswap'
import Yearn from './Boards/Yearn'
import YieldYak from './Boards/YieldYak'

import InfoButton from '../components/InfoButton'

/* Initialize navigators. */
const Stack = createNativeStackNavigator()

/**
 * Boards Stack
 */
const BoardsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Boards.Start"
                component={Start}
                options={{
                    title: 'Boards',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.1inch"
                component={_1inch}
                options={{
                    title: '1inch Network',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Aave"
                component={Aave}
                options={{
                    title: 'Aave',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.AlphaFinanceLab"
                component={AlphaFinanceLab}
                options={{
                    title: 'Alpha Finance Lab',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.BENQI"
                component={BENQI}
                options={{
                    title: 'BENQI',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Compound"
                component={Compound}
                options={{
                    title: 'Compound',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Cream"
                component={Cream}
                options={{
                    title: 'Cream',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Curve"
                component={Curve}
                options={{
                    title: 'Curve',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.MistSwap"
                component={MistSwap}
                options={{
                    title: 'MistSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.PancakeSwap"
                component={PancakeSwap}
                options={{
                    title: 'PancakeSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Pangolin"
                component={Pangolin}
                options={{
                    title: 'Pangolin',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.TraderJoe"
                component={TraderJoe}
                options={{
                    title: 'Trader Joe',
                    headerRight: InfoButton,
                }}
            />
            <Stack.Screen
                name="Boards.TraderJoeStake"
                component={TraderJoeStake}
                options={{
                    title: 'Trader Joe Staking',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Uniswap"
                component={Uniswap}
                options={{
                    title: 'Uniswap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.Yearn"
                component={Yearn}
                options={{
                    title: 'Yearn Finance',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Boards.YieldYak"
                component={YieldYak}
                options={{
                    title: 'Yield Yak',
                    headerRight: InfoButton,
                }}
            />

        </Stack.Navigator>
    )
}

export default BoardsStack
