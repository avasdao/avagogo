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

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import store from '../store'

import Tokens from '../assets/tokens'

/**
 * Token Label
 *
 * We need to add the `.e` -suffix to bridged tokens.
 */
const getTokenLabel = (_token) => {
    switch(_token) {
    case 'CRA':
    case 'DAI':
    case 'JOE':
    case 'MIM':
    case 'SLOT':
    case 'THOR':
    case 'TUS':
    case 'USDC':
    case 'USDT':
    case 'WETH':
        return _token + '.e'
    default:
        return _token
    }
}

/**
 * Pool List Item
 */
const PoolListItem = observer((_params) => {
    /* Initialize navigation. */
    const navigation = useNavigation()

    const {
        openPreview,
    } = React.useContext(store.System)

    /* Set base pair. */
    const basePair = _params.basePair
    // console.log('BASE PAIR', basePair)

    /* Set trade pair. */
    const tradePair = _params.tradePair
    // console.log('TRADE PAIR', tradePair)

    /* Set platform. */
    const platform = _params.platform
    // console.log('PLATFORM', platform)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            //
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    return (
        <Pressable
            onPress={() => navigation.navigate('EarlyPreview')}
            style={tailwind('mt-3 px-3 py-2 flex flex-row justify-between bg-yellow-100 border-2 border-yellow-300 rounded-xl')}
        >
            <View style={tailwind('flex flex-row items-center')}>
                <View style={tailwind('flex mr-2')}>
                    <Image
                        style={tailwind('w-6 h-6')}
                        source={Tokens[basePair]}
                    />

                    <Image
                        style={tailwind('w-6 h-6 relative -mt-1')}
                        source={Tokens[tradePair]}
                    />
                </View>

                <View>
                    <Text style={tailwind('text-xs font-bold')}>
                        {platform}
                    </Text>

                    <Text style={tailwind('text-xs font-bold')}>
                        {getTokenLabel(basePair)}/{getTokenLabel(tradePair)}
                    </Text>
                </View>
            </View>

            <View>
                <Text style={tailwind('text-lg font-bold')}>
                    206.23%
                </Text>

                <Text style={tailwind('text-base font-bold line-through')}>
                    59.87%
                </Text>
            </View>

            <View>
                <Text style={tailwind('text-xs font-semibold')}>
                    Yield Farming
                </Text>

                <Text style={tailwind('text-xs font-semibold')}>
                    Trading Fee
                </Text>

                <Text style={tailwind('text-xs font-semibold')}>
                    Borrow APY
                </Text>
            </View>

            <View>
                <Text style={tailwind('text-xs font-bold text-right')}>
                    95.02%
                </Text>

                <Text style={tailwind('text-xs font-bold text-right')}>
                    156.77%
                </Text>

                <Text style={tailwind('text-xs font-bold text-right')}>
                    -45.56%
                </Text>
            </View>
        </Pressable>
    )
})

export default PoolListItem
