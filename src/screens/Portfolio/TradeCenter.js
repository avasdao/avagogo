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

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import moment from 'moment'

import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryLine,
    VictoryTheme
} from 'victory-native'

import store from '../../store'

import Divider from '../../components/Divider'
import ScreenTitle from '../../components/ScreenTitle'
import Search from '../../components/Search'

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

const data = [
    { month: 1, earnings: 13000 },
    { month: 2, earnings: 16500 },
    { month: 3, earnings: 14250 },
    { month: 4, earnings: 19000 },
    { month: 5, earnings: 27000 },
    { month: 6, earnings: 700 },
]

const data2 = [
    { month: 1, earnings: 5000 },
    { month: 2, earnings: 9500 },
    { month: 3, earnings: 7250 },
    { month: 4, earnings: 11000 },
    { month: 5, earnings: 17000 },
]

/**
 * Dashboard Screen
 */
const Dashboard = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)
    // const [searchText, onChangeSearchText] = React.useState(null)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Retreive window width. */
    const width = Dimensions.get('window').width

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

    /* Handle search query. */
    const _handleQuery = (_query) => {
        console.log('QUERY (props):', _query)
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <ScreenTitle title="DeFi Trade Center" />

            <Search
                style={tailwind('mx-3 mt-2 mb-1')}
                onQuery={_handleQuery}
                placeholder="What are you looking for?"
            />

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-xl font-bold')}>
                    JOE Token
                </Text>

                <Text style={tailwind('text-gray-800 text-2xl font-bold')}>
                    {0}
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-base font-bold')}>
                    Market Cap
                </Text>

                <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                    {0}
                </Text>
            </View>

            <View style={tailwind('px-5 flex flex-row justify-between items-center')}>
                <Text style={tailwind('text-gray-800 text-base font-bold')}>
                    Circulating Supply
                </Text>

                <View style={tailwind('flex flex-row items-end')}>
                    <Text style={tailwind('text-gray-800 text-lg font-bold')}>
                        {0}
                    </Text>

                    <Text style={tailwind('ml-1 mb-1 text-gray-500 text-xs font-bold')}>
                        {0}
                    </Text>
                </View>
            </View>

            <Pressable
                style={tailwind('flex w-32 bg-yellow-200 border-4 border-yellow-400 p-3 rounded-xl')}
                onPress={() => alert('testNotif')}>
                <Text style={tailwind('text-gray-700 text-xl')}>testNotif</Text>
            </Pressable>

            <View style={tailwind('mt-2 ml-2 flex flex-row items-end')}>
                <Text style={tailwind('text-xl font-bold text-gray-500')}>
                    Earnings Trends
                </Text>

                <Text style={tailwind('ml-2 mb-1 text-gray-500 text-xs font-semibold')}>
                    ( LAST 6 MONTHS )
                </Text>
            </View>

            <View style={tailwind('-mt-5 bg-gray-200 border-t-2 border-b-2 border-indigo-500')}>
                <VictoryChart
                    width={width}
                    height={width / 1.5}
                    theme={VictoryTheme.material}
                    domainPadding={20}
                >
                    <VictoryAxis
                        // tickValues specifies both the number of ticks and where
                        // they are placed on the axis
                        // tickValues={[1, 2, 3, 4]}
                        tickFormat={[
                            moment().subtract(5, 'months').format('MMM'),
                            moment().subtract(4, 'months').format('MMM'),
                            moment().subtract(3, 'months').format('MMM'),
                            moment().subtract(2, 'months').format('MMM'),
                            moment().subtract(1, 'months').format('MMM'),
                            moment().format('MMM'),
                        ]}
                    />

                    <VictoryAxis
                          dependentAxis
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={(x) => (`$${x / 1000}k`)}
                    />

                    <VictoryBar
                        data={data}
                        x='month'
                        y='earnings'
                    />

                    <VictoryLine
                        data={data2}
                        x='month'
                        y='earnings'
                    />
                </VictoryChart>
            </View>

            <View style={tailwind('m-2')}>
                <Text style={tailwind('text-xl font-bold text-gray-500')}>
                    Monthly Portolio History
                </Text>
            </View>

            <View style={tailwind('mb-10')}>
                <LineChart
                    style={tailwind('border-t-2 border-b-2 border-yellow-600')}
                    data={{
                        labels: [
                            moment().subtract(5, 'months').format('MMM'),
                            moment().subtract(4, 'months').format('MMM'),
                            moment().subtract(3, 'months').format('MMM'),
                            moment().subtract(2, 'months').format('MMM'),
                            moment().subtract(1, 'months').format('MMM'),
                            moment().format('MMM'),
                        ],
                        datasets: [
                            {
                                data: [
                                    Math.random() * (75 - 25) + 50,
                                    Math.random() * (100 - 50) + 50,
                                    Math.random() * (125 - 75) + 50,
                                    Math.random() * (150 - 100) + 50,
                                    Math.random() * (175 - 125) + 50,
                                    Math.random() * (200 - 150) + 50,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig}
                    bezier
                />
            </View>
        </ScrollView>
    )
})

export default Dashboard
