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

import { useNavigation } from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

/**
 * Information Center Button
 *
 * Loads a "context-sensitive" information screen.
 */
const InfoButton = () => {
    /* Request navigation. */
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Info')}>
            <Ionicons
                style={tailwind('mr-2')}
                name={'information-circle'}
                size={36}
                color={'rgba(180, 90, 90, 0.8)'}
            />
        </Pressable>
    )
}

export default InfoButton
