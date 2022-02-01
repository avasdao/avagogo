/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import {
  LogBox,
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
    createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import { GiftedChat } from 'react-native-gifted-chat'

/* Ignore GiftedChat warnings. */
LogBox.ignoreLogs([
    'keyboardWillShow',
    'keyboardDidShow',
    'keyboardWillHide',
    'keyboardDidHide',
])

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

/**
 * Cafe Screen
 */
function Cafe() {
    const [hasAgreed, setHasAgreed] = React.useState(false)
    const [messages, setMessages] = React.useState([])

    React.useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, [])

    const onSend = React.useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    /**
     * Newsroom
     */
    const Newsroom = () => {
        return (
            <View>
                <View style={tailwind('my-5 mx-5')}>
                    <Text style={tailwind('text-3xl text-gray-400 font-bold')}>
                        Welcome to the Ava GoGo Newsroom
                    </Text>
                </View>

                <View style={tailwind('items-center border-t-2 border-pink-500')}>
                    <LottieView
                        style={tailwind('h-96')}
                        source={require('../assets/lottie/people-reading-news.json')} autoPlay loop
                    />

                    <Text style={tailwind('hidden text-pink-500 font-semibold')}>
                        Ava GoGo's Newsroom
                    </Text>
                </View>

            </View>
        )
    }

    /**
     * Chatrooms
     */
    const Chatrooms = () => {
        return (
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        )
    }

    if (hasAgreed) {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Newsroom"
                    component={Newsroom}
                    options={{
                        title: 'Newsroom'
                    }}
                />
                <Tab.Screen
                    name="Chatrooms"
                    component={Chatrooms}
                    options={{
                        title: 'Chatrooms'
                    }}
                />
            </Tab.Navigator>
        )
    }

    if (!hasAgreed) {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <View>
                    <View style={tailwind('px-5 pt-5 items-center')}>
                        <Text style={tailwind('text-lg text-gray-800 font-bold')}>
                            Meet the #1 DeFi community in crypto!
                        </Text>

                        <Text style={tailwind('mt-3 text-lg text-gray-800')}>
                            You can now engage with other investors like you in a <Text style={tailwind('font-bold')}>SAFE & FRIENDLY</Text> environment.
                        </Text>
                    </View>

                    <View style={tailwind('mt-5 py-5 bg-white items-center border-t-2 border-b-2 border-pink-500')}>
                        <LottieView
                            style={tailwind('h-48')}
                            source={require('../assets/lottie/couple-talk.json')} autoPlay loop
                        />

                        <Text style={tailwind('text-pink-500 font-semibold')}>
                            Ava GoGo's 24 Hour Cafe
                        </Text>
                    </View>

                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-sm text-red-500 font-bold')}>
                            !! WARNING !!
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            This is a very early (alpha) release of Ava GoGo that is without moderation or any tools to prevent <Text style={tailwind('font-bold')}>ABUSE & SPAM</Text> messages.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            We hope you will <Text style={tailwind('font-bold')}>behave yourselves and act responsibly</Text> while our team continues it work to enhance this social experience.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-red-500 font-bold')}>
                            !! USE AT YOUR OWN RISK !!
                        </Text>
                    </View>

                    <View style={tailwind('py-6 items-center')}>
                        <Pressable
                            onPress={() => setHasAgreed(true)}
                            style={tailwind('bg-yellow-200 px-10 py-2 border-2 border-yellow-400 rounded-xl')}
                        >
                            <Text style={tailwind('text-yellow-800 text-xl font-semibold')}>
                                Okay, got it!
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Cafe
