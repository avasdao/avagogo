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

import { ethers, utils, Wallet } from 'ethers'

import numeral from 'numeral'

import LottieView from 'lottie-react-native'

/**
 * Board Screen
 */
function Board({navigation}) {
    const [searchText, onChangeSearchText] = React.useState(null)

    const [joeTokenPrice, setJoeTokenPrice] = React.useState(false)
    const [marketCap, setMarketCap] = React.useState(false)
    const [circulatingSupply, setCirculatingSupply] = React.useState(false)
    const [circulatingPct, setCirculatingPct] = React.useState(false)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            /* Initialize handlers. */
            let response
            let wei

            const ENDPOINT_JOE_USD = 'https://api.traderjoexyz.com/priceusd/0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd'
            const ENDPOINT_CIRCULATING_SUPPLY = 'https://api.traderjoexyz.com/supply/circulating'
            const ENDPOINT_MAX_SUPPLY = 'https://api.traderjoexyz.com/supply/max'

            /* Request JOE/USD price. */
            response = await fetch(ENDPOINT_JOE_USD)
                .catch(err => console.error(err))

            /* Decode (quote) response. */
            wei = await response.text()
                .catch(err => console.error(err))
            console.log('JOE/USD:', wei)

            /* Convert to USD. */
            const usd = utils.formatUnits(wei, 18)

            /* Format USD. */
            const formattedUsd = numeral(usd).format('$0,0.00[00]')

            /* Set token price. */
            setJoeTokenPrice(formattedUsd)

            /* Request circulating supply. */
            response = await fetch(ENDPOINT_CIRCULATING_SUPPLY)
                .catch(err => console.error(err))

            /* Decode circulating supply. */
            wei = await response.text()
                .catch(err => console.error(err))
            console.log('Circulating supply:', wei)

            /* Convert to circulating supply. */
            const _circulatingSupply = utils.formatUnits(wei, 18)

            /* Format circulating supply. */
            const formattedSupply = numeral(_circulatingSupply).format('0,0')

            /* Set circulating supply. */
            setCirculatingSupply(formattedSupply)

            /* Request max supply. */
            response = await fetch(ENDPOINT_MAX_SUPPLY)
                .catch(err => console.error(err))

            /* Decode max supply. */
            wei = await response.text()
                .catch(err => console.error(err))
            console.log('Maximum supply:', wei)

            /* Convert to max supply. */
            const maxSupply = utils.formatUnits(wei, 18)

            /* Calculate circulating percentage. */
            const _circulatingPct = _circulatingSupply / maxSupply
            console.log('Circulating percentage (of max):', _circulatingPct)

            /* Format circulating percentage. */
            const formattedPct = numeral(_circulatingPct).format('0.00%')

            /* Set circulating percentage. */
            setCirculatingPct(formattedPct)

            /* Calculate (circulating) market cap. */
            const marketCap = _circulatingSupply * usd

            /* Format (circulating) market cap. */
            const formattedCap = numeral(marketCap).format('$0,0')

            /* Set (circulating) market cap. */
            setMarketCap(formattedCap)
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    /**
     * Demo Trade
     */
    const demoTrade = () => {
        navigation.navigate('TxManager')
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
            />

            <Text style={tailwind('m-5 text-gray-600 text-2xl font-semibold text-center')}>
                One-stop-shop decentralized trading on Avalanche
            </Text>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    JOE Token
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {joeTokenPrice}
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-base font-bold')}>
                    Market Cap
                </Text>

                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    {marketCap}
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-base font-bold')}>
                    Circulating Supply
                </Text>

                <View style={tailwind('flex flex-row items-end')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        {circulatingSupply}
                    </Text>

                    <Text style={tailwind('ml-1 mb-1 text-gray-500 text-xs font-bold')}>
                        {circulatingPct}
                    </Text>
                </View>
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
                    onPress={() => navigation.navigate('EarlyPreview')}
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
                    onPress={() => navigation.navigate('EarlyPreview')}
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
                    onPress={() => navigation.navigate('Boards.TraderJoeStake')}
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
                    onPress={() => navigation.navigate('EarlyPreview')}
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
                    onPress={() => navigation.navigate('EarlyPreview')}
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
                            source={require('../../assets/images/tokens/AVAX.png')}
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

export default Board
