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

import { observer } from 'mobx-react-lite'

import tailwind from 'tailwind-rn'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import store from '../store'
import Tokens from '../assets/images/tokens'

/**
 * Account Address Abbreviation.
 *
 * Will shorten the length of the address.
 */
const _abbr = (_address) => {
    if (!_address) return '0x0'

    return _address.slice(0, 10) + ' ... ' + _address.slice(-10)
}

/**
 * Parse Pool
 *
 * Splits the base and trade pair values.
 */
const _parsePool = (_pool) => {
    return {
        basePair: _pool.split('/')[0],
        tradePair: _pool.split('/')[1],
    }
}

/**
 * Boosted Farm Calculator
 */
const BoostedFarmCalc = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [assetName, setAssetName] = React.useState(null)
    const [acctAddress, setAcctAddress] = React.useState(null)

    /* Initialize balance handlers. */
    const [balance, setBalance] = React.useState(0)
    const [balanceDisplay, setBalanceDisplay] = React.useState(0)

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
    } = React.useContext(store.Platform)

    /* Initialize PROFILE context. */
    const {
        wallet,
    } = React.useContext(store.Profile)

    let _balanceDisplay
    let formattedBalance
    let timestamp
    let wei

    /* Set contract address. */
    address = '0x25D85E17dD9e544F6E9F8D44F99602dbF5a97341' // Trader Joe - veJOE

    /* Set contract ABI. */
    const abi = require('../assets/abis/trader-joe/veJOE')

    /* Initialize contract. */
    const contract = new ethers.Contract(address, abi, wallet)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Handle Pending Rewards
         *
         * Will regularly update to reflect the last rewards in the UI.
         */
        const handlePendingRewards = async () => {
            wei = await contract
                .getPendingVeJoe(wallet.address)
                .catch(err => console.error(err))
            console.log('Pending rewards:', wei)

            setPendingReward(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('Pending rewards (balance):', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.000000000000')

            setPendingRewardDisplay(formattedBalance)
        }

        /* Start pending rewards interval. */
        // setInterval(handlePendingRewards, 1000)
        handlePendingRewards()
    }, [])

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            // TEMP: FOR DEV ONLY
            setAssetName('VeJOE')

            /* Set account address. */
            setAcctAddress(wallet.address)

            /* Request user infos. */
            const userInfos = await contract.userInfos(wallet.address)
            console.log('User infos:', JSON.stringify(userInfos, null, 2))

            /* Retrieve balance (in wei). */
            wei = userInfos[0]

            /* Set balance. */
            setBalance(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('Balance:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            /* Set (display) balance. */
            setBalanceDisplay(formattedBalance)

            /* Retrieve reward debt (in wei). */
            wei = userInfos[1]

            /* Set reward debt. */
            setRewardDebt(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('Reward debt:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[0000]')

            setRewardDebtDisplay(formattedBalance)

            timestamp = userInfos[2]
            console.log('Last claim', timestamp);

            /* Set last (rewards) claim. */
            setLastClaim(timestamp)

            const _lastClaimDisplay = moment.unix(timestamp).format('llll')

            setLastClaimDisplay(_lastClaimDisplay)

            timestamp = userInfos[3]
            console.log('Speed-up end', timestamp);

            /* Set speed-up end. */
            setSpeedUpEnd(timestamp)

            const _speedUpEndDisplay = moment.unix(timestamp).format('llll')

            setSpeedUpEndDisplay(_speedUpEndDisplay)

        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('bg-gray-800 items-end py-1')}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Ionicons
                        style={tailwind('mr-2 text-gray-300')}
                        name={'close-outline'}
                        size={40}
                        color={'rgba(90, 90, 90, 0.8)'}
                    />
                </Pressable>
            </View>

            <View style={tailwind('w-full mb-4 py-4 bg-purple-200 border-b-2 border-purple-300 items-center')}>
                <Text style={tailwind('text-purple-600 text-2xl font-bold')}>
                    Boosted Farm Calculator
                </Text>
            </View>

            <View style={tailwind('flex flex-row justify-between items-center')}>
                <View style={tailwind('flex flex-col mx-4')}>
                    <Text style={tailwind('text-sm text-gray-400 font-bold uppercase')}>
                        Current Asset
                    </Text>

                    <Text style={tailwind('text-4xl text-gray-800 font-bold')}>
                        {assetName}
                    </Text>
                </View>

                <LottieView
                    style={tailwind('h-20 mr-4')}
                    source={require('../assets/lottie/80736-mbt-calculator.json')} autoPlay loop
                />
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Account Address
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {_abbr(acctAddress)}
                </Text>
            </View>

            <Pressable
                onPress={() => navigation.navigate('Pools')}
                style={tailwind('m-3 flex flex-row justify-between bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}
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

            <Text style={tailwind('m-5 text-gray-400 text-2xl font-semibold text-center')}>
                Boost Your JOE Farm Rewards
            </Text>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    veJOE Balance
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    0.015515830733128148
                </Text>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Total veJOE Supply
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    28921690.857080936
                </Text>
            </View>

            <View style={tailwind('my-1 px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    Pool Share
                </Text>

                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    0.00000515%
                </Text>
            </View>

            <View style={tailwind('my-1 px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    veJOE Share
                </Text>

                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    5.36e-8%
                </Text>
            </View>

            <View style={tailwind('my-1 px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    Base APR (Joe Per Year)
                </Text>

                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    15.3%
                </Text>
            </View>

            <View style={tailwind('my-1 px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    Currented Boosted APR
                </Text>

                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    0.569%
                </Text>
            </View>

            <View style={tailwind('border-t-2 border-purple-300 my-2')} />

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-green-500 text-xl font-bold')}>
                    Est. Boosted APR
                </Text>

                <Text style={tailwind('text-green-500 text-2xl font-bold')}>
                    0.569%
                </Text>
            </View>

        </ScrollView>
    )
})

export default BoostedFarmCalc
