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

import 'react-native-get-random-values'
import '@ethersproject/shims'
import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'

import numeral from 'numeral'

import store from '../store'

/**
 * Treasury Screen
 */
function Treasury() {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [balance, setBalance] = React.useState(0)
    const [displayBalance, setDisplayBalance] = React.useState(null)
    const [displayUsdBalance, setDisplayUsdBalance] = React.useState(null)

    /* Initialize PROFILE context. */
    const {
        wallet,
        createWallet,
    } = React.useContext(store.Profile)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        const _setWallet = async (_wallet) => {
            // Querying the network
            const wei = await _wallet.getBalance()
                .catch(err => console.error(err))
            console.log('\nWallet balance (wei):', wei, moment().unix())

            setBalance(wei)

            const _displayBalance = ethers.utils.formatUnits(wei, 18)

            const formattedBalance = numeral(_displayBalance).format('0,0.0000')

            setDisplayBalance(formattedBalance)

            const formattedUsdBalance = numeral(_displayBalance * 55).format('$0,0.00[00]')

            setDisplayUsdBalance(formattedUsdBalance)

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
        }

        /* Fetch info. */
        fetchInfo()
    }, [wallet])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            {hasAgreed &&
                <>
                    <Text style={tailwind('m-5 text-gray-600 text-2xl font-semibold text-center')}>
                        One-stop-shop decentralized trading on Avalanche
                    </Text>

                    <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-800 text-lg font-semibold')}>
                            My Account Balance
                        </Text>

                        <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                            {displayBalance}
                        </Text>
                    </View>

                    <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-800 text-lg font-semibold')}>
                            My USD Balance
                        </Text>

                        <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                            {displayUsdBalance}
                        </Text>
                    </View>

                    <View style={tailwind('px-5 flex flex-row justify-between items-center hidden')}>
                        <Text style={tailwind('text-gray-800 text-base font-bold')}>
                            Market Cap
                        </Text>

                        <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                            123,456
                        </Text>
                    </View>

                    <View style={tailwind('px-5 flex flex-row justify-between items-center hidden')}>
                        <Text style={tailwind('text-gray-800 text-base font-bold')}>
                            Circulating Supply
                        </Text>

                        <View style={tailwind('flex flex-row items-end')}>
                            <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                                888,888
                            </Text>

                            <Text style={tailwind('ml-1 mb-1 text-gray-500 text-xs font-bold')}>
                                12%
                            </Text>
                        </View>
                    </View>

                    <View style={tailwind('py-6 items-center')}>

                        <Pressable
                            style={tailwind('flex')}
                            onPress={() => alert('testNotif')}>
                            <Text style={tailwind('text-gray-700 text-xl')}>Inbox</Text>
                        </Pressable>

                        <View style={tailwind('mt-10 py-5 items-center')}>
                            <LottieView
                                style={tailwind('h-48')}
                                source={require('../assets/lottie/finance-guru.json')} autoPlay loop
                            />

                            <Text style={tailwind('text-purple-700 font-light')}>
                                This area is still under development
                            </Text>
                        </View>

                    </View>
                </>
            }

            {!hasAgreed &&
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
            }
        </ScrollView>
    )
}

export default Treasury
