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
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

import LottieView from 'lottie-react-native'

import store from '../store'

/**
 * Page Title
 */
const PageTitle = observer((_props) => {
    // const [hasAgreed, setHasAgreed] = React.useState(false)

    /* Set title. */
    const title = _props.title

    // const {
    //     firstName,
    //     displayName
    // } = React.useContext(store.Profile)

    /* Initialize navigation. */
    const navigation = useNavigation()

    /* Handle onLoad scripts. */
    React.useEffect(() => {
        /**
         * Fetch Info
         */
        const fetchInfo = async () => {
            //
        }

        /* Fetch info. */
        fetchInfo()
    }, [])

    return (
        <View style={tailwind('w-full py-3 bg-purple-200 border-b-2 border-purple-300 items-center')}>
            <Text style={tailwind('text-purple-600 text-2xl font-bold')}>
                {title}
            </Text>
        </View>
    )
})

export default PageTitle
