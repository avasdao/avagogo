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
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { observer } from 'mobx-react-lite'

// import Ionicons from 'react-native-vector-icons/Ionicons'

// import tailwind from 'tailwind-rn'

// import LottieView from 'lottie-react-native'

// import store from '../store'

/* Add (top-level) screens. */
import HelpScreen from './Help'
import TabsScreen from './Tabs'

/* Add (modal) windows. */
import EarlyPreviewWin from '../windows/EarlyPreview'
import TxManagerWin from '../windows/TxManager'

/* Initialize navigators. */
const HomeStack = createNativeStackNavigator()

/**
 * Home Stack Screen
 */
const Home = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name="Start" component={TabsScreen} />
            <HomeStack.Screen name="Help" component={HelpScreen} />

            <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
                <HomeStack.Screen name="EarlyPreview" component={EarlyPreviewWin} />
                <HomeStack.Screen name="TxManager" component={TxManagerWin} />
            </HomeStack.Group>
        </HomeStack.Navigator>
    )
}

export default Home
