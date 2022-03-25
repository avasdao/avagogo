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
    TouchableOpacity,
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
import { RNCamera, FaceDetector } from 'react-native-camera'
import { NodeCameraView, NodePlayerView } from 'react-native-nodemediaclient'

import store from '../store'

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
const { width, height } = Dimensions.get("window")

const config = {
    cameraConfig: {
        cameraId: 1,
        cameraFrontMirror: true,
    },
    audioConfig: {
        bitrate: 32000, profile: 1, samplerate: 44100
    },
    videoConfig: {
        preset: 12,
        bitrate: 400000,
        profile: 1,
        fps: 15,
        videoFrontMirror: false,
    },
}

// const config = {
//   cameraConfig: {
//     cameraId: 1,
//     cameraFrontMirror: false
//   },
//   videoConfig: {
//     preset: 4,
//     bitrate: 2000000,
//     profile: 2,
//     fps: 30,
//     videoFrontMirror: true,
//   },
//   audioConfig: {
//     bitrate: 128000,
//     profile: 1,
//     samplerate: 44100,
//   }
// }

/**
 * Cafe Screen
 */
function Cafe() {
    const [hasAgreed, setHasAgreed] = React.useState(false)
    const [isStreaming, setStreaming] = React.useState(false)
    const [messages, setMessages] = React.useState([])

    const cameraViewRef = React.useRef(null)

    /* Initialize PROFILE context. */
    const {
        userid,
        wallet,
        createWallet,
    } = React.useContext(store.Profile)

    React.useEffect(() => {
        /**
         * Fetch Messages
         */
        const fetchMessages = async () => {
            console.log('WALLET (saved):', wallet)

            /* Initialize address. */
            let address = null

            if (wallet) {
                /* Set address. */
                address = wallet.address
            } else {
                /* Create wallet. */
                const created = await createWallet(userid)
                    .catch(err => console.error(err))

                /* Validaet created. */
                if (!created) {
                    throw new Error('Wallet could NOT be created.')
                }

                /* Set address. */
                address = created.wallet.address
                console.log('WALLET (created):', created.wallet)
            }

            const url = `https://api.avagogo.io/v1/cafe/${address}`
            console.log('URL', url)

            /* Request cafe data. */
            const response = await fetch(url)
                .catch(err => console.error(err))

            /* Validate response. */
            if (!response) {
                return console.error('No response from API server.')
            }

            /* Decode messages. */
            const messages = await response.json()
                .catch(err => console.error(err))
            console.log('MESSAGES (api):', messages)

            // this.quotes[_asset] = quote

            /* Set messages. */
            setMessages([
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 1337,
                        name: 'Ava Nakamoto',
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ])
        }

        /* Fetch messages. */
        fetchMessages()
    }, [])

    const onSend = React.useCallback(async (messages = []) => {
        // console.log('ON SEND (messages):', messages)

        // return setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

        setMessages(previousMessages => {
            console.log('PREVIOUS MESSAGES (onSend):', previousMessages)
            console.log('MESSAGES (onSend):', messages)

            return GiftedChat.append(previousMessages, messages)
        })

        /* Build session package. */
        // const pkg = {
        //     hi: 'there',
        //     body: messages[0],
        // }
        // console.log('SESSION (pkg):', JSON.stringify(pkg, null, 4))

        const response = await fetch('https://api.avagogo.io/v1/messages', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages[0])
        })
        .catch(err => console.error(err))
        // console.log('SESSION RESPONSE:', response)
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
                onSend={_messages => {
                    console.log('NEW MESSAGE(S):', _messages)

                    /* Send new message(s). */
                    onSend(_messages)
                }}
                user={{
                    _id: userid,
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
        const gallery = [
            'https://i.imgur.com/tTnauOe.png',
            'https://i.imgur.com/5HZZv3K.png',
            'https://i.imgur.com/UCsdH2J.png',
            'https://i.imgur.com/G1SONLS.png',
            'https://i.imgur.com/B2IVv3n.png',
            'https://i.imgur.com/KUaM5eX.png',
            'https://i.imgur.com/ssIjjDE.png',
            'https://i.imgur.com/26whmO4.png',
            'https://i.imgur.com/SkPmbdg.png',
            'https://i.imgur.com/qkxONZd.png',
            // '',
        ]

        return [...Array(pageSize).keys()].map((i) => {
            // const image_url = `https://picsum.photos/id/${parseInt(Math.random() * 200)}/300/400.jpg`
            const image_url = gallery[parseInt(Math.random() * 10)]
            // console.log('IMAGE URL', image_url)

            return {
                image_url,
                height: parseInt(Math.max(0.3, Math.random()) * vpWidth),
                key:i
              };
            });
    }

    /**
     * Studio
     */
    const Studio = () => {
        return (
            <View style={styles.camContainer}>
                <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}

                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                >
                    {({ camera, status, recordAudioPermissionStatus }) => {
                        if (status !== 'READY') return <PendingView />

                        return (
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </RNCamera>
            </View>
        )
    }

    const toggleStream = () => {
        if (!isStreaming) {
            setStreaming(true)
            cameraViewRef.current.start()

        } else {
            setStreaming(false)
            cameraViewRef.current.stop()

        }
    }

    /**
     * Streamer
     */
     const BroadcastScreen = () => {
       const streamKey = '7057-uby1-a6mg-nhiu'
       const url = `rtmp://rtmp.livepeer.com/live/${streamKey}`

       return (
         <View style={{flex: 1}}>
             <TouchableOpacity onPress={toggleStream} style={styles.capture}>
                 <Text style={{ fontSize: 14 }}> STREAM </Text>
             </TouchableOpacity>

             <Text style={tailwind('text-gray-800')}>
                isStreaming: {isStreaming ? 'STREAMING' : 'NOT STREAMING'}
            </Text>

           <NodeCameraView
             style={{width, height}}
             ref={cameraViewRef}
             outputUrl={url}
             camera={config.cameraConfig}
             audio={config.audioConfig}
             video={config.videoConfig}
             autopreview={true}
           />
         </View>
       );
     }

    /**
     * Streamer
     */
     const BroadcastView = () => {
         const streamKey = '7057-uby1-a6mg-nhiu'
         const url = `rtmp://rtmp.livepeer.com/live/${streamKey}`

       return (
           <NodePlayerView
           style={{width, height}}
             ref={cameraViewRef}
             inputUrl={url}
             scaleMode={"ScaleAspectFit"}
             bufferTime={300}
             maxBufferTime={1000}
             autoplay={true}
           />
       );
     }

    const PendingView = () => (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );

    takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);
  };

    if (hasAgreed) {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Newsroom"
                    component={Newsroom}
                    options={{
                        title: 'News'
                    }}
                />

                <Tab.Screen
                    name="Chatrooms"
                    component={Chatrooms}
                    options={{
                        title: 'Chat'
                    }}
                />

                <Tab.Screen
                    name="Marketplace"
                    component={Marketplace}
                    options={{
                        title: 'Market'
                    }}
                />

                <Tab.Screen
                    name="Studio"
                    component={BroadcastScreen}
                    options={{
                        title: 'Studio'
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
    camContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
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
    },
    preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
})

export default Cafe
