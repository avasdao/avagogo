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
  Button,
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
 * Treasury Screen
 */
function Treasury() {
    /* Request dard mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    const { authenticate, isAuthenticated, user } = useMoralis()

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        // const fetchInfo = async () => {
        //     //
        // }

        /* Fetch info. */
        // fetchInfo()

        const Web3Api = useMoralisWeb3Api()

        const fetchBlock = async() => {
            const result = await Web3Api.native.getBlock({
                block_number_or_hash: '100000'
            })
            console.log('FETCH BLOCK', result)
        }

    }, [])

    if (!isAuthenticated) {
        return (
            <View>
                <Button onClick={() => authenticate()}>Authenticate</Button>
            </View>
        )
    }

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            <Section title="Treasury">
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
            </Section>

            <View style={tailwind('py-6 items-center')}>
                <View style={tailwind('bg-pink-200 px-3 py-2 rounded-full')}>
                    <Text style={tailwind('text-pink-800 text-xl font-semibold')}>
                        $13,370.88
                    </Text>
                </View>
            </View>

            <Text>Welcome {user.get('username')}</Text>

            <View style={tailwind('py-5 bg-pink-100 items-center')}>
                <LottieView
                    style={tailwind('h-48')}
                    source={require('../assets/lottie/treasure-chest.json')} autoPlay loop
                />

                <Text style={tailwind('text-pink-800 font-semibold')}>
                    Chinese Treasure Chest
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

export default Treasury
