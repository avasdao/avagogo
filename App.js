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

const App = () => {
    const isDarkMode = useColorScheme() === 'dark'

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}
            >
                <Header />

                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white
                }, tailwind('pb-10')}>
                    <Section title="Step One">
                        Edit <Text style={styles.highlight}>App.js</Text> to change this
                        screen and then come back to see your edits.
                    </Section>

                    <View style={tailwind('py-6 items-center')}>
                        <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
                            <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                                Welcome to Ava Gogo
                            </Text>
                        </View>
                    </View>

                    <View style={tailwind('py-5 bg-pink-500 items-center')}>
                        <LottieView
                            style={tailwind('h-32')}
                            source={require('./src/assets/lottie/moon.json')} autoPlay loop
                        />

                        <Text style={tailwind('text-gray-100 font-semibold')}>
                            Lottie Moon
                        </Text>
                    </View>

                    <Section title="What's Next?">
                        Let's build the greatest DeFi app EVER!!
                    </Section>
                </View>
            </ScrollView>
        </SafeAreaView>
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

export default App;
