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
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
} from 'react-native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'
import LottieView from 'lottie-react-native'
import tailwind from 'tailwind-rn'

import { ethers, utils, Wallet } from 'ethers'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'

import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryTheme
} from 'victory-native'

import store from '../../store'

const pieData = [
    {
        name: 'Seoul',
        population: 21500000,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    },
    {
        name: 'Toronto',
        population: 2800000,
        color: '#F00',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    },
    {
        name: 'Beijing',
        population: 527612,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    },
    {
        name: 'New York',
        population: 8538000,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    },
    {
        name: 'Moscow',
        population: 11920000,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
    },
]

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}

const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
]

/**
 * Dashboard Screen
 */
const Dashboard = observer(({navigation}) => {
    const [hasAgreed, setHasAgreed] = React.useState(false)
    const [searchText, onChangeSearchText] = React.useState(null)

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
            <TextInput
                style={tailwind('px-3 border-2 border-gray-300 rounded-xl mt-3 mx-2')}
                onChangeText={onChangeSearchText}
                onFocus={() => alert('Search is NOT enabled in this DEMO')}
                value={searchText}
                placeholder="Search token symbol"
            />

            <Text style={tailwind('m-5 text-gray-600 text-2xl font-semibold text-center')}>
                One-stop-shop decentralized trading on Avalanche
            </Text>

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


            <View style={tailwind('px-5 pt-5')}>
                <Text style={tailwind('hidden text-2xl font-bold text-gray-800')}>
                    Portfolio
                </Text>

                <Text style={tailwind('text-lg text-gray-800')}>
                    Track ALL of your <Text style={tailwind('font-bold')}>DeFi</Text> investments from a single screen.
                </Text>
            </View>

            <View style={tailwind('py-6 items-center')}>
                <View style={tailwind('bg-pink-200 px-5 py-2 rounded-lg')}>
                    <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                        $1,337.88
                    </Text>
                </View>
            </View>

            <View style={tailwind('')}>
                <VictoryChart
                    width={350}
                    theme={VictoryTheme.material}
                    domainPadding={20}
                >
                    <VictoryAxis
                          // tickValues specifies both the number of ticks and where
                          // they are placed on the axis
                          tickValues={[1, 2, 3, 4]}
                          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis
                          dependentAxis
                          // tickFormat specifies how ticks should be displayed
                          tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar data={data} x="quarter" y="earnings" />
                </VictoryChart>
            </View>

            <View style={tailwind('my-3')}>
                <PieChart
                    style={tailwind('')}
                    data={pieData}
                    width={Dimensions.get('window').width}
                    height={120}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft={0}
                    absolute
                />
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
                        labels: ['Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan'],
                        datasets: [
                            {
                                data: [
                                    Math.random() * (75 - 25) + 25,
                                    Math.random() * (100 - 50) + 50,
                                    Math.random() * (125 - 75) + 75,
                                    Math.random() * (150 - 100) + 100,
                                    Math.random() * (175 - 125) + 125,
                                    Math.random() * (200 - 150) + 150,
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
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
                    }}
                    bezier
                />
            </View>
        </ScrollView>
    )
})

export default Dashboard
