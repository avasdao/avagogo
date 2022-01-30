/**
 * @format
 */

import Bugsnag from '@bugsnag/react-native'
import BugsnagPluginReactNavigation from '@bugsnag/plugin-react-navigation'
Bugsnag.start({
    plugins: [new BugsnagPluginReactNavigation()]
})

import {AppRegistry} from 'react-native'

import App from './App'

import {name as appName} from './app.json'

AppRegistry.registerComponent(appName, () => App)
