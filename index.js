/**
 * @format
 */

import Bugsnag from '@bugsnag/react-native'
import BugsnagPluginReactNavigation from '@bugsnag/plugin-react-navigation'
Bugsnag.start({
    plugins: [new BugsnagPluginReactNavigation()]
})

import {AppRegistry} from 'react-native'

import App from './src/App'

import {name as appName} from './src/app.json'

AppRegistry.registerComponent(appName, () => App)
