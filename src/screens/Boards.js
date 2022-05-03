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
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import store from '../store'

/**
 * Welcome
 */
const Welcome = () => {
    if (Platform.OS === 'ios') {
        return (
            <View style={tailwind('px-5 py-3')}>
                <Text style={tailwind('text-2xl font-bold text-gray-800 text-center')}>
                    Welcome to the Premier DeFi Experience on iOS
                </Text>
            </View>
        )
    } else {
        return (
            <View style={tailwind('px-5 py-3')}>
                <Text style={tailwind('text-2xl font-bold text-gray-800 text-center')}>
                    Welcome to the Premier DeFi Experience on Android
                </Text>
            </View>
        )
    }
}

/**
 * Boards Screen
 */
function Boards({navigation}) {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={tailwind('')}
        >
            {(hasAgreed || !DEBUG) &&
                <View style={tailwind('py-3')}>
                    <Welcome />

                    <View style={tailwind('hidden px-10 pb-3')}>
                        <Text style={tailwind('text-base font-medium text-red-600 text-center')}>
                            ALL listed dashboards are being built
                        </Text>

                        <Text style={tailwind('text-xl font-medium text-red-600 text-center')}>
                            100% "NATIVELY" IN-HOUSE
                        </Text>

                        <Text style={tailwind('text-base font-medium text-red-600 text-center')}>
                            by our amazing Ava GoGo engineers
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.1inch')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/1inch.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Aave')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/aave.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.AlphaFinanceLab')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/alpha-finance-lab.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.BENQI')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/benqi.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Compound')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/compound.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Cream')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/cream-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Curve')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/curve-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.MistSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/mist-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.PancakeSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/pancake-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Pangolin')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/pangolin.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.TraderJoe')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/trader-joe.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Uniswap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/uniswap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.Yearn')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/yearn-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Boards.YieldYak')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/yield-yak.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('m-3 p-3 bg-gray-700 rounded-xl')}>
                        <Text style={tailwind('text-gray-400 text-xs')}>
                            All product and company names are trademarks™ or registered® trademarks of their respective holders.
                            Use of them does not imply any affiliation with or endorsement by them.
                        </Text>
                    </View>

                </View>
            }

            {(!hasAgreed && DEBUG) &&
                <View>
                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-lg text-gray-800 text-center')}>
                            Explore and discover <Text style={tailwind('font-bold')}>New & Noteworthy</Text> decentralized applications that you can run directly from Ava GoGo.
                        </Text>
                    </View>

                    <View style={tailwind('py-5 items-center')}>
                        <LottieView
                            style={tailwind('h-48')}
                            source={require('../assets/lottie/online-shopping.json')} autoPlay loop
                        />

                        <Text style={tailwind('text-pink-500 font-semibold')}>
                            TOP DeFi Boards
                        </Text>
                    </View>

                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-sm text-red-500 font-bold')}>
                            !! WARNING !!
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            The team at Ava GoGo are BUIDLing <Text style={tailwind('font-bold')}>native mobile</Text> experiences to the <Text style={tailwind('font-bold')}>TOP Boards</Text> found throughout the Avalanche ecosystem.
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            Be extra cautious as these are 3rd-party decentralized applications that <Text style={tailwind('font-bold')}>HAVE NOT BEEN AUDITED OR REVIEWED</Text> by the team at Ava GoGo.
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
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    dappBanner: {
        width: Dimensions.get('window').width - 20,
        height: 120,

        marginTop: 10,
        marginBottom: 10,

        borderWidth: 5,
        // borderColor: '#73AD21',
        borderColor: '#AAAD21',
        borderRadius: 25,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
})

export default Boards
