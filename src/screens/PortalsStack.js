/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

/* Add START screen. */
import Start from './Portals'

/* Add BOARDS screens. */
import _1inch from './Portals/1inch'
import Aave from './Portals/Aave'
import AlphaFinanceLab from './Portals/AlphaFinanceLab'
import BENQI from './Portals/BENQI'
import BenSwap from './Portals/BenSwap'
import Compound from './Portals/Compound'
import Cream from './Portals/Cream'
import Curve from './Portals/Curve'
import MistSwap from './Portals/MistSwap'
import PancakeSwap from './Portals/PancakeSwap'
import Pangolin from './Portals/Pangolin'
import TangoSwap from './Portals/TangoSwap'

import TraderJoe from './Portals/TraderJoe'
import TraderJoeStake from './Portals/TraderJoe/Stake'

import Uniswap from './Portals/Uniswap'
import Verse from './Portals/Verse'
import Yearn from './Portals/Yearn'
import YieldYak from './Portals/YieldYak'

import InfoButton from '../components/InfoButton'

/* Initialize navigators. */
const Stack = createNativeStackNavigator()

/**
 * Portals Stack
 */
const PortalsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Portals.Start"
                component={Start}
                options={{
                    title: 'Portals',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.1inch"
                component={_1inch}
                options={{
                    title: '1inch Network',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Aave"
                component={Aave}
                options={{
                    title: 'Aave',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.AlphaFinanceLab"
                component={AlphaFinanceLab}
                options={{
                    title: 'Alpha Finance Lab',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.BENQI"
                component={BENQI}
                options={{
                    title: 'BENQI',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.BenSwap"
                component={BenSwap}
                options={{
                    title: 'BenSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Compound"
                component={Compound}
                options={{
                    title: 'Compound',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Cream"
                component={Cream}
                options={{
                    title: 'Cream',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Curve"
                component={Curve}
                options={{
                    title: 'Curve',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.MistSwap"
                component={MistSwap}
                options={{
                    title: 'MistSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.PancakeSwap"
                component={PancakeSwap}
                options={{
                    title: 'PancakeSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Pangolin"
                component={Pangolin}
                options={{
                    title: 'Pangolin',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.TangoSwap"
                component={TangoSwap}
                options={{
                    title: 'TangoSwap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.TraderJoe"
                component={TraderJoe}
                options={{
                    title: 'Trader Joe',
                    headerRight: InfoButton,
                }}
            />
            <Stack.Screen
                name="Portals.TraderJoeStake"
                component={TraderJoeStake}
                options={{
                    title: 'Trader Joe Staking',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Uniswap"
                component={Uniswap}
                options={{
                    title: 'Uniswap',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Verse"
                component={Verse}
                options={{
                    title: 'Verse',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.Yearn"
                component={Yearn}
                options={{
                    title: 'Yearn Finance',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Portals.YieldYak"
                component={YieldYak}
                options={{
                    title: 'Yield Yak',
                    headerRight: InfoButton,
                }}
            />

        </Stack.Navigator>
    )
}

export default PortalsStack
