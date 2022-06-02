# Ava GoGo

https://avagogo.io

Ava GoGo introduced the ULTIMATE crypto experience for iOS and Android devices. The app is designed to navigate both newcomers and seasoned investors alike across the worlds of DeFi, GameFi and SocialFi; while offering exclusive community, content and services found nowhere else.

## Downloads

https://avagogo.io/download

- Android Play Store
- Apple App Store
- F-Droid
- APK Nightlies (unstable)

## How-to Run via Linux

STEP 1: If you don't already have a running emulator, then:  
`emulator -avd Pixel_5_API_30`

> NOTE: If you need a list of installed emulators:  
`emulator -list-avds
`

STEP 2: We need to start Metro  
`npx react-native start --reset-cache`

STEP 3: Finally, we can launch the app  
`npx react-native run-android`

(optional) Setup a reverse proxy for debugging  
`adb -s emulator-5554 reverse tcp:9090 tcp:9090`
