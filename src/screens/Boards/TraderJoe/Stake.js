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

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'
import numeral from 'numeral'

import LottieView from 'lottie-react-native'

import store from '../../../store'

/**
 * Stake Screen
 */
const Stake = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    const [joeBalance, setJoeBalance] = React.useState(0)
    const [joeBalanceDisplay, setJoeBalanceDisplay] = React.useState(0)
    const [sJoeBalance, setSJoeBalance] = React.useState(0)
    const [sJoeBalanceDisplay, setSJoeBalanceDisplay] = React.useState(0)
    const [rJoeBalance, setRJoeBalance] = React.useState(0)
    const [rJoeBalanceDisplay, setRJoeBalanceDisplay] = React.useState(0)
    const [veJoeBalance, setVeJoeBalance] = React.useState(0)
    const [veJoeBalanceDisplay, setVeJoeBalanceDisplay] = React.useState(0)

    const [rewardDebt, setRewardDebt] = React.useState(0)
    const [rewardDebtDisplay, setRewardDebtDisplay] = React.useState(0)
    const [lastClaim, setLastClaim] = React.useState(0)
    const [lastClaimDisplay, setLastClaimDisplay] = React.useState(0)
    const [speedUpEnd, setSpeedUpEnd] = React.useState(0)
    const [speedUpEndDisplay, setSpeedUpEndDisplay] = React.useState(0)
    const [pendingVeJoe, setPendingVeJoe] = React.useState(0)
    const [pendingVeJoeDisplay, setPendingVeJoeDisplay] = React.useState(0)

    /* Initialize PROFILE context. */
    const {
        wallet,
    } = React.useContext(store.Profile)

    let _balanceDisplay
    let formattedBalance
    let timestamp
    let wei

    /* Set contract address. */
    const address = '0x25D85E17dD9e544F6E9F8D44F99602dbF5a97341'

    /* Set contract ABI. */
    const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"maxCapPct","type":"uint256"}],"name":"UpdateMaxCapPct","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"lastRewardTimestamp","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"accVeJoePerShare","type":"uint256"}],"name":"UpdateRewardVars","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"speedUpThreshold","type":"uint256"}],"name":"UpdateSpeedUpThreshold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"veJoePerSharePerSec","type":"uint256"}],"name":"UpdateVeJoePerSharePerSec","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"withdrawAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"burnAmount","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[],"name":"ACC_VEJOE_PER_SHARE_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"VEJOE_PER_SHARE_PER_SEC_PRECISION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"accVeJoePerShare","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claim","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getPendingVeJoe","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IERC20Upgradeable","name":"_joe","type":"address"},{"internalType":"contract VeJoeToken","name":"_veJoe","type":"address"},{"internalType":"uint256","name":"_veJoePerSharePerSec","type":"uint256"},{"internalType":"uint256","name":"_speedUpVeJoePerSharePerSec","type":"uint256"},{"internalType":"uint256","name":"_speedUpThreshold","type":"uint256"},{"internalType":"uint256","name":"_speedUpDuration","type":"uint256"},{"internalType":"uint256","name":"_maxCapPct","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"joe","outputs":[{"internalType":"contract IERC20Upgradeable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastRewardTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxCapPct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxCapPct","type":"uint256"}],"name":"setMaxCapPct","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_speedUpThreshold","type":"uint256"}],"name":"setSpeedUpThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_veJoePerSharePerSec","type":"uint256"}],"name":"setVeJoePerSharePerSec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"speedUpDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"speedUpThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"speedUpVeJoePerSharePerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"updateRewardVars","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"upperLimitMaxCapPct","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"upperLimitVeJoePerSharePerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userInfos","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"rewardDebt","type":"uint256"},{"internalType":"uint256","name":"lastClaimTimestamp","type":"uint256"},{"internalType":"uint256","name":"speedUpEndTimestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veJoe","outputs":[{"internalType":"contract VeJoeToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"veJoePerSharePerSec","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]

    /* Initialize contract. */
    const contract = new ethers.Contract(address, abi, wallet)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /* Set token address. */
        const address = '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' // JOE

        /* Set ABI. */
        const abi = require('../assets/abis/trader-joe/JOE')

        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            const contract = new ethers.Contract(address, abi, wallet)

            const wei = await contract.balanceOf(wallet.address)
            console.log('JOE BALANCE', wei);

            setJoeBalance(wei)

            const _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('JOE BALANCE (display)', typeof _balanceDisplay, _balanceDisplay);

            const formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setJoeBalanceDisplay(formattedBalance)
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

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

            setPendingVeJoe(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('Pending veJOE BALANCE:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.000000000000')

            setPendingVeJoeDisplay(formattedBalance)
        }

        /* Start pending rewards interval. */
        // setInterval(handlePendingRewards, 1000)
    }, [])

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            // const balance = await contract.balanceOf(wallet.getAddress())
            const userInfos = await contract.userInfos(wallet.address)
            console.log('USER INFOS', userInfos);

            wei = userInfos[0]

            setVeJoeBalance(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('veJOE BALANCE:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[00]')

            setVeJoeBalanceDisplay(formattedBalance)

            wei = userInfos[1]

            setRewardDebt(wei)

            _balanceDisplay = utils.formatUnits(wei, 18)
            console.log('REWARD DEBT:', typeof _balanceDisplay, _balanceDisplay);

            formattedBalance = numeral(_balanceDisplay).format('0,0.0000[0000]')

            setRewardDebtDisplay(formattedBalance)

            timestamp = userInfos[2]
            console.log('LAST CLAIM', timestamp);

            setLastClaim(timestamp)

            const _lastClaimDisplay = moment.unix(timestamp).format('llll')

            setLastClaimDisplay(_lastClaimDisplay)

            timestamp = userInfos[3]
            console.log('SPEED UP END', timestamp);

            setSpeedUpEnd(timestamp)

            const _speedUpEndDisplay = moment.unix(timestamp).format('llll')

            setSpeedUpEndDisplay(_speedUpEndDisplay)

        }

        /* Fetch info. */
        // fetchInfo()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('mx-3 mt-5 mb-3 border-2 border-indigo-300 rounded-xl')}>
                <View style={tailwind('mx-3 mt-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        JOE BALANCE
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {joeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('mx-3 mt-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        sJOE BALANCE
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {sJoeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('mx-3 mt-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        rJOE BALANCE
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {rJoeBalanceDisplay}
                    </Text>
                </View>

                <View style={tailwind('mx-3 my-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                    <Text style={tailwind('text-gray-500 text-base font-bold')}>
                        veJOE BALANCE
                    </Text>

                    <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                        {veJoeBalanceDisplay}
                    </Text>
                </View>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold')}>
                    PENDING VEJOE BALANCE
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {pendingVeJoeDisplay}
                </Text>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold')}>
                    REWARD DEBT
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {rewardDebtDisplay}
                </Text>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold')}>
                    LAST CLAIM TIME
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {lastClaimDisplay}
                </Text>
            </View>

            <View style={tailwind('m-3 bg-gray-200 border-2 border-gray-400 px-3 py-2 rounded-lg')}>
                <Text style={tailwind('text-gray-500 text-base font-bold')}>
                    SPEED-UP END TIME
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {speedUpEndDisplay}
                </Text>
            </View>

            <Pressable
                onPress={() => navigation.navigate('BoostedFarmCalc')}
                style={tailwind('m-3 bg-purple-200 border-2 border-purple-400 rounded-xl items-center justify-center')}
            >
                <Text style={tailwind('py-3 text-purple-500 text-2xl font-bold')}>
                    Boosted Farm Calculator
                </Text>
            </Pressable>

            <View style={tailwind('py-5 bg-gray-50 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../../../assets/lottie/couple-talk.json')} autoPlay loop
                />

                <Text style={tailwind('text-pink-500 font-semibold')}>
                    24 Hour Cafe
                </Text>
            </View>

        </ScrollView>
    )
})

export default Stake
