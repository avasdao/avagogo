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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

/**
 * Home Screen
 */
function Home() {
    /* Request dard mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <Section title="Portfolios">
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
            </Section>

            <View style={tailwind('py-6 items-center')}>
                <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
                    <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                        $1,337.88
                    </Text>
                </View>
            </View>

            <View style={tailwind('py-5 bg-pink-100 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../assets/lottie/happy-pig.json')} autoPlay loop
                />

                <Text style={tailwind('text-pink-800 font-semibold')}>
                    Ava Gogo Piggy Bank
                </Text>
            </View>

            <Section title="What's Next?">
                Let's build the greatest DeFi app EVER!!
            </Section>
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
