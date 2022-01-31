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

/**
 * Treasury Screen
 */
function Treasury() {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        // const fetchInfo = async () => {
        //     //
        // }

        /* Fetch info. */
        // fetchInfo()

        /* Set node URL. */
        // const NODE_URL = 'https://speedy-nodes-nyc.moralis.io/39f5474b84a2f39277aea60a/avalanche/mainnet'
        const NODE_URL = 'wss://speedy-nodes-nyc.moralis.io/39f5474b84a2f39277aea60a/avalanche/mainnet/ws'

        /* Set provider. */
        // const provider = new ethers.providers.JsonRpcProvider(NODE_URL)
        const provider = new ethers.providers.WebSocketProvider(NODE_URL)
        // console.log('\nPROVIDER', provider)

        /* Set signer. */
        const signer = provider.getSigner()
        console.log('\nSIGNER', signer)

        /* Set mnemonic. */
        const mnemonic = require('../../.secrets').mnemonic
        console.log('\nMNEMONIC', mnemonic)

        const node = utils.HDNode.fromMnemonic(mnemonic)
        console.log('\nNODE', node)

        // const secondAccount = hdNode.derivePath(`m/44'/60'/0'/0/1`); // This returns a new HDNode
        // const thirdAccount = hdNode.derivePath(`m/44'/60'/0'/0/2`);

        const wallet = Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/0`)
        console.log('\nWALLET', wallet)

    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            {hasAgreed &&
                <View style={tailwind('py-6 items-center')}>
                    <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
                        <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                            $13,370.88
                        </Text>
                    </View>
                </View>
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
                            onPress={() => setHasAgreed(true)}
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
