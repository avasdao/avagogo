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

import Divider from '../components/Divider'
import Search from '../components/Search'

/**
 * Portals Screen
 */
function Portals({navigation}) {
    const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Initialize SYSTEM context. */
    const {
        DEBUG,
    } = React.useContext(store.System)

    /* Handle search query. */
    const _handleQuery = (_query) => {
        console.log('QUERY (props):', _query)
    }

    /* Validate user agreement. */
    if (hasAgreed || !DEBUG) {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
                <View style={tailwind('py-3')}>
                    <View style={tailwind('px-3 pt-3')}>
                        <Text style={tailwind('text-base font-medium text-gray-400 uppercase')}>
                            Featured Showcase
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.TraderJoe')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/trader-joe.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('-mt-2 mb-2 mr-7 items-end')}>
                        <Text style={tailwind('text-xs text-gray-400')}>
                            1.3M staked $GOGO
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.PancakeSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/pancake-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('-mt-2 mb-2 mr-7 items-end')}>
                        <Text style={tailwind('text-xs text-gray-400')}>
                            650K staked $GOGO
                        </Text>
                    </View>

                    <Divider />

                    <View style={tailwind('px-3 pt-3')}>
                        <Text style={tailwind('text-base font-medium text-gray-400 uppercase')}>
                            New & Noteworthy
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Verse')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/verse.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('-mt-2 mb-2 mr-7 items-end')}>
                        <Text style={tailwind('text-xs text-gray-400')}>
                            added 3 days ago
                        </Text>
                    </View>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Uniswap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/uniswap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('-mt-2 mb-2 mr-7 items-end')}>
                        <Text style={tailwind('text-xs text-gray-400')}>
                            added 2 weeks ago
                        </Text>
                    </View>

                    <Divider />

                    <View style={tailwind('px-3 pt-3')}>
                        <Text style={tailwind('text-base font-medium text-gray-400 uppercase')}>
                            Ava's DeFi + GameFi Collection
                        </Text>
                    </View>

                    <Search
                        style={tailwind('mx-2 mt-2 mb-5 rounded-2xl')}
                        onQuery={_handleQuery}
                        placeholder="Search by name, chain or asset"
                    />

                    <Pressable
                        onPress={() => navigation.navigate('Portals.1inch')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/1inch.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Aave')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/aave.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.AlphaFinanceLab')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/alpha-finance-lab.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.BENQI')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/benqi.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.BenSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/ben-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Compound')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/compound.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Cream')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/cream-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Curve')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/curve-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.MistSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/mist-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Pangolin')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/pangolin.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.TangoSwap')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/tango-swap.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.Yearn')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/yearn-finance.jpg')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <Pressable
                        onPress={() => navigation.navigate('Portals.YieldYak')}
                        style={tailwind('items-center')}
                    >
                        <Image
                            style={styles.dappBanner}
                            source={require('../assets/images/banners/yield-yak.png')}
                            resizeMode={'cover'}
                        />
                    </Pressable>

                    <View style={tailwind('m-3 p-3 bg-red-500 border-2 border-red-700 rounded-xl')}>
                        <Text style={tailwind('text-red-50 text-xs text-center font-medium')}>
                            All product and company names are trademarks™ or registered® trademarks of their respective holders.
                            Use of them does not imply any affiliation with or endorsement by them, unless otherwise stated.
                        </Text>
                    </View>

                </View>
            </ScrollView>
        )
    } else {
        return (
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={tailwind('')}
            >
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
                            TOP DeFi Portals
                        </Text>
                    </View>

                    <View style={tailwind('px-5 pt-5')}>
                        <Text style={tailwind('text-sm text-red-500 font-bold')}>
                            !! WARNING !!
                        </Text>

                        <Text style={tailwind('mt-3 text-sm text-gray-800')}>
                            The team at Ava GoGo are BUIDLing <Text style={tailwind('font-bold')}>native mobile</Text> experiences to the <Text style={tailwind('font-bold')}>TOP Portals</Text> found throughout the Avalanche ecosystem.
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
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    dappBanner: {
        width: Dimensions.get('window').width - 20,
        height: 120,

        marginTop: 10,
        marginBottom: 10,

        borderWidth: 2,
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

export default Portals
