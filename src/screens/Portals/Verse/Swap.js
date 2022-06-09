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

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import LottieView from 'lottie-react-native'

import store from '../../../store'

/**
 * DEX Screen
 */
const DEX = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize JOE balance handlers. */
    const [joeBalance, setJoeBalance] = React.useState(0)
    const [joeBalanceDisplay, setJoeBalanceDisplay] = React.useState(0)

    /* Initialize sJOE balance handlers. */
    const [sJoeBalance, setSJoeBalance] = React.useState(0)
    const [sJoeBalanceDisplay, setSJoeBalanceDisplay] = React.useState(0)

    /* Initialize rJOE balance handlers. */
    const [rJoeBalance, setRJoeBalance] = React.useState(0)
    const [rJoeBalanceDisplay, setRJoeBalanceDisplay] = React.useState(0)

    /* Initialize veJOE balance handlers. */
    const [veJoeBalance, setVeJoeBalance] = React.useState(0)
    const [veJoeBalanceDisplay, setVeJoeBalanceDisplay] = React.useState(0)

    /* Initialize reward debt handlers. */
    const [rewardDebt, setRewardDebt] = React.useState(0)
    const [rewardDebtDisplay, setRewardDebtDisplay] = React.useState(0)

    /* Initialize last claim handlers. */
    const [lastClaim, setLastClaim] = React.useState(0)
    const [lastClaimDisplay, setLastClaimDisplay] = React.useState(0)
    const [lastClaimSinceDisplay, setLastClaimSinceDisplay] = React.useState(0)

    /* Initialize speed-up handlers. */
    const [speedUpEnd, setSpeedUpEnd] = React.useState(0)
    const [speedUpEndDisplay, setSpeedUpEndDisplay] = React.useState(0)
    const [speedUpUntilEndDisplay, setSpeedUpUntilEndDisplay] = React.useState(0)

    /* Initialize pending reward handlers. */
    const [pendingVeJoe, setPendingVeJoe] = React.useState(0)
    const [pendingVeJoeDisplay, setPendingVeJoeDisplay] = React.useState(0)

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
        fetchInfo()

        /* Start pending rewards interval. */
        // setInterval(handlePendingRewards, 1000)
        handlePendingRewards()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('px-3')}
        >
            <View style={tailwind('m-4 p-3 border-2 border-purple-400 bg-purple-200 rounded-lg')}>
                <View style={tailwind('flex-row justify-between')}>
                    <View>
                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            THIS IS THE DEX
                        </Text>

                        <Text style={tailwind('text-2xl text-gray-700 font-bold')}>
                            $1,049,237.18
                        </Text>

                        <Text style={tailwind('text-sm text-purple-700 font-bold uppercase')}>
                            Jun 02, '22
                        </Text>
                    </View>

                    <View>
                        <Text style={tailwind('text-sm font-bold')}>
                            1W | 1M | ALL
                        </Text>
                    </View>
                </View>
            </View>

            <View style={tailwind('mt-5 mb-3 px-3 border-4 border-purple-300 bg-purple-200 rounded-xl')}>
                <View style={tailwind('mt-3 bg-gray-200 border-2 border-gray-50 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        Staked JOE Balance
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {joeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('mt-3 bg-gray-200 border-2 border-gray-50 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        sJOE Balance
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {sJoeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('mt-3 bg-gray-200 border-2 border-gray-50 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        rJOE Balance
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {rJoeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('my-3 bg-gray-200 border-2 border-gray-50 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                        veJOE Balance
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {veJoeBalanceDisplay}
                    </Text>
                </View>
            </View>

            <View style={tailwind('my-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Pending veJOE Balance
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {pendingVeJoeDisplay}
                </Text>
            </View>

            <View style={tailwind('my-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Reward Debt
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {rewardDebtDisplay}
                </Text>
            </View>

            <View style={tailwind('my-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Last Claim Time
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {lastClaimDisplay}
                </Text>

                <Text style={tailwind('text-red-500 text-lg font-bold')}>
                    {lastClaimSinceDisplay}
                </Text>
            </View>

            <View style={tailwind('my-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold uppercase')}>
                    Speed-up End Time
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {speedUpEndDisplay}
                </Text>

                <Text style={tailwind('text-red-500 text-lg font-bold')}>
                    {speedUpUntilEndDisplay}
                </Text>
            </View>

            <Pressable
                onPress={() => navigation.navigate('BoostedFarmCalc')}
                style={tailwind('mt-3 mb-7 bg-yellow-200 border-2 border-yellow-400 rounded-xl items-center justify-center')}
            >
                <Text style={tailwind('py-3 text-yellow-500 text-2xl font-bold')}>
                    Boosted Farm Calculator
                </Text>

                <LottieView
                    style={tailwind('h-32')}
                    source={require('../../../assets/lottie/96208-carbon-calculator.json')} autoPlay loop
                />
            </Pressable>
        </ScrollView>
    )
})

export default DEX
