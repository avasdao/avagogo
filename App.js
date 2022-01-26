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

import AppsScreen from './src/screens/Apps'
import CafeScreen from './src/screens/Cafe'
import PortfoliosScreen from './src/screens/Portfolios'
import TreasuryScreen from './src/screens/Treasury'

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

const Tab = createBottomTabNavigator()

const App = () => {
    /* Request dard mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    }

    return (
        <NavigationContainer>
            <SafeAreaView style={backgroundStyle, tailwind('h-full')}>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'Apps') {
                                iconName = focused
                                ? 'ios-apps'
                                : 'ios-apps-outline'
                            } else if (route.name === 'Portfolios') {
                                iconName = focused
                                ? 'ios-bar-chart'
                                : 'ios-bar-chart-outline'
                            } else if (route.name === 'Treasury') {
                                iconName = focused
                                ? 'ios-cash'
                                : 'ios-cash-outline'
                            } else if (route.name === 'Cafe') {
                                iconName = focused
                                ? 'ios-cafe'
                                : 'ios-cafe-outline'
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: 'tomato',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen name="Portfolios" component={PortfoliosScreen} />
                    <Tab.Screen name="Treasury" component={TreasuryScreen} />
                    <Tab.Screen name="Cafe" component={CafeScreen} />
                    <Tab.Screen name="Apps" component={AppsScreen} />
                </Tab.Navigator>
            </SafeAreaView>
        </NavigationContainer>
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

export default App
