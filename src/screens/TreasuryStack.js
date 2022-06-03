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
import Start from './Treasury'

/* Add TREASURY screens. */
import Recent from './Treasury/Recent'

import InfoButton from '../components/InfoButton'

/* Initialize navigators. */
const Stack = createNativeStackNavigator()

/**
 * Treasury Stack
 */
const TreasuryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Treasury.Start"
                component={Start}
                options={{
                    title: 'Treasury',
                    headerRight: InfoButton,
                }}
            />

            <Stack.Screen
                name="Treasury.Recent"
                component={Recent}
                options={{
                    title: 'Recent Transactions',
                    headerRight: InfoButton,
                }}
            />

        </Stack.Navigator>
    )
}

export default TreasuryStack
