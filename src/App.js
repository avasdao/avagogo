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
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from 'react-native'

import { NavigationContainer, useNavigation } from '@react-navigation/native'

// import Ionicons from 'react-native-vector-icons/Ionicons'

import tailwind from 'tailwind-rn'

// import LottieView from 'lottie-react-native'

import Bugsnag from '@bugsnag/react-native'

import PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info'

// import Moralis from 'moralis/react-native.js'

import 'react-native-get-random-values' // required by uuid
import { v4 as uuidv4 } from 'uuid'

// import NotifService from './NotifService'
import {createChannel} from './NotifManager'

import store from './store'

import HomeStack from './screens/Home'

/* Create a new notification channels. */
createChannel(
    'community-channel',
    `Community/Platform Channel`,
    `A private channel for "community/platform" notifications.`
)
createChannel(
    'portfolio-channel',
    `Portfolio Channel`,
    `Support all notifications generated from the Portfolio area.`
)
createChannel(
    'treasury-channel',
    `Treasury Channel`,
    `Support all notifications generated from the Treasury area.`
)
createChannel(
    'cafe-channel',
    `Café Channel`,
    `Support all notifications generated from the Café area.`
)
createChannel(
    'boards-channel',
    `Boards Channel`,
    `Support all notifications generated from the Boards area.`
)
// createChannel(
//     'scheduled-channel',
//     `Scheduled Channel`,
//     `A time-based channel for "scheduled" notifications.`
// )

/**
 * Main Application
 */
const App = () => {
    /* Initialize Bugsnag. */
    const { createNavigationContainer } = Bugsnag.getPlugin('reactNavigation')
    const BugsnagNavigationContainer = createNavigationContainer(
        NavigationContainer)

    /* Request dark mode. */
    const isDarkMode = useColorScheme() === 'dark'

    /* Set background style. */
    const backgroundStyle = {
        backgroundColor: isDarkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(180, 180, 180, 0.8)',
    }

    /**
     * Update Layout
     *
     * Controls the orientation updates to the UI.
     */
    const _updateLayout = () => {
        /* Retreive window width. */
        const width = Dimensions.get('window').width

        /* Retrieve window height. */
        const height = Dimensions.get('window').height

        console.log('UPDATED LAYOUT', width, height)
        // alert(`new layout -> w:${width} / h:${height}`)
    }

    return (
        <BugsnagNavigationContainer>
            <SafeAreaView
                onLayout={_updateLayout}
                style={backgroundStyle, tailwind('h-full')}
            >
                <HomeStack />
            </SafeAreaView>
        </BugsnagNavigationContainer>
    )
}

export default App
