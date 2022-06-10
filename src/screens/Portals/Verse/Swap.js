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
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import LottieView from 'lottie-react-native'

import store from '../../../store'

import Tokens from '../../../assets/images/tokens'

import Divider from '../../../components/Divider'

/**
 * Account Address Abbreviation.
 *
 * Will shorten the length of the address.
 */
const _abbr = (_address) => {
    if (!_address) return '0x0'

    return _address.slice(0, 10) + ' ... ' + _address.slice(-8)
}

/**
 * Parse Pool
 *
 * Splits the base and trade pair values.
 */
const _parsePool = (_pool) => {
    /* Validate pool. */
    if (!_pool) {
        return {
            basePair: null,
            tradePair: null,
        }
    }

    return {
        basePair: _pool.split('/')[0],
        tradePair: _pool.split('/')[1],
    }
}

/**
 * DEX Screen
 */
const DEX = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [assetName, setAssetName] = React.useState(null)
    const [acctAddress, setAcctAddress] = React.useState(null)

    /* Initialize balance handlers. */
    const [balance, setBalance] = React.useState(0)
    const [balanceDisplay, setBalanceDisplay] = React.useState(0)

    /* Initialize veJOE balance handlers. */
    // FIXME: How can we make this generic.
    const [veJoeBalance, setVeJoeBalance] = React.useState(0)
    // const [veJoeBalanceDisplay, onChangeVeJoeBalance] = React.useState(null)
    const [veJoeBalanceDisplay, setVeJoeBalanceDisplay] = React.useState(0)

    /* Initialize veJOE total supply handlers. */
    // FIXME: How can we make this generic.
    const [veJoeTotalSupply, setVeJoeTotalSupply] = React.useState(0)
    const [veJoeTotalSupplyDisplay, setVeJoeTotalSupplyDisplay] = React.useState(0)

    /* Initialize reward debt handlers. */
    const [rewardDebt, setRewardDebt] = React.useState(0)
    const [rewardDebtDisplay, setRewardDebtDisplay] = React.useState(0)

    /* Initialize last claim handlers. */
    const [lastClaim, setLastClaim] = React.useState(0)
    const [lastClaimDisplay, setLastClaimDisplay] = React.useState(0)

    /* Initialize speed-up handlers. */
    const [speedUpEnd, setSpeedUpEnd] = React.useState(0)
    const [speedUpEndDisplay, setSpeedUpEndDisplay] = React.useState(0)

    /* Initialize pending reward handlers. */
    const [pendingReward, setPendingReward] = React.useState(0)
    const [pendingRewardDisplay, setPendingRewardDisplay] = React.useState(0)

    /* Initialize PLATFORM context. */
    const {
        currentPool,
        basePairBalances,
        tradePairBalances,
    } = React.useContext(store.Platform)

    /* Initialize PROFILE context. */
    const {
        wallet,
    } = React.useContext(store.Profile)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /* Set token address. */
        const address = '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' // JOE

        /* Set ABI. */
        const abi = require('../../../assets/abis/trader-joe/JOE')

        /* Initialize contract. */
        const contract = new ethers.Contract(address, abi, wallet)

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            const wei = await contract
                .balanceOf(wallet.address)
                .catch(err => console.error(err))
            // console.log('JOE BALANCE', wei);

            setJoeBalance(wei)

            const _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('JOE BALANCE (display)', typeof _balanceDisplay, _balanceDisplay);

            const formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setJoeBalanceDisplay(formattedBalance)
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /* Set contract address. */
        // NOTE: Trader Joe - VeJoeToken
        const address = '0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456'

        /* Set contract ABI. */
        const abi = require('../../../assets/abis/trader-joe/VeJoeToken')

        /* Initialize contract. */
        const contract = new ethers.Contract(address, abi, wallet)

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            const wei = await contract
                .balanceOf(wallet.address)
                .catch(err => console.error(err))
            // console.log('veJOE BALANCE', wei);

            setVeJoeBalance(wei)

            const _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('veJOE BALANCE (display)', typeof _balanceDisplay, _balanceDisplay);

            const formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setVeJoeBalanceDisplay(formattedBalance)
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /* Initialize handlers. */
        let _balanceDisplay
        let formattedBalance
        let timestamp
        let wei

        /* Set contract address. */
        // NOTE: Trader Joe - VeJoeStaking (proxy)
        const address = '0x25D85E17dD9e544F6E9F8D44F99602dbF5a97341'

        /* Set contract ABI. */
        const abi = require('../../../assets/abis/trader-joe/VeJoeStaking')

        /* Initialize contract. */
        const contract = new ethers.Contract(address, abi, wallet)

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            const userInfos = await contract
                .userInfos(wallet.address)
                .catch(err => console.error(err))
            // console.log('USER INFOS', userInfos);

            wei = userInfos[0]

            setVeJoeBalance(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('veJOE BALANCE:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setVeJoeBalanceDisplay(formattedBalance)

            wei = userInfos[1]

            setRewardDebt(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('REWARD DEBT:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[0000]')

            setRewardDebtDisplay(formattedBalance)

            timestamp = userInfos[2]
            // console.log('LAST CLAIM', timestamp);

            setLastClaim(timestamp)

            const _lastClaimDisplay = moment.unix(timestamp).format('llll')

            setLastClaimDisplay(_lastClaimDisplay)

            const _lastClaimSinceDisplay = moment.unix(timestamp).fromNow()

            setLastClaimSinceDisplay(_lastClaimSinceDisplay)

            timestamp = userInfos[3]
            // console.log('SPEED UP END', timestamp);

            setSpeedUpEnd(timestamp)

            const _speedUpEndDisplay = moment.unix(timestamp).format('llll')

            setSpeedUpEndDisplay(_speedUpEndDisplay)

            const _speedUpUntilEndDisplay = moment.unix(timestamp).fromNow()

            setSpeedUpUntilEndDisplay(_speedUpUntilEndDisplay)
        }

        /**
         * Handle Pending Rewards
         *
         * Will regularly update to reflect the last rewards in the UI.
         */
        const handlePendingRewards = async () => {
            wei = await contract
                .getPendingVeJoe(wallet.address)
                .catch(err => console.error(err))
            // console.log('Pending rewards:', wei)

            setPendingVeJoe(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('Pending veJOE BALANCE:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.000000000000')

            setPendingVeJoeDisplay(formattedBalance)
        }

        /* Fetch info. */
        // fetchInfo()

        /* Start pending rewards interval. */
        // setInterval(handlePendingRewards, 1000)
        // handlePendingRewards()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('px-3')}
        >
            <View style={tailwind('mt-3 flex flex-row')}>
                <Pressable
                    onPress={() => alert('USD')}
                    style={tailwind('py-1 px-4 border-2 border-yellow-600 border-r bg-yellow-400 rounded-l-full')}
                >
                    <Text style={tailwind('text-yellow-800 text-lg font-bold')}>
                        USD
                    </Text>
                </Pressable>

                <Pressable
                	onPress={() => alert('BCH')}
                	style={tailwind('py-1 px-4 border-2 border-green-600 border-l bg-green-400 rounded-r-full')}
                >
                	<Text style={tailwind('text-green-800 text-lg font-bold')}>
                		BCH
                	</Text>
                </Pressable>
            </View>

            <Pressable
                onPress={() => navigation.navigate('Pools')}
                style={tailwind('mt-3 flex flex-row justify-between bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}
            >
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        Selected Pool
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {currentPool || 'no pool selected'}
                    </Text>
                </View>

                {currentPool &&
                    <View style={tailwind('flex flex-row mr-2')}>
                        <View style={tailwind('bg-gray-50 border-4 border-gray-50 rounded-full overflow-hidden')}>
                            <Image
                                style={tailwind('w-12 h-12')}
                                source={Tokens[_parsePool(currentPool).basePair]}
                            />
                        </View>

                        <View style={tailwind('bg-gray-50 border-4 border-gray-50 rounded-full overflow-hidden relative -ml-4')}>
                            <Image
                                style={tailwind('w-12 h-12')}
                                source={Tokens[_parsePool(currentPool).tradePair]}
                            />
                        </View>
                    </View>
                }
            </Pressable>

            <View style={tailwind('mt-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    BCH Balance
                </Text>

                <TextInput
                    style={tailwind('mt-1 px-3 text-gray-200 text-2xl font-bold bg-gray-800 border-2 border-blue-500 rounded-xl')}
                    onChangeText={setVeJoeBalanceDisplay}
                    value={veJoeBalanceDisplay}
                    placeholder="Enter your new balance"
                    placeholderTextColor="#AAA"
                />
            </View>

            <View style={tailwind('mt-3 flex flex-row justify-between items-center')}>
                <View style={tailwind('flex flex-col mx-4 mb-2')}>
                    <Text style={tailwind('text-sm text-gray-400 font-bold uppercase')}>
                        Current Asset
                    </Text>

                    <Text style={tailwind('text-4xl text-gray-800 font-bold')}>
                        {assetName}
                    </Text>
                </View>

                <LottieView
                    style={tailwind('h-20 mr-4')}
                    source={require('../../../assets/lottie/80736-mbt-calculator.json')} autoPlay loop
                />
            </View>

            <Pressable
                onPress={() => navigation.navigate('Pools')}
                style={tailwind('mt-3 flex flex-row justify-between bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}
            >
                <View>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        Selected Pool
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {currentPool || 'no pool selected'}
                    </Text>
                </View>

                {currentPool &&
                    <View style={tailwind('flex flex-row mr-2')}>
                        <View style={tailwind('bg-gray-50 border-4 border-gray-50 rounded-full overflow-hidden')}>
                            <Image
                                style={tailwind('w-12 h-12')}
                                source={Tokens[_parsePool(currentPool).basePair]}
                            />
                        </View>

                        <View style={tailwind('bg-gray-50 border-4 border-gray-50 rounded-full overflow-hidden relative -ml-4')}>
                            <Image
                                style={tailwind('w-12 h-12')}
                                source={Tokens[_parsePool(currentPool).tradePair]}
                            />
                        </View>
                    </View>
                }
            </Pressable>

            <View style={tailwind('mt-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    flexUSD Balance
                </Text>

                <TextInput
                    style={tailwind('mt-1 px-3 text-gray-200 text-2xl font-bold bg-gray-800 border-2 border-blue-500 rounded-xl')}
                    onChangeText={setVeJoeBalanceDisplay}
                    value={veJoeBalanceDisplay}
                    placeholder="Enter your new balance"
                    placeholderTextColor="#AAA"
                />
            </View>

            <View style={tailwind('mt-1 pl-3')}>
                <Text style={tailwind('text-gray-500 font-medium')}>
                    * estimated amount received
                </Text>
            </View>

            <View style={tailwind('my-3 flex flex-row justify-end')}>
                <Pressable
                	onPress={() => alert('confirm swap')}
                	style={tailwind('py-2 px-5 border-2 border-blue-500 bg-blue-300 rounded-xl')}
                >
                	<Text style={tailwind('text-blue-800 text-2xl font-bold')}>
                		Swap Preview
                	</Text>
                </Pressable>
            </View>

            <Divider />

            <Text style={tailwind('m-5 text-yellow-500 text-xl font-bold text-center')}>
                Exchange Details
            </Text>

            <View style={tailwind('px-5 mb-7')}>
                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                        Exchange Path
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        BCH &gt; flexUSD
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                        Exchange Fee
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        0.3%
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                        Minimum Expected
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        0 flexUSD
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                        Slippage Tolerance
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        1.00%
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-500 text-lg font-bold')}>
                        Exchange Provider
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        Verse DEX
                    </Text>
                </View>
            </View>
        </ScrollView>
    )
})

export default DEX
