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
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

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
    ];

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
    ];

/**
 * Home Screen
 */
function Home() {
    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <View style={tailwind('px-5 pt-5')}>
                <Text style={tailwind('hidden text-2xl font-bold text-gray-800')}>
                    Portfolios
                </Text>

                <Text style={tailwind('text-lg text-gray-800')}>
                    Track ALL of your <Text style={tailwind('font-bold')}>DeFi</Text> investments from a single screen.
                </Text>
            </View>

            <View style={tailwind('py-6 items-center')}>
                <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
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

            <View style={tailwind('mt-3 py-5 bg-pink-100 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../assets/lottie/happy-pig.json')} autoPlay loop
                />

                <Text style={tailwind('text-pink-800 font-semibold')}>
                    Ava Gogo Piggy Bank
                </Text>
            </View>


            <View>
              <Text>Bezier Line Chart</Text>
              <LineChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                    {
                      data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
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
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home
