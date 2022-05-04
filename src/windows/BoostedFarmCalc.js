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

import tailwind from 'tailwind-rn'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import store from '../store'

import Tokens from '../assets/images/tokens'

import Divider from '../components/Divider'
import ScreenTitle from '../components/ScreenTitle'

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
 * Boosted Farm Calculator
 */
const BoostedFarmCalc = observer(({navigation}) => {
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
        /* Initialize handlers. */
        let _balanceDisplay
        let formattedBalance
        let timestamp
        let wei

        /* Set contract address. */
        // NOTE: Trader Joe - VeJoeToken
        const address = '0x3cabf341943Bc8466245e4d6F1ae0f8D071a1456'

        /* Set contract ABI. */
        const abi = require('../assets/abis/trader-joe/VeJoeToken')

        /* Initialize contract. */
        const contract = new ethers.Contract(address, abi, wallet)

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            wei = await contract
                .balanceOf(wallet.address)
                .catch(err => console.error(err))
            // console.log('veJOE BALANCE', wei);

            setVeJoeBalance(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('veJOE BALANCE (display)', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setVeJoeBalanceDisplay(formattedBalance)

            wei = await contract
                .totalSupply()
                .catch(err => console.error(err))
            // console.log('Total supply:', wei)

            setVeJoeTotalSupply(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('Pending rewards (balance):', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0')

            setVeJoeTotalSupplyDisplay(formattedBalance)
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
        const abi = require('../assets/abis/trader-joe/VeJoeStaking')

        /* Initialize contract. */
        const contract = new ethers.Contract(address, abi, wallet)

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            // TEMP: FOR DEV ONLY
            setAssetName('veJOE')

            /* Set account address. */
            setAcctAddress(wallet.address)

            /* Request user infos. */
            const userInfos = await contract
                .userInfos(wallet.address)
                .catch(err => console.error(err))
            // console.log('User infos:', JSON.stringify(userInfos, null, 2))

            /* Retrieve balance (in wei). */
            wei = userInfos[0]

            /* Set balance. */
            setBalance(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('Balance:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            /* Set (display) balance. */
            setBalanceDisplay(formattedBalance)

            /* Retrieve reward debt (in wei). */
            wei = userInfos[1]

            /* Set reward debt. */
            setRewardDebt(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('Reward debt:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[0000]')

            setRewardDebtDisplay(formattedBalance)

            timestamp = userInfos[2]
            // console.log('Last claim', timestamp);

            /* Set last (rewards) claim. */
            setLastClaim(timestamp)

            const _lastClaimDisplay = moment.unix(timestamp).format('llll')

            setLastClaimDisplay(_lastClaimDisplay)

            timestamp = userInfos[3]
            // console.log('Speed-up end', timestamp);

            /* Set speed-up end. */
            setSpeedUpEnd(timestamp)

            const _speedUpEndDisplay = moment.unix(timestamp).format('llll')

            setSpeedUpEndDisplay(_speedUpEndDisplay)

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

            setPendingReward(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            // console.log('Pending rewards (balance):', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.000000000000')

            setPendingRewardDisplay(formattedBalance)
        }

        /* Fetch info. */
        fetchInfo()

        /* Start pending rewards interval. */
        // setInterval(handlePendingRewards, 1000)
        handlePendingRewards()

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

            <ScreenTitle title="Boosted Farm Calculator" />

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

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Total veJOE Supply
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {veJoeTotalSupplyDisplay}
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

            <Text style={tailwind('m-5 text-yellow-700 text-xl font-bold text-center')}>
                Adjust the values shown below to estimate your new {assetName} rewards
            </Text>

            <View style={tailwind('p-3 flex flex-row justify-between')}>
                <View style={tailwind('flex flex-grow mr-1 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <View style={tailwind('flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                            {_parsePool(currentPool).basePair} Bal
                        </Text>

                        <Image
                            style={tailwind('w-6 h-6')}
                            source={Tokens[_parsePool(currentPool).basePair]}
                        />
                    </View>

                    <TextInput
                        style={tailwind('mt-2 px-3 text-gray-200 text-lg font-bold bg-gray-800 border-2 border-blue-500 rounded-xl')}
                        onChangeText={setVeJoeBalanceDisplay}
                        value={basePairBalances ? basePairBalances.display : 0}
                        placeholder="How many?"
                        placeholderTextColor="#AAA"
                    />
                </View>

                <View style={tailwind('flex flex-grow ml-1 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <View style={tailwind('flex flex-row justify-between items-center')}>
                        <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                            {_parsePool(currentPool).tradePair} Bal
                        </Text>

                        <Image
                            style={tailwind('w-6 h-6')}
                            source={Tokens[_parsePool(currentPool).tradePair]}
                        />
                    </View>

                    <TextInput
                        style={tailwind('mt-2 px-3 text-gray-200 text-lg font-bold bg-gray-800 border-2 border-blue-500 rounded-xl')}
                        onChangeText={setVeJoeBalanceDisplay}
                        value={tradePairBalances ? tradePairBalances.display : 0}
                        placeholder="How many?"
                        placeholderTextColor="#AAA"
                    />
                </View>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    veJOE Balance
                </Text>

                <TextInput
                    style={tailwind('mt-1 px-3 text-gray-200 text-2xl font-bold bg-gray-800 border-2 border-blue-500 rounded-xl')}
                    onChangeText={setVeJoeBalanceDisplay}
                    value={veJoeBalanceDisplay}
                    placeholder="Enter your new balance"
                    placeholderTextColor="#AAA"
                />
            </View>

            <View style={tailwind('px-5 mb-7')}>
                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        Pool Share
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        0.00000515%
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        veJOE Share
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        5.36e-8%
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        Base APR (Joe/Year)
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        15.3%
                    </Text>
                </View>

                <View style={tailwind('my-1 flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        Current Boosted APR
                    </Text>

                    <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                        0.569%
                    </Text>
                </View>

                <Divider />

                <View style={tailwind('flex flex-row justify-between items-center')}>
                    <Text style={tailwind('text-green-500 text-2xl font-bold')}>
                        Est. Boosted APR
                    </Text>

                    <Text style={tailwind('text-green-500 text-2xl font-bold')}>
                        0.569%
                    </Text>
                </View>
            </View>

        </ScrollView>
    )
})

export default BoostedFarmCalc
