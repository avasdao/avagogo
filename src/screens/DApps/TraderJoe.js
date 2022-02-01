/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import type {Node} from 'react'

import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
    const [searchText, onChangeSearchText] = React.useState(null)

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

    /**
     * Demo Trade
     */
    const demoTrade = () => {
        navigation.navigate('DemoTx')
    }

    /**
     * Preview Message
     */
    const previewMsg = () => {
        alert('Hackathon Preview ONLY\n_.~"~._.~"~._.~"~._.~"~._\nThanks for stopping by...')
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <Image
                style={styles.header}
                source={require('../../assets/dapps/trader-joe/header-bg.png')}
                resizeMode={'cover'}
            />

            <TextInput
                style={tailwind('px-3 border-2 border-gray-300 rounded-xl mt-3 mx-2')}
                onChangeText={onChangeSearchText}
                onFocus={() => alert('Search is NOT enabled in this DEMO')}
                value={searchText}
                placeholder="Search token symbol"
                keyboardType="text"
            />

            <Text style={tailwind('m-5 text-gray-600 text-2xl font-semibold text-center')}>
                One-stop-shop decentralized trading on Avalanche
            </Text>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-600 text-base font-semibold')}>
                    JOE Token
                </Text>

                <Text style={tailwind('text-indigo-600 text-lg font-bold')}>
                    $1.30
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-600 text-base font-semibold')}>
                    Market Cap
                </Text>

                <Text style={tailwind('text-indigo-600 text-lg font-bold')}>
                    $210,752,067
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-600 text-base font-semibold')}>
                    Circulating Supply
                </Text>

                <Text style={tailwind('text-indigo-600 text-lg font-bold')}>
                    161,881,958
                </Text>
            </View>

            <View style={tailwind('flex flex-row my-3')}>
                <Pressable
                    onPress={() => demoTrade()}
                    style={tailwind('m-3 bg-green-500 border-2 border-green-700 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-trade.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Trade
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => previewMsg()}
                    style={tailwind('m-3 bg-blue-300 border-2 border-blue-500 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-pool.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Pool
                    </Text>
                </Pressable>
            </View>

            <View style={tailwind('flex flex-row my-3')}>
                <Pressable
                    onPress={() => alert('Hackathon Preview ONLY\n_.~"~._.~"~._.~"~._.~"~._\nThanks for stopping by...')}
                    style={tailwind('m-3 bg-yellow-300 border-2 border-yellow-500 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-farm.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Farm
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => alert('Hackathon Preview ONLY\n_.~"~._.~"~._.~"~._.~"~._\nThanks for stopping by...')}
                    style={tailwind('m-3 bg-pink-300 border-2 border-pink-500 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-stake.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Stake
                    </Text>
                </Pressable>
            </View>

            <View style={tailwind('flex flex-row my-3')}>
                <Pressable
                    onPress={() => alert('Hackathon Preview ONLY\n_.~"~._.~"~._.~"~._.~"~._\nThanks for stopping by...')}
                    style={tailwind('m-3 bg-purple-200 border-2 border-purple-400 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-farm.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Lend
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => alert('Hackathon Preview ONLY\n_.~"~._.~"~._.~"~._.~"~._\nThanks for stopping by...')}
                    style={tailwind('m-3 bg-indigo-300 border-2 border-indigo-500 rounded-xl items-center justify-center')}
                >
                    <Image
                        style={styles.menuBtn}
                        source={require('../../assets/dapps/trader-joe/menu-zap.png')}
                        resizeMode={'cover'}
                    />
                    <Text style={tailwind('absolute text-purple-500 text-2xl font-bold')}>
                        Zap
                    </Text>
                </Pressable>
            </View>

            <View style={tailwind('my-5')}>
                <View style={tailwind('px-5 flex flex-row justify-between')}>
                    <Text>Token</Text>
                    <Text>Volume (24H)</Text>
                    <Text>Price</Text>
                    <Text>24H</Text>
                    <Text>7D</Text>
                </View>

                <View style={tailwind('mt-3 px-5 flex flex-row justify-between')}>
                    <View style={tailwind('flex flex-row items-center')}>
                        <Image
                            style={tailwind('w-4 h-4 mr-1')}
                            source={require('../../assets/tokens/avax.png')}
                        />
                        <Text>AVAX</Text>
                    </View>
                    <Text>$210,878,984</Text>
                    <Text>$69.98</Text>
                    <Text>-0.21%</Text>
                    <Text>3.03%</Text>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 200,
        opacity: 0.1,
    },
    menuBtn: {
        width: (Dimensions.get('window').width / 2) - 30,
        height: 150,
    },
})

export default DApp
