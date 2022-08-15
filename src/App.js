import React, {useState, useEffect} from 'react'
import { Alert, LogBox } from 'react-native'
import 'react-native-gesture-handler'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './Routes'

import LoginProvider from './context/LoginProvider'
import LocationEnabler from 'react-native-location-enabler';

const {
    PRIORITIES: { HIGH_ACCURACY },
    addListener,
    checkSettings,
    requestResolutionSettings
} = LocationEnabler

const config = {
    priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: false, // default false
};

const App = () => {
    const [enabled, setEnabled] = useState(false)

    const listener = addListener(({ locationEnabled }) => {
        setEnabled(locationEnabled)
    });


    checkSettings(config)

    useEffect(() => {
        LogBox.ignoreLogs(['new NativeEventEmitter'])
        LogBox.ignoreAllLogs()
        
        if (!enabled) {
            Alert.alert(
                'Localização desativada',
                'Por favor ative a localização para usar o aplicativo',
                [
                    { text: 'Cancelar', onPress: () => {} },
                    { text: 'OK', onPress: () => requestResolutionSettings(config) },
                ],
            )
        }

    }, [])
    
    return (
        <LoginProvider>
            <Provider store={store}>
                <Routes />
            </Provider>
        </LoginProvider>
    )
}

export default App