import Reactotron from 'reactotron-react-native'

if(__DEV__){
    const tron = Reactotron.useReactNative().connect()

    console.tron = tron

    tron.clear()
}