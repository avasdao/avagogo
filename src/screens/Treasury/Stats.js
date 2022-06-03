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
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import store from '../../store'

import Divider from '../../components/Divider'

/**
 * Blank Screen
 */
const Blank = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            //
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('flex flex-row border-b-2 border-yellow-700')}>
                <View style={tailwind('flex-1 items-center p-3 bg-yellow-300 border-r-2 border-yellow-700')}>
                    <Text style={tailwind('text-base text-yellow-700 font-bold uppercase opacity-50')}>
                        Portfolio Value
                    </Text>

                    <View style={tailwind('my-3 h-56 w-56 flex justify-center items-center rounded-full border-8 border-yellow-500 bg-yellow-100')}>
                        <Ionicons
                            style={tailwind('absolute top-4 text-yellow-600')}
                            name={'bar-chart-outline'}
                            size={45}
                        />

                        <Text style={tailwind('my-5 text-4xl text-yellow-800 font-bold')}>
                            $133.7K
                        </Text>

                        <View style={tailwind('absolute bottom-5 flex items-center')}>
                            <Text style={tailwind('text-xs text-yellow-700 uppercase')}>
                                Next Milestone
                            </Text>

                            <Text style={tailwind('text-lg text-yellow-700 font-bold')}>
                                $150K
                            </Text>
                        </View>
                    </View>

                    <View style={tailwind('flex flex-row')}>
                        <Text style={tailwind('text-xs text-yellow-700 italic')}>
                            last synced
                        </Text>

                        <Text style={tailwind('ml-1 text-xs text-yellow-700 font-bold italic')}>
                            5 minutes ago
                        </Text>
                    </View>

                </View>

                <View style={tailwind('flex-none w-36 bg-yellow-500 p-3')}>
                    <View style={tailwind('flex items-center mb-2')}>
                        <Text style={tailwind('text-base text-yellow-50 font-bold uppercase opacity-70')}>
                            Performance
                        </Text>
                    </View>

                    <View style={tailwind('flex flex-col my-3 px-2 py-1 border-2 border-yellow-100 bg-yellow-300 rounded-lg')}>
                        <Text style={tailwind('text-xs text-yellow-600 font-medium uppercase')}>
                            Total Return $
                        </Text>

                        <Text style={tailwind('text-lg text-yellow-800 font-bold')}>
                            + 83.01
                        </Text>
                    </View>

                    <View style={tailwind('flex flex-col my-3 px-2 py-1 border-2 border-yellow-100 bg-yellow-300 rounded-lg')}>
                        <Text style={tailwind('text-xs text-yellow-600 font-medium uppercase')}>
                            Total Return %
                        </Text>

                        <Text style={tailwind('text-lg text-yellow-800 font-bold')}>
                            + 4.15%
                        </Text>
                    </View>

                    <View style={tailwind('flex flex-col my-3 px-2 py-1 border-2 border-yellow-100 bg-yellow-300 rounded-lg')}>
                        <Text style={tailwind('text-xs text-yellow-600 font-medium uppercase')}>
                            Cost Balance
                        </Text>

                        <Text style={tailwind('text-lg text-yellow-800 font-bold')}>
                            $51.57
                        </Text>
                    </View>
                </View>
            </View>

            <View style={tailwind('py-10 bg-gray-50 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../../assets/lottie/finance-guru.json')} autoPlay loop
                />

                <Text style={tailwind('text-base text-gray-500 font-semibold')}>
                    Crunching numbers to find you profits
                </Text>
            </View>

        </ScrollView>
    )
})

export default Blank
