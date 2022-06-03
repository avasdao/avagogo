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

import {
    VictoryArea,
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryContainer,
    VictoryGroup,
    VictoryLine,
    VictoryTheme
} from 'victory-native'

import store from '../store'

import Tokens from '../assets/images/tokens'

import Divider from '../components/Divider'
import ScreenTitle from '../components/ScreenTitle'

import Platforms from '../components/Treasury/Platforms'
import Recent from '../components/Treasury/Recent'
import Rewards from '../components/Treasury/Rewards'

const chartConfig = {
    // backgroundColor: "#e26a00",
    backgroundGradientFrom: "#f80",
    backgroundGradientTo: "#726",
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
    }
}

const userData = [
    { timestamp: 1, earnings: 10081 },
    { timestamp: 2, earnings: 12158 },
    { timestamp: 3, earnings: 15798 },
    { timestamp: 4, earnings: 13412 },
    { timestamp: 5, earnings: 12434 },
    { timestamp: 6, earnings: 9482 },
]

/**
 * Treasury Screen
 */
function Treasury({navigation}) {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [balance, setBalance] = React.useState(0)
    const [balanceDisplay, setBalanceDisplay] = React.useState(null)
    const [usdBalanceDisplay, setUsdBalanceDisplay] = React.useState('$1,337.88')

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

    /* Retreive window width. */
    const width = Dimensions.get('window').width

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
                <Pressable
                    style={tailwind('flex flex-col items-center border-b-4 border-gray-300')}
                    onPress={() => navigation.navigate('Treasury.Stats')}
                >
                    <View style={tailwind('my-1 flex flex-col items-center')}>
                        <Text style={tailwind('text-gray-400 text-lg font-bold uppercase')}>
                            Balance
                        </Text>

                        <View style={tailwind('mt-3')}>
                            <Text style={tailwind('absolute -right-2 -top-5 text-green-500 text-base font-bold')}>
                                USD
                            </Text>

                            <Text style={tailwind('text-green-500 text-4xl font-bold')}>
                                {usdBalanceDisplay}
                            </Text>
                        </View>

                        <Text style={tailwind('text-gray-400 text-xs italic')}>
                            updated 10 minutes ago
                        </Text>
                    </View>

                    <VictoryGroup
                        width={width}
                        height={width / 5}
                        style={{
                            parent: tailwind('mt-5'),
                        }}
                        theme={VictoryTheme.material}
                        padding={{ top: -5, bottom: -10, left: -10, right: -10 }}
                        domainPadding={10}
                        containerComponent={<VictoryContainer disableContainerEvents />}
                    >
                        <VictoryArea
                            data={userData}
                            x='timestamp'
                            y='earnings'
                            labels={({ datum }) => datum.y}
                            // labels={['1', '2', '3', '4']}
                            interpolation='natural'
                            style={{
                                data: {
                                    fill: '#0089BA',
                                    stroke: '#845EC2',
                                    strokeWidth: 5,
                                }
                            }}
                        />
                    </VictoryGroup>
                </Pressable>

                <View style={tailwind('p-3')}>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            DAI.e Token
                        </Text>

                        <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                            {tokenBalances['DAI'] ? tokenBalances['DAI'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            JOE Token
                        </Text>

                        <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                            {tokenBalances['JOE'] ? tokenBalances['JOE'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            YAK Token
                        </Text>

                        <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                            {tokenBalances['YAK'] ? tokenBalances['YAK'].display : 0}
                        </Text>
                    </View>

                    <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                            USDT.e Token
                        </Text>

                        <Text style={tailwind('text-gray-600 text-xl font-bold')}>
                            {tokenBalances['USDT'] ? tokenBalances['USDT'].display : 0}
                        </Text>
                    </View>

                    <Divider />

                    <Recent />

                    <Divider />

                    <Platforms />

                    <Divider />

                    <Rewards />

                    <Divider />

                    <>
                        <View style={tailwind('my-1')}>
                            <Text style={tailwind('text-gray-400 text-base font-bold uppercase')}>
                                Bills &amp; Income
                            </Text>
                        </View>

                        <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                            <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                                Trader Joe
                            </Text>

                            <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                                1 day ago - $1,337.88
                            </Text>
                        </View>
                    </>

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
