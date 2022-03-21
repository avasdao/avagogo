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
    Image,
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

import Masonry from '../components/Masonry'

/* Ignore GiftedChat warnings. */
LogBox.ignoreLogs([
    'keyboardWillShow',
    'keyboardDidShow',
    'keyboardWillHide',
    'keyboardDidHide',
])

/* Initialize tab (navigation). */
const Tab = createMaterialTopTabNavigator()

const vpWidth = Dimensions.get('window').width

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

    /**
     * Marketplace
     */
    const Marketplace = () => {
        return (
            <SafeAreaView style={styles.container}>
                <Masonry
                    itemsProvider={dataItemProvider}
                    renderItem={Item}
                    pageSize={10}
                />
            </SafeAreaView>
        )
    }

    // Individual card's provider to be rendered by Masonry
    function Item(dataItem, key){
        return (
            <View
                key={key}
                style={{
                    ...styles.card,
                    height: dataItem.height
                  }}
             >
                <Image
                    style={styles.img}
                    source={{uri: dataItem.image_url}}
                />
            </View>
        );
    }

    // Card's data provider
    function dataItemProvider(pageSize=10) {

        // https://picsum.photos/id/108/300/400.jpg
        const loremPicsum = [
            'https://i.picsum.photos/id/100/300/400.jpg?hmac=lZTFLF-tp01AB8Pb7LBE3b1JeXakcx2xlCiLBnPyh1s',
            'https://i.picsum.photos/id/101/300/400.jpg?hmac=ch7txyMwf-n4VLw9uAv9YKLlqpTYFg5FKqMafqSDwP0',
            'https://i.picsum.photos/id/102/300/400.jpg?hmac=rTNVOy6bNkT5X7hx8_yDmqY-SpeyvueEf9bEtAiOefo',
            'https://i.picsum.photos/id/103/300/400.jpg?hmac=H4N6Nc3foGUeG61Vj40rDWT4fNPbF3CV0IfI1Ob1cZc',
            'https://i.picsum.photos/id/104/300/400.jpg?hmac=dS6zoESDavxmsYYPtnrbWIvaCkYJCtKgIrrgCgT7dlo',
            'https://i.picsum.photos/id/106/300/400.jpg?hmac=SLpWD_VPIFZRRo64PcV75byzYp_mc9YzN3OExGvm5L8',
            'https://i.picsum.photos/id/107/300/400.jpg?hmac=GXH-AOBiu9QcYyA4roBAaije8FMJi2Qt8HhdPDLUm24',
            'https://i.picsum.photos/id/108/300/400.jpg?hmac=laQOCDySHOUAHhy8eeD3fRNXm43MdmM8U_3MlXq6VHU',
            'https://i.picsum.photos/id/129/300/400.jpg?hmac=LYI71sOAHqgGyT8yThCBWbz5EaghHFA0D74syRwXHNg',
            'https://i.picsum.photos/id/130/300/400.jpg?hmac=mRMhK0E29oMB3MleH7vNPK5mECbC3_Vy9hxC9PhuHC8',
        ]

        return [...Array(pageSize).keys()].map((i) => {
            // const image_url = `https://picsum.photos/id/${parseInt(Math.random() * 200)}/300/400.jpg`
            const image_url = loremPicsum[parseInt(Math.random() * 10)]
            console.log('IMAGE URL', image_url)

            return {
                image_url,
                height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
                key:i
              };
            });
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

                <Tab.Screen
                    name="Marketplace"
                    component={Marketplace}
                    options={{
                        title: 'Marketplace'
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
                            Ava GoGo's 24 Hour Café
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

const styles = StyleSheet.create({
    container: {
        alignContent: 'center',
        alignItems: 'center'
    },
    card: {
        margin: 8,
        width: vpWidth *.5 - 15,
        shadowColor: "#0000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    img: {
        borderRadius: 5,
        flex: 1,
    }
})

export default Cafe
