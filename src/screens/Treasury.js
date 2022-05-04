/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
    Pressable,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import store from '../store'

import Tokens from '../assets/images/tokens'

import Divider from '../components/Divider'
import ScreenTitle from '../components/ScreenTitle'

/**
 * Treasury Screen
 */
function Treasury() {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [balance, setBalance] = React.useState(0)
    const [balanceDisplay, setBalanceDisplay] = React.useState(null)
    const [usdBalanceDisplay, setUsdBalanceDisplay] = React.useState(null)

    const [tokenBalances, setTokenBalances] = React.useState({})

    /* Initialize TOKEN context. */
    const {
        getBalances,
    } = React.useContext(store.Token)

    /* Initialize PROFILE context. */
    const {
        wallet,
        createWallet,
    } = React.useContext(store.Profile)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        const _setWallet = async (_wallet) => {
            // Querying the network
            const wei = await _wallet.getBalance()
                .catch(err => console.error(err))
            console.log('\nWallet balance (wei):', wei, moment().unix())

            setBalance(wei)

            const _balanceDisplay = utils.formatUnits(wei, 18)

            const formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setBalanceDisplay(formattedBalance)

            const formattedUsdBalance = numeral(_balanceDisplay * 55).format('$0,0.00[00]')

            setUsdBalanceDisplay(formattedUsdBalance)

            const txCount = await _wallet.getTransactionCount()
                .catch(err => console.error(err))
            console.log('\nWallet # txs:', txCount, moment().unix())

        }

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            console.log('\nSaved wallet:', wallet)

            /* Validate wallet. */
            if (!wallet) {
                /* Create new wallet. */
                const returnedWallet = await createWallet()
                    .catch(err => console.error(err))
                console.log('\nTreasury created a NEW wallet:', returnedWallet)

                /* Set wallet. */
                _setWallet(returnedWallet)
            } else {
                /* Set wallet. */
                _setWallet(wallet)
            }

            /* Initialize handler. */
            let _tokenBalances = {}

            /* Request token balances. */
            _tokenBalances['DAI'] = await getBalances('DAI')
            _tokenBalances['JOE'] = await getBalances('JOE')
            _tokenBalances['USDT'] = await getBalances('USDT')
            _tokenBalances['YAK'] = await getBalances('YAK')
            console.log('TOKEN BALANCES:', JSON.stringify(_tokenBalances, null, 2))

            /* Set token balances. */
            setTokenBalances(_tokenBalances)
        }

        /* Fetch info. */
        fetchInfo()
    }, [wallet])

    /* Validate user agreement. */
    if (hasAgreed || !DEBUG) {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <ScreenTitle title="$1,337.88 USD" />

                <View style={tailwind('p-3')}>
                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-semibold')}>
                            My Account Balance
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {balanceDisplay}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-semibold')}>
                            My USD Balance
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {usdBalanceDisplay}
                        </Text>
                    </View>

                    <Divider />

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            DAI.e Token
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {tokenBalances['DAI'] ? tokenBalances['DAI'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            JOE Token
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {tokenBalances['JOE'] ? tokenBalances['JOE'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            YAK Token
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {tokenBalances['YAK'] ? tokenBalances['YAK'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            USDT.e Token
                        </Text>

                        <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                            {tokenBalances['USDT'] ? tokenBalances['USDT'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-10 items-center')}>
                        <LottieView
                            style={tailwind('h-48')}
                            source={require('../assets/lottie/finance-guru.json')} autoPlay loop
                        />
                    </View>
                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <View>
                    <View style={tailwind('px-5 pt-5 items-center')}>
                        <Text style={tailwind('text-lg text-gray-800 font-bold')}>
                            Welcome to your Treasury!
                        </Text>

                        <Text style={tailwind('mt-3 text-lg text-gray-800')}>
                            This area is where you can easily manage ALL of your assets in one place.
                        </Text>
                    </View>

                    <View style={tailwind('py-5 items-center')}>
                        <LottieView
                            style={tailwind('h-48')}
                            source={require('../assets/lottie/treasure-chest.json')} autoPlay loop
                        />

                        <Text style={tailwind('text-pink-500 font-semibold')}>
                            Your AVAX Treasury
                        </Text>
                    </View>

                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-sm text-red-500 font-bold')}>
                            !! WARNING !!
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            This is a very early (alpha) release of Ava GoGo that is currently using a <Text style={tailwind('font-bold')}>"SHARED"</Text> wallet for ALL demo users.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            Our team has <Text style={tailwind('font-bold')}>10+ years</Text> of experience in building secure crypto wallets.
                            We've carefully implemented an abundance of protections against ANY loss of funds.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            Modenero Corp and the team of Ava GoGo make <Text style={tailwind('font-bold')}>NO GUARANTEE</Text> about the safety and security of the Treasury.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-red-500 font-bold')}>
                            !! USE AT YOUR OWN RISK !!
                        </Text>
                    </View>

                    <View style={tailwind('py-6 items-center')}>
                        <Pressable
                            onPress={() => setHasAgreed(true) }
                            style={tailwind('bg-yellow-200 px-10 py-2 border-2 border-yellow-400 rounded-xl')}
                        >
                            <Text style={tailwind('text-yellow-800 text-xl font-semibold')}>
                                Okay, got it!
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Treasury
