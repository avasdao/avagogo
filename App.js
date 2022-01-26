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
    Pressable,
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

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import AppsScreen from './src/screens/Apps'
import CafeScreen from './src/screens/Cafe'
import HelpScreen from './src/screens/Help'
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

/**
 * Help & Support Button
 */
const HelpButton = () => {
    /* Request navigation. */
    const navigation = useNavigation()

    return (
        <Pressable onPress={() => navigation.navigate('Help')}>
            <Ionicons
                style={tailwind('mr-3')}
                name={'information-circle'}
                size={36}
                color={'rgba(180, 90, 90, 0.8)'}
            />
        </Pressable>
    )
}

const HomeStack = createNativeStackNavigator()
// const RootStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function TabScreens() {
    return (
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
                    return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Portfolios"
                component={PortfoliosScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />
            <Tab.Screen
                name="Treasury"
                component={TreasuryScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />

            <Tab.Screen
                name="Cafe"
                component={CafeScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />

            <Tab.Screen
                name="Apps"
                component={AppsScreen}
                options={{
                    headerRight: HelpButton,
                }}
            />
        </Tab.Navigator>
    )
}

function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <HomeStack.Screen name="Start" component={TabScreens} />
            <HomeStack.Screen name="Help" component={HelpScreen} />
        </HomeStack.Navigator>
    )
}

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
                <HomeStackScreen />
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
