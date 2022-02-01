/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
  Dimensions,
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

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

/**
 * DApp Screen
 */
function DApp({navigation}) {
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

    const MainView = () => {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <View style={tailwind('flex flex-row justify-between')}>

                    <View style={tailwind('w-6/12 my-3 ml-3 p-3 bg-gray-700 opacity-80 rounded-xl')}>
                        <View style={tailwind('flex flex-row items-center')}>
                            <Ionicons
                                style={tailwind('mr-2 text-gray-300')}
                                name={'lock-closed-outline'}
                                size={30}
                                color={'rgba(90, 90, 90, 0.8)'}
                            />

                            <Text style={tailwind('text-gray-200 font-bold text-lg uppercase')}>
                                Total Value Locked
                            </Text>
                        </View>

                        <Text style={tailwind('mt-5 text-gray-50 text-2xl font-bold text-center')}>
                            $465,244,384
                        </Text>
                    </View>

                    <View style={tailwind('w-5/12 m-2 p-3 bg-gray-700 opacity-80 rounded-xl')}>
                        <View style={tailwind('flex flex-row items-center')}>
                            <Ionicons
                                style={tailwind('mr-2 text-gray-300')}
                                name={'globe-outline'}
                                size={30}
                                color={'rgba(90, 90, 90, 0.8)'}
                            />

                            <Text style={tailwind('text-gray-200 font-bold text-lg uppercase')}>
                                Global
                            </Text>
                        </View>

                        <View style={tailwind('mt-3')}>
                            <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                                Total Collateral
                            </Text>

                            <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                                $255,022,498
                            </Text>
                        </View>

                        <View style={tailwind('mt-3')}>
                            <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                                Total Borrow
                            </Text>

                            <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                                $149,184,228
                            </Text>
                        </View>

                        <View style={tailwind('mt-3')}>
                            <Text style={tailwind('text-gray-300 text-sm font-medium')}>
                                Active Positions
                            </Text>

                            <Text style={tailwind('text-gray-50 text-base font-bold text-right')}>
                                865 Positions
                            </Text>
                        </View>
                    </View>

                </View>


                <View style={tailwind('w-full m-3 p-3 bg-gray-700 opacity-80 rounded-xl items-center')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Ionicons
                            style={tailwind('mr-2 text-gray-300')}
                            name={'lock-closed-outline'}
                            size={20}
                            color={'rgba(90, 90, 90, 0.8)'}
                        />

                        <Text style={tailwind('text-gray-200 font-medium')}>
                            Farm Pools (12 Pools)
                        </Text>
                    </View>

                    <Text style={tailwind('mt-2 text-gray-50 text-lg')}>
                        ALL | Yield Farming | Liquidity Providing
                    </Text>
                </View>
            </ScrollView>
        )
    }

    return (
        <View>
            <Image
                style={tailwind('w-full absolute')}
                source={require('../../assets/backgrounds/gradient-purple-pink.jpg')}
            />

            <MainView />
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        // position: 'absolute',
        // top: 0,
        // bottom: 0,
        // backgroundImage: 'linear-gradient(red, orange)',
        // width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height,
        // opacity: 0.5,
    },
    header: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200,
        opacity: 0.2,
    },
    menuBtn: {
        width: (Dimensions.get('window').width / 2) - 30,
        height: 150,
    },
})

export default DApp
